// ============================================================
// Tabeeb Platform — Main JavaScript Logic
// ============================================================

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {

    /* ------------------------------------------------------------
       1. Mobile Navigation Toggle
    ------------------------------------------------------------ */
    const navToggle = document.getElementById('navToggle');
    const mainNav = document.getElementById('mainNav');

    if (navToggle && mainNav) {
      navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('nav-open');
      });

      // Close mobile menu when clicking any nav link
      mainNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
          mainNav.classList.remove('nav-open');
        });
      });
    }

    /* ------------------------------------------------------------
       2. Mock Reviews & Dynamic Rating Calculation
    ------------------------------------------------------------ */
    let reviewsData = [
      { name: 'Ahmed Mahmoud', rating: 5, text: 'Very accurate diagnosis and excellent care from the doctor. The treatment was highly effective.', date: 'September 10, 2026' },
      { name: 'Sarah Ali', rating: 5, text: 'The platform made booking the appointment and follow-up so seamless without any waiting time.', date: 'September 02, 2026' },
      { name: 'Mohamed Mostafa', rating: 4, text: 'Well-equipped clinic and great integrated services. Outstanding overall experience.', date: 'August 25, 2026' }
    ];

    const reviewsList = document.getElementById('reviewsList');
    const avgRatingNumber = document.getElementById('avgRatingNumber');
    const reviewsCountText = document.getElementById('reviewsCountText');
    const heroRatingValue = document.getElementById('heroRatingValue');

    function renderReviews() {
      if (!reviewsList) return;

      reviewsList.innerHTML = '';
      let totalScore = 0;

      reviewsData.forEach(rev => {
        totalScore += rev.rating;
        const starsHtml = '★'.repeat(rev.rating) + '☆'.repeat(5 - rev.rating);

        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = 
          `<div class="review-header">
            <strong>${rev.name}</strong>
            <span class="stars">${starsHtml}</span>
          </div>
          <p>${rev.text}</p>
          <span class="review-date">${rev.date}</span>`
        ;
        reviewsList.appendChild(card);
      });

      // Calculate & update average rating and total review count
      const avg = (totalScore / reviewsData.length).toFixed(1);
      if (avgRatingNumber) avgRatingNumber.textContent = avg;
      if (heroRatingValue) heroRatingValue.textContent = avg;
      if (reviewsCountText) reviewsCountText.textContent = `Based on ${reviewsData.length} service reviews`;
    }

    renderReviews();

    /* ------------------------------------------------------------
       3. Rating & Review Modal Logic
    ------------------------------------------------------------ */
    const modalOverlay = document.getElementById('ratingModal');
    const closeModalBtn = document.getElementById('closeModal');
    const modalSteps = document.querySelectorAll('.modal-step');
    const dots = document.querySelectorAll('.modal-progress .dot');

    // جميع الأزرار التي تفتح النافذة المنبثقة للتقييم
    const triggerButtons = [
      document.getElementById('openRatingModal'),
      document.getElementById('rateBtnReviews'),
      document.getElementById('fabRate')
    ];

    let currentStep = 1;
    let selectedRating = 0;
    let selectedTag = '';

    function showStep(stepNumber) {
      currentStep = stepNumber;
      modalSteps.forEach(step => {
        const stepAttr = step.dataset.step;
        step.hidden = (stepAttr !== String(stepNumber));
      });
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx + 1 === stepNumber);
      });
    }

    function openModal() {
      if (!modalOverlay) return;
      modalOverlay.hidden = false;
      showStep(1);
    }

    triggerButtons.forEach(btn => {
      if (btn) btn.addEventListener('click', openModal);
    });

    if (closeModalBtn && modalOverlay) {
      closeModalBtn.addEventListener('click', () => {
        modalOverlay.hidden = true;
      });

      // Close modal when clicking on background overlay
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) modalOverlay.hidden = true;
      });
    }

    // Star Rating Selection (Step 1)
    const starBtns = document.querySelectorAll('.star-picker .star');
    starBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        selectedRating = parseInt(btn.dataset.value);

        starBtns.forEach(s => {
          const val = parseInt(s.dataset.value);
          s.classList.toggle('active', val <= selectedRating);
        });

        // Automatically move to Step 2 upon selection
        setTimeout(() => showStep(2), 250);
      });
    });

    // Chip Selection (Tags)
    const chips = document.querySelectorAll('.chip-group .chip');
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        selectedTag = chip.textContent;
      });
    });

    // Proceed to Step 3 Button
    const goToStep3Btn = document.getElementById('goToStep3');
    if (goToStep3Btn) {
      goToStep3Btn.addEventListener('click', () => showStep(3));
    }

    // Final Review Form Submission
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
      reviewForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const nameInput = document.getElementById('reviewerName')?.value.trim();
        const textInput = document.getElementById('reviewerComment')?.value.trim();

        const newReview = {
          name: nameInput || 'Anonymous Guest',
          rating: selectedRating || 5,
          text: selectedTag ? `[${selectedTag}] ${textInput || ''}` : (textInput || 'Great service!'),
          date: 'Just now'
        };

        reviewsData.unshift(newReview);
        renderReviews();

        showStep(4); // Show Thank You Step

        // Auto close modal after 2.5 seconds
        setTimeout(() => {
          if (modalOverlay) modalOverlay.hidden = true;
          reviewForm.reset();
          starBtns.forEach(s => s.classList.remove('active'));
          chips.forEach(c => c.classList.remove('selected'));
          selectedRating = 0;
          selectedTag = '';
        }, 2500);
      });
    }

  });
}