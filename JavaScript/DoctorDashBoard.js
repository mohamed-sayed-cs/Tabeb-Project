// DoctorDashBoard.js
// Shared script for register.html (Page 1) and doctordashboard.html (Page 2).
// Detects which page it's on and only wires up the relevant behavior,
// so it never throws null-element errors when an element doesn't exist.

const STORAGE_KEY = 'clinic_patients';

/* ---------------------------------------------------------
   Shared storage helpers
--------------------------------------------------------- */
function getPatients() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (err) {
    console.error('Could not read patients from localStorage:', err);
    return [];
  }
}

function savePatients(patients) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(patients));
}

function generateId() {
  if (window.crypto && typeof window.crypto.randomUUID === 'function') {
    return window.crypto.randomUUID();
  }
  return 'p_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
}

function formatDateTime(date) {
  return date.toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str == null ? '' : String(str);
  return div.innerHTML;
}

/* ---------------------------------------------------------
   Page 1: Patient Register (register.html)
--------------------------------------------------------- */
function initRegisterPage(form) {
  const visitDateField = document.getElementById('visitDate');
  if (visitDateField) {
    visitDateField.value = formatDateTime(new Date());
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const fullName = document.getElementById('fullName');
    const phone = document.getElementById('phone');
    const age = document.getElementById('age');
    const gender = document.getElementById('gender');
    const notes = document.getElementById('notes');

    const newPatient = {
      id: generateId(),
      fullName: fullName ? fullName.value.trim() : '',
      phone: phone ? phone.value.trim() : '',
      age: age ? age.value.trim() : '',
      gender: gender ? gender.value : '',
      visitDate: visitDateField ? visitDateField.value : formatDateTime(new Date()),
      notes: notes ? notes.value.trim() : '',
      status: 'Waiting'
    };

    const patients = getPatients();
    patients.push(newPatient);
    savePatients(patients);

    window.location.href = 'doctordashboard.html';
  });
}

/* ---------------------------------------------------------
   Page 2: Doctor Monitoring (doctordashboard.html)
--------------------------------------------------------- */
function initDashboardPage(tableBody) {
  const searchInput = document.getElementById('searchInput');
  const emptyMessage = document.getElementById('emptyMessage');
  const totalEl = document.getElementById('totalPatientsCount');
  const waitingEl = document.getElementById('waitingPatientsCount');
  const completedEl = document.getElementById('completedPatientsCount');

  function updateStats(allPatients) {
    if (totalEl) totalEl.textContent = allPatients.length;
    if (waitingEl) {
      waitingEl.textContent = allPatients.filter(function (p) { return p.status === 'Waiting'; }).length;
    }
    if (completedEl) {
      completedEl.textContent = allPatients.filter(function (p) { return p.status === 'Completed'; }).length;
    }
  }

  function buildRow(patient, index) {
    const isWaiting = patient.status === 'Waiting';
    return (
      '<tr>' +
        '<td>' + (index + 1) + '</td>' +
        '<td>' + escapeHtml(patient.fullName) + '</td>' +
        '<td>' + escapeHtml(patient.phone) + '</td>' +
        '<td>' + escapeHtml(patient.visitDate) + '</td>' +
        '<td>' + (patient.notes ? escapeHtml(patient.notes) : '-') + '</td>' +
        '<td><span class="status-badge status-' + patient.status.toLowerCase() + '">' + escapeHtml(patient.status) + '</span></td>' +
        '<td class="actions-cell">' +
          '<button type="button" class="btn-action" data-action="toggle" data-id="' + patient.id + '">' +
            (isWaiting ? 'Mark Completed' : 'Mark Waiting') +
          '</button>' +
          '<button type="button" class="btn-action btn-delete" data-action="delete" data-id="' + patient.id + '">Delete</button>' +
        '</td>' +
      '</tr>'
    );
  }

  function render() {
    const allPatients = getPatients();
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';

    const visible = query
      ? allPatients.filter(function (p) {
          return p.fullName.toLowerCase().includes(query) || p.phone.toLowerCase().includes(query);
        })
      : allPatients;

    tableBody.innerHTML = visible.map(buildRow).join('');

    if (emptyMessage) {
      emptyMessage.style.display = visible.length === 0 ? 'block' : 'none';
    }

    updateStats(allPatients);
  }

  function toggleStatus(id) {
    const patients = getPatients();
    const patient = patients.find(function (p) { return String(p.id) === String(id); });
    if (!patient) return;
    patient.status = patient.status === 'Waiting' ? 'Completed' : 'Waiting';
    savePatients(patients);
    render();
  }

  function deletePatient(id) {
    if (!window.confirm('Remove this patient from the list?')) return;
    const patients = getPatients().filter(function (p) { return String(p.id) !== String(id); });
    savePatients(patients);
    render();
  }

  tableBody.addEventListener('click', function (e) {
    const btn = e.target.closest('button[data-action]');
    if (!btn) return;
    const id = btn.dataset.id;
    if (btn.dataset.action === 'toggle') toggleStatus(id);
    else if (btn.dataset.action === 'delete') deletePatient(id);
  });

  if (searchInput) {
    searchInput.addEventListener('input', render);
  }

  render();
}

/* ---------------------------------------------------------
   Entry point — runs on whichever page loaded this script
--------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', function () {
  const patientForm = document.getElementById('patientForm');
  if (patientForm) {
    initRegisterPage(patientForm);
  }

  const patientsTableBody = document.getElementById('patientsTableBody');
  if (patientsTableBody) {
    initDashboardPage(patientsTableBody);
  }
});