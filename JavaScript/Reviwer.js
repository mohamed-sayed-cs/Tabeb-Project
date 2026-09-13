//function () {
  //"use strict";}

  /* ---------- Footer year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();

  /* ---------- Mobile nav ---------- */
  const navToggle = document.getElementById("navToggle");
  const mainNav = document.getElementById("mainNav");
  navToggle.addEventListener("click", () => {
    const isOpen = mainNav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
  mainNav.querySelectorAll("a").forEach((link) =>
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    })
  );

  /* ---------- "احجز الكشف" buttons -> scroll to contact ---------- */
  ["bookBtn", "bookBtnHero"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener("click", () => {
        document.getElementById("contact").scrollIntoView({ behavior: "smooth" });
      });
    }
  });

  /* =========================================================
     Reviews: seed data + anything saved locally by this browser
  ========================================================= */
  const STORAGE_KEY = "nabd_clinic_reviews_v1";

  const seedReviews = [
    {
      name: "سارة محمود",
      rating: 5,
      comment: "الدكتور بيدّيك وقت كويس ويسمعك كويس، مش زي أي كشف تاني اتعوّدنا عليه.",
      tags: ["ممتاز", "أكيد"],
    },
    {
      name: "أحمد فتحي",
      rating: 4,
      comment: "المتابعة مع السكر بقت أسهل بكتير بعد ما بدأت أروح هنا.",
      tags: ["جيد", "أكيد"],
    },
    {
      name: "منى السيد",
      rating: 5,
      comment: "الانتظار كان معقول والتقرير اللي اخدته بعد الكشف كان واضح جداً.",
      tags: ["معقولة", "ممتاز"],
    },
  ];

  function loadStoredReviews() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  }

  function saveStoredReviews(list) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {
      /* storage might be unavailable — fail silently, review still shows for this session */
    }
  }

  function avatarUrl(name) {
    const encoded = encodeURIComponent(name || "زائر");
    return "https://ui-avatars.com/api/?name=${encoded}&background=E7F0EE&color=1F5C55&bold=true&size=96";
  }

  function starString(rating) {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  }

  function renderReviews() {
    const list = document.getElementById("reviewsList");
    const stored = loadStoredReviews();
    const all = [...stored, ...seedReviews]; // newest user reviews first

    list.innerHTML = all
      .map((r) => {
        const tags = (r.tags || [])
          .filter(Boolean)
          .map((t) => <span>${escapeHtml(t)}</span>)
          .join("");
        return 
        <article class="review-card">
          <div class="review-top">
            <img class="review-avatar" src="${avatarUrl(r.name)}" alt="" width="42" height="42" loading="lazy">
            <div>
              <div class="review-name">${escapeHtml(r.name || "زائر العيادة")}</div>
              <div class="review-stars" aria-label="${r.rating} من ٥">${starString(r.rating)}</div>
            </div>
          </div>
          ${r.comment ? <p class="review-comment">${escapeHtml(r.comment)}</p> : ""}
          ${tags ? <div class="review-tags">${tags}</div> : ""}
        </article>;
      })
      .join("");

    updateAverage(all);
  }

  function updateAverage(all) {
    const count = all.length;
    const avg = count ? all.reduce((sum, r) => sum + r.rating, 0) / count : 0;
    const rounded = Math.round(avg * 10) / 10;

    document.getElementById("avgRatingNumber").textContent = rounded.toFixed(1);
    document.getElementById("ratingCount").textContent = count;
    document.getElementById("heroRatingValue").textContent = rounded.toFixed(1);
  }

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }
  renderReviews();

  /* =========================================================
     Rating modal
  ========================================================= */
  const overlay = document.getElementById("modalOverlay");
  const modal = document.getElementById("rateModal");
  const steps = modal.querySelectorAll(".modal-step");
  const dots = modal.querySelectorAll(".modal-progress .dot");

  const state = {
    rating: 0,
    answers: { wait: null, staff: null, recommend: null },
  };

  let lastFocused = null;

  function openModal() {
    lastFocused = document.activeElement;
    overlay.hidden = false;
    goToStep(1);
    const firstStar = modal.querySelector(".star");
    if (firstStar) firstStar.focus();
    document.addEventListener("keydown", onKeydown);
  }

  function closeModal() {
    overlay.hidden = true;
    document.removeEventListener("keydown", onKeydown);
    if (lastFocused) lastFocused.focus();
    resetModal();
  }

  function onKeydown(e) {
    if (e.key === "Escape") closeModal();
  }

  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeModal();
  });
  document.getElementById("modalClose").addEventListener("click", closeModal);

  ["fabRate", "rateBtnHero", "rateBtnReviews"].forEach((id) => {
    const el = document.getElementById(id);
    if (el) el.addEventListener("click", openModal);
  });

  function goToStep(stepKey) {
    steps.forEach((s) => {
      s.hidden = s.dataset.step !== String(stepKey);
    });
    dots.forEach((d) => {
      d.classList.toggle("active", Number(d.dataset.step) <= Number(stepKey));
      d.style.display = stepKey === "thanks" ? "none" : "";
    });
  }

  /* --- Step 1: stars --- */
  const starPicker = document.getElementById("starPicker");
  const stars = Array.from(starPicker.querySelectorAll(".star"));
  const toStep2Btn = document.getElementById("toStep2");

  function paintStars(value) {
    stars.forEach((s) => {
      const active = Number(s.dataset.value) <= value;
      s.classList.toggle("active", active);
      s.setAttribute("aria-checked", String(Number(s.dataset.value) === value));
    });
  }

  stars.forEach((s) => {
    s.addEventListener("click", () => {
      state.rating = Number(s.dataset.value);
      paintStars(state.rating);
      toStep2Btn.disabled = false;
    });
    s.addEventListener("mouseenter", () => {
      stars.forEach((h) => h.classList.toggle("hovered", Number(h.dataset.value) <= Number(s.dataset.value)));
    });
    s.addEventListener("mouseleave", () => {
      stars.forEach((h) => h.classList.remove("hovered"));
    });
  });

  toStep2Btn.addEventListener("click", () => goToStep(2));
  document.getElementById("toStep1").addEventListener("click", () => goToStep(1));

  /* --- Step 2: quick questions --- */
  const toStep3Btn = document.getElementById("toStep3");

  document.querySelectorAll(".quick-question").forEach((block) => {
    const key = block.dataset.question;
    block.querySelectorAll(".chip").forEach((chip) => {
      chip.addEventListener("click", () => {
        block.querySelectorAll(".chip").forEach((c) => c.classList.remove("selected"));
        chip.classList.add("selected");
        state.answers[key] = chip.dataset.value;
        checkStep2Complete();
      });
    });
  });

  function checkStep2Complete() {
    const done = Object.values(state.answers).every((v) => v !== null);
    toStep3Btn.disabled = !done;
  }

  toStep3Btn.addEventListener("click", () => goToStep(3));
  document.getElementById("toStep2Back").addEventListener("click", () => goToStep(2));

  /* --- Step 3: submit --- */
  document.getElementById("submitReview").addEventListener("click", () => {
    const name = document.getElementById("reviewName").value.trim();
    const comment = document.getElementById("reviewComment").value.trim();

    const newReview = {
      name: name || "زائر العيادة",
      rating: state.rating,
      comment,
      tags: [state.answers.wait, state.answers.staff, state.answers.recommend].filter(Boolean),
      date: new Date().toISOString(),
    };
    const stored = loadStoredReviews();
    stored.unshift(newReview);
    saveStoredReviews(stored);
    renderReviews();

    goToStep("thanks");
  });

  document.getElementById("closeThanks").addEventListener("click", closeModal);

  function resetModal() {
    state.rating = 0;
    state.answers = { wait: null, staff: null, recommend: null };
    paintStars(0);
    toStep2Btn.disabled = true;
    toStep3Btn.disabled = true;
    document.querySelectorAll(".chip.selected").forEach((c) => c.classList.remove("selected"));
    document.getElementById("reviewName").value = "";
    document.getElementById("reviewComment").value = "";
  }