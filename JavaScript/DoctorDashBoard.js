// LocalStorage Setup & State Management
    let patients = JSON.parse(localStorage.getItem('clinic_patients')) || [];
    
    // DOM Elements
    const patientForm = document.getElementById('patientForm');
    const tableBody = document.getElementById('patientsTableBody');
    const searchInput = document.getElementById('searchInput');
    const emptyMessage = document.getElementById('emptyMessage');
    const visitDateInput = document.getElementById('visitDate');
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    
    // Stats Elements
    const totalCountEl = document.getElementById('totalPatientsCount');
    const waitingCountEl = document.getElementById('waitingPatientsCount');
    const completedCountEl = document.getElementById('completedPatientsCount');

    // Auto Fill Current Date & Time
    function setCurrentTime() {
      const now = new Date();
      visitDateInput.value = now.toLocaleDateString('eng-EG', {
        day: 'numeric', month: 'short', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
      });
    }

    // Initialize Page
    document.addEventListener('DOMContentLoaded', () => {
      setCurrentTime();
      renderPatients();
      initTheme();
    });

    // Handle Form Submit
    patientForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const newPatient = {
        id: Date.now(),
        name: document.getElementById('fullName').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        time: visitDateInput.value,
        notes: document.getElementById('notes').value.trim() || 'No notes available',
        status: 'Waiting' // Default status
      };

      patients.push(newPatient);
      saveAndRefresh();
      patientForm.reset();
      setCurrentTime();
    });

    // Render Patients List to Table
    function renderPatients(filterText = '') {
      tableBody.innerHTML = '';

      const filtered = patients.filter(p => 
        p.name.includes(filterText) || p.phone.includes(filterText)
      );

      if (filtered.length === 0) {
        emptyMessage.style.display = 'block';
      } else {
        emptyMessage.style.display = 'none';
      }

      filtered.forEach((patient, index) => {
        const row = document.createElement('tr');
        
        const isCompleted = patient.status === 'Completed';
        const badgeClass = isCompleted ? 'badge-completed' : 'badge-waiting';

        row.innerHTML = `
          <td>${index + 1}</td>
          <td><strong>${patient.name}</strong><br><small style="color:var(--text-muted);">${patient.gender} (${patient.age} years)</small></td>
          <td>${patient.phone}</td>
          <td>${patient.time}</td>
          <td>${patient.notes}</td>
          <td>
            <span class="badge ${badgeClass}" onclick="toggleStatus(${patient.id})">
              ${patient.status}
            </span>
          </td>
          <td>
            <button class="btn-delete" onclick="deletePatient(${patient.id})">Delete</button>
          </td>
        `;

        tableBody.appendChild(row);
      });

      updateStats();
    }

    // Change Status (Waiting / Completed)
    window.toggleStatus = function(id) {
      patients = patients.map(p => {
        if (p.id === id) {
          p.status = p.status === 'Waiting' ? 'Completed' : 'Waiting';
        }
        return p;
      });
      saveAndRefresh();
    };

    // Delete Patient
    window.deletePatient = function(id) {
      if (confirm('Are you sure you want to delete this patient?')) {
        patients = patients.filter(p => p.id !== id);
        saveAndRefresh();
      }
    };

    // Update Statistics Bar
    function updateStats() {
      const total = patients.length;
      const completed = patients.filter(p => p.status === 'Completed').length;
      const waiting = total - completed;

      totalCountEl.textContent = total;
      completedCountEl.textContent = completed;
      waitingCountEl.textContent = waiting;
    }

    // Save Data to LocalStorage & Update UI
    function saveAndRefresh() {
      localStorage.setItem('clinic_patients', JSON.stringify(patients));
      renderPatients(searchInput.value.trim());
    }

    // Search Feature
    searchInput.addEventListener('input', (e) => {
      renderPatients(e.target.value.trim());
    });