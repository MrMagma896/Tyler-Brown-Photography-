// ── NAV ──
const navToggle = document.querySelector('.nav-toggle');
const navLinks  = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
  navLinks.querySelectorAll('a').forEach(l => l.addEventListener('click', () => navLinks.classList.remove('open')));
}

const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(link => {
  if (link.getAttribute('href') === currentPage) link.classList.add('active');
});

// ── FADE IN ON SCROLL ──
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// ── LIGHTBOX ──
const lightbox    = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

function openLightbox(src) {
  if (!lightbox) return;
  lightboxImg.src = src;
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  if (!lightbox) return;
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

if (lightbox) {
  lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
}

// Event delegation so dynamically added photos open the lightbox too
document.addEventListener('click', e => {
  const item = e.target.closest('.gallery-item, .photo-card');
  if (item) {
    const img = item.querySelector('img');
    if (img) openLightbox(img.src);
  }
});

// ── GALLERY FILTER ──
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    // Query live so dynamically added items are included
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.style.display = (f === 'all' || item.dataset.category === f) ? 'block' : 'none';
    });
  });
});

// ── IMAGE PROTECTION ──
document.addEventListener('contextmenu', e => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 's') e.preventDefault();
});

document.addEventListener('dragstart', e => {
  if (e.target.tagName === 'IMG') e.preventDefault();
});

document.querySelectorAll('img').forEach(img => img.setAttribute('draggable', 'false'));

// ── PHOTO REGISTRY ──
// To add a photo: drop the file in images/, then add one entry to images/photos.json.
// The gallery and "Recent Photography" section update automatically.
async function loadPhotos() {
  try {
    const res = await fetch('images/photos.json');
    if (!res.ok) return;
    const photos = await res.json();
    if (!Array.isArray(photos) || photos.length === 0) return;

    // Home page — replace placeholder cards in the featured grid with real photos
    const featuredGrid = document.querySelector('.featured-grid');
    if (featuredGrid) {
      const cards = featuredGrid.querySelectorAll('.photo-card');
      photos.slice(0, 3).forEach((photo, i) => {
        if (cards[i]) {
          cards[i].innerHTML = `
            <img src="images/${photo.file}" alt="${photo.alt}" />
            <div class="photo-card-overlay"><span class="photo-card-label">${photo.label}</span></div>
          `;
        }
      });
    }

    // Gallery page — populate the full grid from all photos
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
      galleryGrid.innerHTML = photos.map(p => `
        <div class="gallery-item fade-in" data-category="${p.category}">
          <img src="images/${p.file}" alt="${p.alt}" />
          <span class="gallery-item-label">${p.label}</span>
        </div>
      `).join('');
      galleryGrid.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
    }
  } catch {
    // photos.json missing or unreadable — static placeholders remain visible
  }
}

loadPhotos();

// ── CONTACT FORM ──
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = contactForm.querySelector('button[type="submit"]');
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Sign up at https://formspree.io — replace YOUR_FORM_ID below
    const FORMSPREE_ID = 'YOUR_FORM_ID';

    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        contactForm.style.display = 'none';
        if (formSuccess) formSuccess.style.display = 'block';
      } else {
        btn.textContent = 'Send Inquiry';
        btn.disabled = false;
        alert('Something went wrong — please try again.');
      }
    } catch {
      btn.textContent = 'Send Inquiry';
      btn.disabled = false;
      alert('Something went wrong — please try again.');
    }
  });
}
