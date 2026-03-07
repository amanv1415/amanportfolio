/* ============================================
   PORTFOLIO — MAIN JAVASCRIPT
   Handles: loader, theme toggle, nav, scroll
   reveal, typed text, tabs, counters, particles,
   contact form (EmailJS)
   ============================================ */

document.addEventListener("DOMContentLoaded", () => {
  /* ------- Initialize Lucide Icons ------- */
  lucide.createIcons();

  /* ------- PAGE LOADER ------- */
  const loader = document.getElementById("page-loader");
  window.addEventListener("load", () => {
    setTimeout(() => loader.classList.add("hidden"), 400);
  });

  /* ------- THEME TOGGLE ------- */
  const themeToggle = document.getElementById("theme-toggle");
  const storedTheme = localStorage.getItem("theme") || "dark";
  document.documentElement.setAttribute("data-theme", storedTheme);

  themeToggle.addEventListener("click", (e) => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";

    // Spin the icon
    themeToggle.classList.add("spin");
    setTimeout(() => themeToggle.classList.remove("spin"), 500);

    // Create expanding circle overlay from button position
    const overlay = document.createElement("div");
    overlay.classList.add("theme-transition-overlay");
    const rect = themeToggle.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    // Size = double the max distance from click to any corner
    const size = Math.max(
      Math.hypot(x, y),
      Math.hypot(window.innerWidth - x, y),
      Math.hypot(x, window.innerHeight - y),
      Math.hypot(window.innerWidth - x, window.innerHeight - y)
    ) * 2;
    overlay.style.left = x + "px";
    overlay.style.top = y + "px";
    overlay.style.width = size + "px";
    overlay.style.height = size + "px";
    overlay.style.background = next === "light" ? "#f5f5fa" : "#0f0f1a";
    document.body.appendChild(overlay);

    // Trigger expansion
    requestAnimationFrame(() => overlay.classList.add("expand"));

    // Switch theme mid-animation for a seamless feel
    setTimeout(() => {
      document.documentElement.setAttribute("data-theme", next);
      localStorage.setItem("theme", next);
      lucide.createIcons();
    }, 300);

    // Remove overlay after animation
    overlay.addEventListener("animationend", () => overlay.remove());
  });

  /* ------- NAVBAR: sticky shadow ------- */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 50);
  });

  /* ------- MOBILE MENU ------- */
  const hamburger = document.getElementById("nav-hamburger");
  const navMenu = document.getElementById("nav-menu");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("open");
  });

  // Close menu on link click
  navMenu.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      hamburger.classList.remove("active");
      navMenu.classList.remove("open");
    });
  });

  /* ------- ACTIVE NAV LINK ON SCROLL ------- */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observerNav = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((l) => l.classList.remove("active"));
          const activeLink = document.querySelector(
            `.nav-link[href="#${entry.target.id}"]`
          );
          if (activeLink) activeLink.classList.add("active");
        }
      });
    },
    { rootMargin: "-50% 0px -50% 0px" }
  );

  sections.forEach((sec) => observerNav.observe(sec));

  /* ------- SCROLL REVEAL ------- */
  const revealElements = document.querySelectorAll(".reveal");

  const observerReveal = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.12 }
  );

  revealElements.forEach((el) => observerReveal.observe(el));

  /* ------- TYPED TAGLINE ------- */
  const taglines = [
    "Full-Stack Developer",
    "UI/UX Enthusiast",
    "Open Source Contributor",
    "Problem Solver",
  ];
  const typedEl = document.getElementById("typed-tagline");
  let taglineIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const current = taglines[taglineIndex];
    typedEl.textContent = current.substring(0, charIndex);

    if (!isDeleting && charIndex < current.length) {
      charIndex++;
      setTimeout(typeEffect, 80);
    } else if (isDeleting && charIndex > 0) {
      charIndex--;
      setTimeout(typeEffect, 40);
    } else if (!isDeleting && charIndex === current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1500);
    } else {
      isDeleting = false;
      taglineIndex = (taglineIndex + 1) % taglines.length;
      setTimeout(typeEffect, 400);
    }
  }

  typeEffect();

  /* ------- SKILL TABS ------- */
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabPanels = document.querySelectorAll(".skills-panel");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabPanels.forEach((p) => p.classList.remove("active"));
      btn.classList.add("active");
      document.getElementById(`tab-${btn.dataset.tab}`).classList.add("active");
      animateSkillBars();
    });
  });

  /* ------- SKILL BAR ANIMATION ------- */
  function animateSkillBars() {
    document.querySelectorAll(".skills-panel.active .skill-progress").forEach((bar) => {
      bar.style.width = "0";
      setTimeout(() => {
        bar.style.width = bar.dataset.width + "%";
      }, 100);
    });
  }

  // Animate when skills section comes into view
  const skillsSection = document.getElementById("skills");
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        animateSkillBars();
      }
    },
    { threshold: 0.3 }
  );
  skillsObserver.observe(skillsSection);

  /* ------- STAT COUNTER ANIMATION ------- */
  const statNumbers = document.querySelectorAll(".stat-number");

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          animateCounter(el, target);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  statNumbers.forEach((el) => counterObserver.observe(el));

  function animateCounter(el, target) {
    const duration = 1500;
    const startTime = performance.now();

    function step(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  /* ------- PARTICLES ------- */
  const particlesContainer = document.getElementById("particles");
  const particleCount = 30;

  for (let i = 0; i < particleCount; i++) {
    const p = document.createElement("div");
    p.classList.add("particle");
    p.style.left = Math.random() * 100 + "%";
    p.style.top = Math.random() * 100 + "%";
    p.style.width = Math.random() * 4 + 3 + "px";
    p.style.height = p.style.width;
    p.style.animationDuration = Math.random() * 8 + 6 + "s";
    p.style.animationDelay = Math.random() * 5 + "s";
    particlesContainer.appendChild(p);
  }

  /* ------- BACK TO TOP ------- */
  const backToTop = document.getElementById("back-to-top");
  window.addEventListener("scroll", () => {
    backToTop.classList.toggle("visible", window.scrollY > 500);
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  /* ------- CONTACT FORM — Web3Forms ------- */
  // -------------------------------------------------
  // HOW TO SET UP (takes 30 seconds):
  // 1. Go to https://web3forms.com
  // 2. Enter your email → you'll get an Access Key
  // 3. Paste the key in index.html inside the hidden
  //    input with name="access_key"
  // That's it! Messages go straight to your inbox.
  // -------------------------------------------------

  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const nameField = contactForm.querySelector('[name="name"]');
    const emailField = contactForm.querySelector('[name="email"]');
    const messageField = contactForm.querySelector('[name="message"]');

    const name = nameField.value.trim();
    const email = emailField.value.trim();
    const message = messageField.value.trim();

    if (!name || !email || !message) {
      showStatus("Please fill in all fields.", "error");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showStatus("Please enter a valid email address.", "error");
      return;
    }

    // Check if access key is configured
    const accessKey = contactForm.querySelector('[name="access_key"]').value;
    if (!accessKey || accessKey === "YOUR_ACCESS_KEY_HERE") {
      showStatus("Contact form not configured yet. Get a free key at web3forms.com", "error");
      return;
    }

    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i data-lucide="loader-2"></i> Sending...';
    lucide.createIcons();

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify({
          access_key: accessKey,
          name: name,
          email: email,
          message: message,
          subject: "New Portfolio Contact from " + name,
          from_name: "Portfolio Contact Form",
        }),
      });
      const result = await response.json();

      if (result.success) {
        showStatus("Message sent successfully! I'll get back to you soon.", "success");
        contactForm.reset();
        // Re-set the access key after reset
        contactForm.querySelector('[name="access_key"]').value = accessKey;
      } else {
        showStatus("Something went wrong. Please try again later.", "error");
      }
    } catch {
      showStatus("Network error. Please check your connection and try again.", "error");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i data-lucide="send"></i> Send Message';
      lucide.createIcons();
    }
  });

  function showStatus(msg, type) {
    formStatus.textContent = msg;
    formStatus.className = "form-status " + type;
    setTimeout(() => {
      formStatus.textContent = "";
      formStatus.className = "form-status";
    }, 5000);
  }
});
