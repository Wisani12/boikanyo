const menuBtn = document.querySelector('.menu-btn');
const navLinks = document.querySelector('.nav-links');

menuBtn?.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  menuBtn.textContent = open ? '✕' : '☰';
});

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    menuBtn.textContent = '☰';
    menuBtn.setAttribute('aria-expanded', 'false');
  });
});

document.querySelectorAll('.faq-item button').forEach(button => {
  button.addEventListener('click', () => {
    const item = button.parentElement;
    const isOpen = item.classList.contains('open');

    document.querySelectorAll('.faq-item').forEach(faq => {
      faq.classList.remove('open');
      faq.querySelector('button b').textContent = '+';
    });

    if (!isOpen) {
      item.classList.add('open');
      button.querySelector('b').textContent = '−';
    }
  });
});

document.getElementById('bookingForm')?.addEventListener('submit', async event => {
  event.preventDefault();

  const form = event.currentTarget;
  const button = form.querySelector('button[type="submit"]');
  const status = document.getElementById('formStatus');
  const originalText = button.textContent;

  button.disabled = true;
  button.textContent = 'Sending...';
  status.className = 'form-status';
  status.textContent = '';

  try {
    const endpoint = form.action.replace('formsubmit.co/', 'formsubmit.co/ajax/');
    const response = await fetch(endpoint, {
      method: 'POST',
      body: new FormData(form),
      headers: { Accept: 'application/json' }
    });
    const result = await response.json();

    if (!response.ok || result.success === false) {
      throw new Error('The request could not be sent.');
    }

    status.className = 'form-status success';
    status.textContent = 'Request sent. Thank you — the practice will contact you soon.';
    form.reset();
  } catch (error) {
    status.className = 'form-status error';
    status.textContent = 'Your request could not be sent. Please try again or WhatsApp the practice.';
  } finally {
    button.disabled = false;
    button.textContent = originalText;
  }
});

document.getElementById('year').textContent = new Date().getFullYear();

const items = document.querySelectorAll(
  '.service-card, .process-grid article, .expectations-cards>div, .focus-list>div'
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });

  items.forEach(item => {
    item.classList.add('reveal');
    observer.observe(item);
  });
}
