document.addEventListener('DOMContentLoaded', () => {

  // ── 1. Custom Cursor (desktop only) ───────────────────
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
  if (!isTouchDevice) {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = 0, my = 0, rx = 0, ry = 0;

    document.addEventListener('mousemove', e => {
      mx = e.clientX; my = e.clientY;
      document.documentElement.style.setProperty('--cx', `${mx}px`);
      document.documentElement.style.setProperty('--cy', `${my}px`);
    });

    const followCursor = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      document.documentElement.style.setProperty('--fx', `${rx}px`);
      document.documentElement.style.setProperty('--fy', `${ry}px`);
      requestAnimationFrame(followCursor);
    };
    requestAnimationFrame(followCursor);

    document.querySelectorAll('a, button, .accordion-btn, .project-card, .ai-chip, .contact-social').forEach(el => {
      el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
      el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
    });
  }

  // ── 2. Nav scroll effect ───────────────────────────────
  const nav = document.getElementById('nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── 3. Mobile hamburger ────────────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const navMobile  = document.getElementById('navMobile');
  if (hamburger && navMobile) {
    hamburger.addEventListener('click', () => {
      const open = hamburger.classList.toggle('open');
      navMobile.classList.toggle('open', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    navMobile.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navMobile.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── 4. Scroll reveal ──────────────────────────────────
  const reveals = document.querySelectorAll('.reveal');
  if (reveals.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => observer.observe(el));
  }

  // ── 5. Skills Accordion ────────────────────────────────
  document.querySelectorAll('.accordion-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const item    = btn.parentElement;
      const isOpen  = item.classList.contains('open');
      document.querySelectorAll('.accordion-item').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── 6. Contact Form ────────────────────────────────────
  const form       = document.getElementById('contactForm');
  const statusEl   = document.getElementById('formStatus');
  const submitBtn  = document.getElementById('formSubmit');
  const btnLabel   = document.getElementById('btnLabel');
  const btnLoading = document.getElementById('btnLoading');

  if (form && statusEl) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const fields = ['name', 'email', 'subject', 'message'];
      let valid = true;
      fields.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        const empty = !el.value.trim();
        el.classList.toggle('invalid', empty);
        if (empty) valid = false;
      });

      if (!valid) {
        showStatus('Please fill in all fields.', 'error');
        return;
      }

      submitBtn.disabled = true;
      if (btnLabel)   btnLabel.style.display   = 'none';
      if (btnLoading) btnLoading.style.display  = 'inline';
      statusEl.className = 'form-status';

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name:    document.getElementById('name').value.trim(),
            email:   document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim(),
          }),
        });
        const data = await res.json();
        if (res.ok) {
          showStatus('Message sent! I\'ll get back to you soon.', 'success');
          form.reset();
        } else {
          showStatus(data.error || 'Something went wrong. Please try again.', 'error');
        }
      } catch {
        showStatus('Network error. Please check your connection and try again.', 'error');
      } finally {
        submitBtn.disabled = false;
        if (btnLabel)   btnLabel.style.display   = 'inline';
        if (btnLoading) btnLoading.style.display  = 'none';
      }
    });

    form.querySelectorAll('input, textarea').forEach(el => {
      el.addEventListener('input', () => el.classList.remove('invalid'));
    });
  }

  function showStatus(text, type) {
    statusEl.textContent = text;
    statusEl.className = `form-status show ${type}`;
  }

});
