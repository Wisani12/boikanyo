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

document.getElementById('bookingForm')?.addEventListener('submit', e => {
  e.preventDefault();
  const form = new FormData(e.currentTarget);
  const subject = encodeURIComponent(`Consultation request from ${form.get('name')}`);
  const body = encodeURIComponent(
    `Name: ${form.get('name')}\n` +
    `Phone: ${form.get('phone')}\n` +
    `WhatsApp: ${form.get('whatsapp')}\n` +
    `ID Number: ${form.get('idNumber')}\n` +
    `Email: ${form.get('email') || 'Not provided'}\n` +
    `Consultation: ${form.get('consultation')}\n` +
    `Payment: ${form.get('payment')}\n` +
    `Medical Aid Name: ${form.get('medicalAidName') || 'Not applicable'}\n` +
    `Medical Aid Option: ${form.get('medicalAidOption') || 'Not applicable'}\n` +
    `Medical Aid Number: ${form.get('medicalAidNumber') || 'Not applicable'}\n` +
    `Service: ${form.get('service')}\n\n` +
    `Message:\n${form.get('message') || 'No message provided'}`
  );

  window.location.href = `mailto:info@neoboikanyo.co.za?subject=${subject}&body=${body}`;
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
