/**
 * MUTED — Premium Air Purifier
 * Minimal Vanilla JavaScript
 */

// ==============================================================
// FOOTER MENU TOGGLE
// ==============================================================

(function () {
  const footerToggle = document.getElementById('footer-nav-toggle');
  const footerDropdown = document.getElementById('footer-nav-dropdown');

  if (!footerToggle || !footerDropdown) return;

  function toggleFooterMenu() {
    const isOpen = footerToggle.classList.contains('open');

    if (isOpen) {
      footerToggle.classList.remove('open');
      footerDropdown.classList.remove('open');
      footerToggle.setAttribute('aria-expanded', 'false');
    } else {
      footerToggle.classList.add('open');
      footerDropdown.classList.add('open');
      footerToggle.setAttribute('aria-expanded', 'true');
    }
  }

  function closeFooterMenu() {
    footerToggle.classList.remove('open');
    footerDropdown.classList.remove('open');
    footerToggle.setAttribute('aria-expanded', 'false');
  }

  footerToggle.addEventListener('click', toggleFooterMenu);

  // Close menu when a link is clicked
  document.querySelectorAll('#footer-nav-dropdown .nav-item').forEach((link) => {
    link.addEventListener('click', closeFooterMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', (event) => {
    const isClickInsideDropdown = footerDropdown.contains(event.target);
    const isClickOnToggle = footerToggle.contains(event.target);

    if (!isClickInsideDropdown && !isClickOnToggle && footerToggle.classList.contains('open')) {
      closeFooterMenu();
    }
  });
})();

// ==============================================================
// HEADER MENU TOGGLE
// ==============================================================
(function () {
  const headerToggle = document.getElementById('header-menu-button');
  const headerDropdown = document.getElementById('header-menu-dropdown');

  if (!headerToggle || !headerDropdown) return;

  function toggleHeaderMenu() {
    const isOpen = headerToggle.classList.contains('open');

    if (isOpen) {
      headerToggle.classList.remove('open');
      headerDropdown.classList.remove('open');
      headerToggle.setAttribute('aria-expanded', 'false');
      headerDropdown.setAttribute('aria-hidden', 'true');
    } else {
      headerToggle.classList.add('open');
      headerDropdown.classList.add('open');
      headerToggle.setAttribute('aria-expanded', 'true');
      headerDropdown.setAttribute('aria-hidden', 'false');
    }
  }

  function closeHeaderMenu() {
    headerToggle.classList.remove('open');
    headerDropdown.classList.remove('open');
    headerToggle.setAttribute('aria-expanded', 'false');
    headerDropdown.setAttribute('aria-hidden', 'true');
  }

  headerToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleHeaderMenu();
  });

  document.querySelectorAll('.header-menu-link').forEach((link) => {
    link.addEventListener('click', closeHeaderMenu);
  });

  document.addEventListener('click', (event) => {
    const isClickInsideHeader = headerDropdown.contains(event.target) || headerToggle.contains(event.target);

    if (!isClickInsideHeader && headerToggle.classList.contains('open')) {
      closeHeaderMenu();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && headerToggle.classList.contains('open')) {
      closeHeaderMenu();
      headerToggle.focus();
    }
  });
})();

// ==============================================================
// HEADER SCROLL EFFECT
// ==============================================================
(function () {
  const header = document.getElementById('header');

  if (!header) return;

  function updateHeaderOnScroll() {
    const isScrolled = window.scrollY > 50;
    if (isScrolled) {
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.1)';
    } else {
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.08)';
    }
  }

  window.addEventListener('scroll', updateHeaderOnScroll, { passive: true });
})();

// ==============================================================
// SMOOTH SCROLL LINK HANDLING WITH CONTACT PAGE
// ==============================================================
(function () {
  function closeContactPage() {
    const contactSection = document.querySelector('.contact-section');
    if (!contactSection) return; // guard against missing DOM node

    contactSection.classList.remove('active');
    // restore scroll
    document.body.style.overflow = 'auto';
  }

  // Close button handler - with stopPropagation to prevent backdrop click
  const closeBtn = document.getElementById('contact-close');
  if (closeBtn) {
    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      e.preventDefault();
      closeContactPage();
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      const contactSection = document.querySelector('.contact-section');
      if (contactSection && contactSection.classList.contains('active')) {
        closeContactPage();
      }
    }
  });

  // Close when clicking the backdrop (outside the contact-box)
  const contactSection = document.querySelector('.contact-section');
  if (contactSection) {
    contactSection.addEventListener('click', (e) => {
      // Only close if clicking directly on the section (backdrop), not on child elements
      if (e.target === contactSection) {
        closeContactPage();
      }
    }, true); // Use capture phase to catch clicks early
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', function (event) {
      const href = this.getAttribute('href');

      // Skip if href is just '#'
      if (href === '#') return;

      const target = document.querySelector(href);

      if (target) {
        event.preventDefault();

        // Special handling for contact page
        if (href === '#contact') {
          const contactSection = document.querySelector('.contact-section');
          const isActive = contactSection.classList.contains('active');

          if (isActive) {
            // Close contact page
            closeContactPage();
          } else {
            // Open contact page
            contactSection.classList.add('active');
            document.body.style.overflow = 'hidden';
            window.scrollTo(0, 0);
          }
        } else {
          // Close contact page if it's open and navigate to other section
          const contactSection = document.querySelector('.contact-section');
          if (contactSection.classList.contains('active')) {
            closeContactPage();
          }

          // Normal scroll for other sections
          setTimeout(() => {
            const headerHeight = document.getElementById('header')?.offsetHeight || 0;
            const targetPosition = target.offsetTop - headerHeight;

            window.scrollTo({
              top: targetPosition,
              behavior: 'smooth',
            });
          }, 50);
        }
      }
    });
  });
})();

// ==============================================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ==============================================================
(function () {
  if (!('IntersectionObserver' in window)) return;

  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe feature cards and product sections
  document.querySelectorAll('.feature-card, .section').forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 600ms ease-out, transform 600ms ease-out';
    observer.observe(el);
  });
})();

// ==============================================================
// FOCUS MANAGEMENT FOR KEYBOARD USERS
// ==============================================================
(function () {
  const buttons = document.querySelectorAll('button, a, [role="button"]');

  buttons.forEach((button) => {
    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        if (button.tagName === 'A' && !button.getAttribute('href')?.startsWith('#')) {
          return;
        }
      }
    });
  });
})();

// ==============================================================
// REDUCE MOTION SUPPORT
// ==============================================================
(function () {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    document.documentElement.style.scrollBehavior = 'auto';

    document.querySelectorAll('*').forEach((el) => {
      const style = window.getComputedStyle(el);
      if (style.animation || style.transition) {
        el.style.animation = 'none';
        el.style.transition = 'none';
      }
    });
  }
})();

// ==============================================================
// PREVENT LAYOUT SHIFT ON SCROLL
// ==============================================================
(function () {
  // Add scrollbar width to prevent layout shift
  function updateScrollbarWidth() {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
  }

  updateScrollbarWidth();
  window.addEventListener('resize', updateScrollbarWidth);
})();

// ==============================================================
// CONSOLE MESSAGE
// ==============================================================
console.log(
  '%cMUTED — Premium Air Purification',
  'font-size: 14px; font-weight: bold; color: #ffffff; background: #000000; padding: 10px; border-radius: 4px;'
);
console.log('%cBuilt with precision. Engineered for silence.', 'color: #bfbfbf;');
