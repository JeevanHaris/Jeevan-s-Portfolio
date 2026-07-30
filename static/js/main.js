/* ============================================================
   Jeevan Haris Portfolio — Vanilla JavaScript
   Replaces: framer-motion, React hooks, Radix UI
   ============================================================ */

/* ── Helpers ─────────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

/* ── 1. FADE-IN via IntersectionObserver ────────────────── */
function initFadeIns() {
  const els = $$('.fade-in-el');
  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseFloat(el.dataset.delay || 0);
          setTimeout(() => el.classList.add('visible'), delay * 1000);
          observer.unobserve(el);
        }
      });
    },
    { threshold: 0.1, rootMargin: '50px' }
  );

  els.forEach((el) => observer.observe(el));
}

/* ── 2. ANIMATED TEXT (scroll-based per-character opacity) ─ */
function initAnimatedText() {
  const container = $('#animated-bio');
  if (!container) return;

  // Build character spans
  const text = container.dataset.text || '';
  const words = text.split(' ');

  container.innerHTML = words
    .map(
      (word) =>
        `<span class="word-wrap">${word
          .split('')
          .map((ch) => `<span class="word-char">${ch === ' ' ? '&nbsp;' : ch}</span>`)
          .join('')}</span>`
    )
    .join('<span class="word-gap"> </span>');

  const chars = $$('.word-char', container);
  const total = chars.length;

  function updateOpacity() {
    const rect = container.getBoundingClientRect();
    const winH = window.innerHeight;
    // progress: 0 when element top hits 80% of viewport, 1 when bottom hits 40%
    const start = winH * 0.8;
    const end = winH * 0.4;
    const progress = 1 - Math.max(0, Math.min(1, (rect.top - end) / (start - end)));

    chars.forEach((char, i) => {
      const charStart = i / total;
      const charEnd = charStart + 1 / total;
      const charProgress = Math.max(0, Math.min(1, (progress - charStart) / (charEnd - charStart)));
      char.style.opacity = 0.2 + charProgress * 0.8;
    });
  }

  window.addEventListener('scroll', updateOpacity, { passive: true });
  updateOpacity();
}

/* ── 3. MAGNET EFFECT ─────────────────────────────────────── */
function initMagnet() {
  const el = $('#hero-magnet');
  if (!el) return;

  const PADDING = 150;
  const STRENGTH = 3;

  window.addEventListener('mousemove', (e) => {
    const { left, top, width, height } = el.getBoundingClientRect();
    const style = window.getComputedStyle(el);
    const matrix = new DOMMatrixReadOnly(style.transform);

    const centerX = left - matrix.m41 + width / 2;
    const centerY = top - matrix.m42 + height / 2;

    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const trigger = Math.max(width, height) / 2 + PADDING;

    if (dist < trigger) {
      el.style.transition = 'transform 0.3s ease-out';
      el.style.transform = `translate3d(${dx / STRENGTH}px, ${dy / STRENGTH}px, 0)`;
    } else {
      el.style.transition = 'transform 0.6s ease-in-out';
      el.style.transform = 'translate3d(0,0,0)';
    }
  });
}

/* ── 4. PARALLAX MARQUEE ──────────────────────────────────── */
function initMarquee() {
  const section = $('#marquee-section');
  const row1 = $('#marquee-row1');
  const row2 = $('#marquee-row2');
  if (!section || !row1 || !row2) return;

  function updateMarquee() {
    const sectionTop = section.offsetTop;
    const scrollPos = window.scrollY;
    const winHeight = window.innerHeight;
    const offset = (scrollPos - sectionTop + winHeight) * 0.3;

    row1.style.transform = `translate3d(${offset - 200}px, 0, 0)`;
    row2.style.transform = `translate3d(${-(offset - 200)}px, 0, 0)`;
  }

  window.addEventListener('scroll', updateMarquee, { passive: true });
  updateMarquee();
}

/* ── 5. STICKY PROJECT CARDS with scale ──────────────────── */
function initProjectCards() {
  const slots = $$('.project-slot');
  const total = slots.length;
  if (!total) return;

  function updateCards() {
    slots.forEach((slot, index) => {
      const card = slot.querySelector('.project-card');
      if (!card) return;

      const rect = slot.getBoundingClientRect();
      const winH = window.innerHeight;

      // scrollYProgress: 0 when slot top enters view, 1 when slot bottom leaves top
      const progress = Math.max(0, Math.min(1, -rect.top / (rect.height - winH + rect.height)));
      const targetScale = 1 - (total - 1 - index) * 0.03;
      const scale = 1 + (targetScale - 1) * progress;

      card.style.transform = `scale(${scale})`;
      card.style.marginTop = `${index * 28}px`;
    });
  }

  window.addEventListener('scroll', updateCards, { passive: true });
  updateCards();
}

/* ── 6. CONTACT FORM AJAX ─────────────────────────────────── */
function initContactForm() {
  const form = $('#contact-form');
  if (!form) return;

  const statusEl = $('#form-status');
  const submitBtn = form.querySelector('[type="submit"]');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    if (statusEl) { statusEl.className = 'form-status'; statusEl.textContent = ''; }

    const data = {
      name: form.name.value,
      email: form.email.value,
      subject: form.subject.value || 'Portfolio Inquiry',
      message: form.message.value,
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (res.ok && json.success) {
        if (statusEl) {
          statusEl.className = 'form-status success';
          statusEl.textContent = json.message;
        }
        form.reset();
      } else {
        const errors = json.errors ? Object.values(json.errors).join(' • ') : 'Something went wrong.';
        if (statusEl) {
          statusEl.className = 'form-status error';
          statusEl.textContent = errors;
        }
      }
    } catch {
      if (statusEl) {
        statusEl.className = 'form-status error';
        statusEl.textContent = 'Network error — please try again.';
      }
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Send Message';
    }
  });
}

/* ── 7. NAVBAR hide / show on scroll ─────────────────────── */
function initNavbar() {
  const nav = $('#hero-nav');
  if (!nav) return;
  let lastY = 0;
  window.addEventListener('scroll', () => {
    const y = window.scrollY;
    // Only hide if scrolled more than 100px into the page
    if (y > 100 && y > lastY) {
      nav.style.opacity = '0';
      nav.style.pointerEvents = 'none';
    } else {
      nav.style.opacity = '1';
      nav.style.pointerEvents = '';
    }
    lastY = y;
  }, { passive: true });
}

/* ── Boot ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  initFadeIns();
  initAnimatedText();
  initMagnet();
  initMarquee();
  initProjectCards();
  initContactForm();
  initNavbar();
});
