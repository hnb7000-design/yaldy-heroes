/* ============================================================
   YALDY HEROES UNIVERSE — Shared JavaScript
   Version: 2.0 Merged
   Loaded on every page. Handles: language, nav, particles, scroll
   ============================================================ */

(function () {
  'use strict';

  // ======== LANGUAGE TOGGLE (data-en / data-he) ========
  // Priority: 1. localStorage  2. navigator.language  3. default 'en'
  var lang = (function () {
    try {
      var saved = localStorage.getItem('yaldy-lang');
      if (saved === 'he' || saved === 'en') return saved;
    } catch (e) { /* storage blocked */ }
    var nav = navigator.language || navigator.userLanguage || '';
    if (nav.toLowerCase().indexOf('he') === 0) return 'he';
    return 'en';
  })();

  function setLang(newLang) {
    lang = newLang;
    try { localStorage.setItem('yaldy-lang', lang); } catch (e) { /* silent */ }
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;

    // Update all data-en / data-he elements (leaf nodes only, so child
    // elements like <span class="gold"> are not destroyed)
    document.querySelectorAll('[data-' + lang + ']').forEach(function (el) {
      if (el.hasAttribute('data-en') && el.hasAttribute('data-he')) {
        // Skip if any child element also carries data-en/data-he
        if (el.querySelector('[data-en][data-he]')) return;
        el.textContent = el.getAttribute('data-' + lang);
      }
    });

    // Update lang toggle button text
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = lang === 'en' ? '\u05E2\u05D1\u05E8\u05D9\u05EA' : 'English';
    });

    // Update form placeholders if they exist
    updatePlaceholders();
  }

  function toggleLang() {
    setLang(lang === 'en' ? 'he' : 'en');
  }

  // Expose globally
  window.toggleLang = toggleLang;
  window.currentLang = function () { return lang; };

  // ======== FORM PLACEHOLDERS ========
  function updatePlaceholders() {
    var map = {
      'fullName': { en: 'Full name', he: '\u05E9\u05DD \u05DE\u05DC\u05D0' },
      'phone': { en: 'Phone', he: '\u05D8\u05DC\u05E4\u05D5\u05DF' },
      'email': { en: 'Enter your email', he: '\u05D4\u05D6\u05D9\u05E0\u05D5 \u05D0\u05EA \u05D4\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC' },
      'contactName': { en: 'Your name', he: '\u05D4\u05E9\u05DD \u05E9\u05DC\u05DA' },
      'contactEmail': { en: 'Your email', he: '\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC' },
      'contactMessage': { en: 'Your message', he: '\u05D4\u05D4\u05D5\u05D3\u05E2\u05D4 \u05E9\u05DC\u05DA' }
    };
    Object.keys(map).forEach(function (id) {
      var el = document.getElementById(id);
      if (el) el.placeholder = map[id][lang];
    });
  }

  // ======== NAVBAR SCROLL ========
  function initNavScroll() {
    var nav = document.querySelector('.navbar');
    if (!nav) return;
    window.addEventListener('scroll', function () {
      nav.classList.toggle('scrolled', window.scrollY > 60);
    });
    // Initial check
    if (window.scrollY > 60) nav.classList.add('scrolled');
  }

  // ======== MOBILE MENU ========
  function initMobileMenu() {
    var toggle = document.getElementById('mobileToggle');
    var mob = document.getElementById('mobMenu');
    var overlay = document.getElementById('overlay');
    if (!toggle || !mob) return;

    function updateAria(isOpen) {
      toggle.setAttribute('aria-expanded', String(isOpen));
      mob.setAttribute('aria-hidden', String(!isOpen));
    }

    // Set initial ARIA state
    updateAria(mob.classList.contains('open'));

    function closeMenu() {
      mob.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      updateAria(false);
    }

    toggle.addEventListener('click', function () {
      var willOpen = !mob.classList.contains('open');
      mob.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
      updateAria(willOpen);
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && mob.classList.contains('open')) {
        closeMenu();
      }
    });

    if (overlay) overlay.addEventListener('click', closeMenu);
    mob.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', closeMenu);
    });
  }

  // ======== HERO SLIDER ========
  function initSlider() {
    var slides = document.querySelectorAll('.hero-slide');
    var dots = document.querySelectorAll('.hero-dot');
    if (slides.length === 0) return;

    var cur = 0;
    var total = slides.length;
    var autoTimer;

    function goSlide(n) {
      slides[cur].classList.remove('active');
      if (dots[cur]) dots[cur].classList.remove('active');
      cur = ((n % total) + total) % total;
      slides[cur].classList.add('active');
      if (dots[cur]) dots[cur].classList.add('active');
      clearInterval(autoTimer);
      autoTimer = setInterval(function () { goSlide(cur + 1); }, 6000);

      // Re-apply language if Hebrew is active
      if (lang === 'he') {
        setTimeout(function () {
          slides[cur].querySelectorAll('[data-he]').forEach(function (el) {
            if (el.hasAttribute('data-en') && !el.querySelector('[data-en][data-he]')) {
              el.textContent = el.getAttribute('data-he');
            }
          });
        }, 50);
      }
    }

    // Expose for onclick
    window.nextSlide = function () { goSlide(cur + 1); };
    window.prevSlide = function () { goSlide(cur - 1); };
    window.goSlide = function (n) { goSlide(n); };

    // Start auto
    autoTimer = setInterval(function () { goSlide(cur + 1); }, 6000);
  }

  // ======== SCROLL REVEAL ========
  function initScrollReveal() {
    var elements = document.querySelectorAll('.fade-in');
    if (elements.length === 0) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    elements.forEach(function (el) { observer.observe(el); });
  }

  // ======== RPG STAT BARS ========
  function initStatBars() {
    var statPanel = document.querySelector('.stat-panel');
    if (!statPanel) return;

    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.stat-bar-fill').forEach(function (bar, i) {
            setTimeout(function () {
              bar.style.width = bar.dataset.width + '%';
            }, i * 150);
          });
          barObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    barObserver.observe(statPanel);
  }

  // ======== FAQ ACCORDION ========
  function initFAQ() {
    document.querySelectorAll('.faq-q').forEach(function (q) {
      q.addEventListener('click', function () {
        var item = this.parentElement;
        // Close others
        document.querySelectorAll('.faq-item.open').forEach(function (other) {
          if (other !== item) other.classList.remove('open');
        });
        item.classList.toggle('open');
      });
    });
  }

  // ======== POLICY TABS ========
  function initPolicyTabs() {
    document.querySelectorAll('.pol-tab').forEach(function (tab) {
      tab.addEventListener('click', function () {
        var target = this.dataset.tab;
        document.querySelectorAll('.pol-content').forEach(function (c) { c.classList.remove('active'); });
        document.querySelectorAll('.pol-tab').forEach(function (t) { t.classList.remove('active'); });
        var el = document.getElementById('pol-' + target);
        if (el) el.classList.add('active');
        this.classList.add('active');
      });
    });
  }

  // ======== WEBHOOK CONFIG ========
  var WEBHOOK_SIGNUP  = 'https://hook.eu1.make.com/4uk3s7fpq42nyggr189npfkdvwfcfcl9';
  var WEBHOOK_CONTACT = 'https://hook.eu1.make.com/27y36vo2mgtgfxb16ch1craj1tft072k';

  function postWebhook(url, data, onDone, onErr) {
    if (!url) { if (onDone) onDone(); return; }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onload = function () {
      if (xhr.status >= 200 && xhr.status < 300) {
        if (onDone) onDone();
      } else {
        if (onErr) onErr();
      }
    };
    xhr.onerror = function () { if (onErr) onErr(); };
    xhr.send(JSON.stringify(data));
  }

  // ======== SIGNUP FORM ========
  function initSignup() {
    var form = document.getElementById('signupForm');
    var note = document.getElementById('signupNote');
    if (!form || !note) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var emailEl = document.getElementById('email');
      var nameEl = document.getElementById('fullName');
      var email = (emailEl ? emailEl.value : '').trim();
      var name = (nameEl ? nameEl.value : '').trim();

      // Validate email
      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        note.textContent = lang === 'he' ? '\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC \u05EA\u05E7\u05D9\u05DF' : 'Please enter a valid email';
        note.style.color = '#e74c3c';
        note.style.display = 'block';
        setTimeout(function () { note.style.display = 'none'; note.style.color = ''; }, 4000);
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var origText = btn.textContent;
      btn.textContent = lang === 'he' ? '...\u05E9\u05D5\u05DC\u05D7' : 'Sending...';
      btn.disabled = true;

      var payload = {
        name: name,
        email: email,
        source_page: window.location.href,
        timestamp: new Date().toISOString(),
        form_type: 'signup'
      };

      // localStorage backup
      try {
        var existing = JSON.parse(localStorage.getItem('yaldy_signups') || '[]');
        existing.push(payload);
        localStorage.setItem('yaldy_signups', JSON.stringify(existing));
      } catch (err) { /* silently fail if storage blocked */ }

      postWebhook(WEBHOOK_SIGNUP, payload, function () {
        note.textContent = lang === 'he' ? '\u2713 \u05E0\u05E8\u05E9\u05DE\u05EA \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!' : '\u2713 You\u2019re signed up!';
        note.style.color = '';
        note.style.display = 'block';
        form.reset();
        btn.textContent = origText; btn.disabled = false;
        setTimeout(function () { note.style.display = 'none'; }, 5000);
      }, function () {
        // Still show success since we saved to localStorage
        note.textContent = lang === 'he' ? '\u2713 \u05E0\u05E8\u05E9\u05DE\u05EA \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4!' : '\u2713 You\u2019re signed up!';
        note.style.color = '';
        note.style.display = 'block';
        form.reset();
        btn.textContent = origText; btn.disabled = false;
        setTimeout(function () { note.style.display = 'none'; }, 5000);
      });
    });
  }

  // ======== CONTACT FORM ========
  function initContactForm() {
    var form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var nameEl = document.getElementById('contactName');
      var emailEl = document.getElementById('contactEmail');
      var phoneEl = document.getElementById('contactPhone');
      var msgEl = document.getElementById('contactMessage');
      var errEl = document.getElementById('contactError');

      var name = (nameEl ? nameEl.value : '').trim();
      var email = (emailEl ? emailEl.value : '').trim();
      var phone = (phoneEl ? phoneEl.value : '').trim();
      var message = (msgEl ? msgEl.value : '').trim();

      // Validation
      if (errEl) errEl.style.display = 'none';
      if (!name || !email || !message) {
        if (errEl) {
          errEl.textContent = lang === 'he' ? '\u05E0\u05D0 \u05DC\u05DE\u05DC\u05D0 \u05D0\u05EA \u05DB\u05DC \u05E9\u05D3\u05D5\u05EA \u05D4\u05D7\u05D5\u05D1\u05D4' : 'Please fill in all required fields';
          errEl.style.display = 'block';
        }
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        if (errEl) {
          errEl.textContent = lang === 'he' ? '\u05E0\u05D0 \u05DC\u05D4\u05D6\u05D9\u05DF \u05D0\u05D9\u05DE\u05D9\u05D9\u05DC \u05EA\u05E7\u05D9\u05DF' : 'Please enter a valid email';
          errEl.style.display = 'block';
        }
        return;
      }

      var btn = form.querySelector('button[type="submit"]');
      var origText = btn.textContent;
      btn.textContent = lang === 'he' ? '...\u05E9\u05D5\u05DC\u05D7' : 'Sending...';
      btn.disabled = true;

      var payload = {
        name: name,
        email: email,
        phone: phone,
        message: message,
        timestamp: new Date().toISOString(),
        form_type: 'contact'
      };

      // localStorage backup
      try {
        var contacts = JSON.parse(localStorage.getItem('yaldy_contacts') || '[]');
        contacts.push(payload);
        localStorage.setItem('yaldy_contacts', JSON.stringify(contacts));
      } catch (err) { /* silent */ }

      postWebhook(WEBHOOK_CONTACT, payload, function () {
        form.innerHTML = '<p style="color:#c9a84c;font-size:1.2rem;text-align:center;padding:30px 0;">' +
          (lang === 'he' ? '\u2713 \u05D4\u05D4\u05D5\u05D3\u05E2\u05D4 \u05E0\u05E9\u05DC\u05D7\u05D4! \u05E0\u05D7\u05D6\u05D5\u05E8 \u05D0\u05DC\u05D9\u05DA \u05D1\u05D4\u05E7\u05D3\u05DD.' : '\u2713 Message sent! We\u2019ll get back to you soon.') + '</p>';
      }, function () {
        btn.textContent = origText; btn.disabled = false;
        if (errEl) {
          errEl.textContent = lang === 'he' ? '\u05E9\u05D2\u05D9\u05D0\u05D4 \u2014 \u05E0\u05E1\u05D5 \u05E9\u05D5\u05D1' : 'Error \u2014 please try again';
          errEl.style.display = 'block';
        }
      });
    });
  }

  // ======== CANVAS PARTICLES ========
  function initParticles() {
    var canvas = document.getElementById('particles');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');
    if (!ctx) return;
    var W, H, particles = [];

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function Particle() {
      this.x = Math.random() * W;
      this.y = Math.random() * H;
      this.r = Math.random() * 1.3 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = (Math.random() - 0.5) * 0.2;
      this.alpha = Math.random() * 0.45 + 0.1;
      this.gold = Math.random() > 0.45;
    }

    function init() {
      resize();
      particles = [];
      for (var i = 0; i < 80; i++) particles.push(new Particle());
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(function (p) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -5) p.x = W + 5;
        if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5;
        if (p.y > H + 5) p.y = -5;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = p.gold
          ? 'rgba(212,175,55,' + p.alpha + ')'
          : 'rgba(100,140,200,' + (p.alpha * 0.5) + ')';
        ctx.fill();
      });
      requestAnimationFrame(tick);
    }

    window.addEventListener('resize', resize);
    init();
    tick();
  }

  // ======== SMOOTH SCROLL (for anchor links) ========
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var href = this.getAttribute('href');
        if (href === '#') return;
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          var nav = document.querySelector('.navbar');
          var offset = nav ? nav.offsetHeight : 70;
          window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
        }
      });
    });
  }

  // ======== STICKY CTA BAR ========
  function initStickyCta() {
    var bar = document.getElementById('stickyCta');
    if (!bar) return;
    var shown = false;
    window.addEventListener('scroll', function () {
      if (window.scrollY > 600 && !shown) {
        bar.classList.add('visible');
        shown = true;
      } else if (window.scrollY <= 600 && shown) {
        bar.classList.remove('visible');
        shown = false;
      }
    });
  }

  // ======== INIT ALL ON DOM READY ========
  document.addEventListener('DOMContentLoaded', function () {
    // Apply saved/detected language before anything else
    if (lang !== 'en') setLang(lang);
    // Always update toggle button text on load
    document.querySelectorAll('.lang-toggle').forEach(function (btn) {
      btn.textContent = lang === 'en' ? '\u05E2\u05D1\u05E8\u05D9\u05EA' : 'English';
    });

    initNavScroll();
    initMobileMenu();
    initSlider();
    initScrollReveal();
    initStatBars();
    initFAQ();
    initPolicyTabs();
    initSignup();
    initContactForm();
    initSmoothScroll();
    initStickyCta();
    initParticles();
    updatePlaceholders();
    // Auto-update footer year
    document.querySelectorAll('.footer-year').forEach(function (el) { el.textContent = new Date().getFullYear(); });
  });

})();
