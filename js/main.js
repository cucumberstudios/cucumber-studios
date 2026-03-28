/* ============================================================
   CUCUMBER STUDIOS — MAIN JS
   ============================================================ */

// ── NAV scroll effect ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Hamburger mobile menu ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── Smooth active nav highlight ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');

const observerOptions = { rootMargin: '-40% 0px -55% 0px' };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, observerOptions);

sections.forEach(s => sectionObserver.observe(s));

// ── Scroll reveal ──
const revealEls = document.querySelectorAll(
  '.service-card, .process__step, .testimonial-card, .impact__item, .about__inner > *, .section-header, .clients__carousel'
);

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // Stagger siblings
      const siblings = [...entry.target.parentElement.querySelectorAll('.reveal')];
      const index = siblings.indexOf(entry.target);
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, index * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => revealObserver.observe(el));

// ── Clients carousel ──
const clientsTrack = document.getElementById('clientsTrack');

if (clientsTrack) {
  const clients = [
    { name: 'Trident Group', logo: 'assets/clients/trident-group.svg' },
    { name: 'Sprengal Foods', logo: 'assets/clients/sprengal-foods.svg' },
    { name: 'Zerund', logo: 'assets/clients/zerund.svg' },
    { name: 'Kaizen The Label', logo: 'assets/clients/kaizen-the-label.svg' },
    { name: 'First Brick', logo: 'assets/clients/first-brick.svg' },
  ];

  const getFallbackLetter = (name) => {
    const trimmed = name.trim();
    return trimmed ? trimmed.charAt(0).toUpperCase() : '?';
  };

  const createFallback = (name) => {
    const fallback = document.createElement('div');
    fallback.className = 'clients__logo-fallback';
    fallback.setAttribute('aria-label', `${name} fallback mark`);
    fallback.textContent = getFallbackLetter(name);
    return fallback;
  };

  const createLogoBadge = (client) => {
    const badge = document.createElement('div');
    badge.className = 'clients__logo-badge';

    if (!client.logo) {
      badge.appendChild(createFallback(client.name));
      return badge;
    }

    const image = document.createElement('img');
    image.className = 'clients__logo-image';
    image.src = client.logo;
    image.alt = `${client.name} logo`;
    image.loading = 'lazy';
    image.decoding = 'async';

    image.addEventListener('error', () => {
      if (!badge.querySelector('.clients__logo-fallback')) {
        image.remove();
        badge.appendChild(createFallback(client.name));
      }
    });

    badge.appendChild(image);
    return badge;
  };

  const createClientCard = (client, isClone = false) => {
    const item = document.createElement('article');
    item.className = 'clients__logo-item';
    item.setAttribute('role', 'listitem');
    if (isClone) {
      item.setAttribute('aria-hidden', 'true');
    }

    const meta = document.createElement('div');
    meta.className = 'clients__logo-meta';

    const name = document.createElement('div');
    name.className = 'clients__logo-name';
    name.textContent = client.name;

    const note = document.createElement('div');
    note.className = 'clients__logo-note';
    // note.textContent = 'Trusted client';

    meta.append(name, note);
    item.append(createLogoBadge(client), meta);
    return item;
  };

  [...clients, ...clients].forEach((client, index) => {
    clientsTrack.appendChild(createClientCard(client, index >= clients.length));
  });
}

// ── Contact form ──
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const btn = contactForm.querySelector('button[type="submit"]');
    const defaultBtnText = 'Send message →';
    btn.textContent = 'Sending...';
    btn.disabled = true;

    const formData = new FormData(contactForm);
    const action = contactForm.getAttribute('action');

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        contactForm.style.display = 'none';
        if (formSuccess) {
          formSuccess.style.display = 'block';
        }
      } else {
        btn.textContent = defaultBtnText;
        btn.disabled = false;
        alert('Something went wrong. Please try emailing us directly.');
      }
    } catch {
      btn.textContent = defaultBtnText;
      btn.disabled = false;
      alert('Network error. Please try emailing us directly.');
    }
  });
}

// ── Subtle cursor-tracked orb in hero ──
const hero = document.querySelector('.hero');
const orb1 = document.querySelector('.hero__orb--1');

if (hero && orb1) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 30;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    orb1.style.transform = `translate(${x}px, ${y}px)`;
  });
}
