// Navigation scroll effect
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > 100) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Hero parallax effect
const heroImage = document.querySelector('.hero-image');

window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.3;
  if (heroImage) {
    heroImage.style.transform = `translateY(${rate}px)`;
  }
});

// Intersection Observer for scroll animations
const observerOptions = {
  threshold: 0.15,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all animated elements
const animatedElements = document.querySelectorAll(
  '.menu-card, .testimonial-card, .gallery-item, .stat-item, .about-image, .about-text'
);

animatedElements.forEach(el => {
  observer.observe(el);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navHeight = nav.offsetHeight;
      const targetPosition = target.offsetTop - navHeight;
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Mobile navigation toggle
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    navToggle.classList.toggle('active');
  });
}

// Form submissions
const reservationForm = document.querySelector('.reservation-form');
const contactForm = document.querySelector('.form');

if (reservationForm) {
  reservationForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.date || !data.time || !data.guests || !data.name || !data.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Simulate submission
    const submitBtn = this.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Confirming...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Reservation request submitted! We will contact you shortly to confirm your booking.');
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.name || !data.email || !data.subject || !data.message) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Simulate submission
    const submitBtn = this.querySelector('.btn-primary');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      alert('Message sent successfully! We will get back to you within 24 hours.');
      this.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
  });
}

// Counter animation for stats
const animateCounters = () => {
  const counters = document.querySelectorAll('.stat-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.textContent.replace(/\D/g, ''));
    const suffix = counter.textContent.replace(/[\d]/g, '');
    let current = 0;
    const increment = target / 100;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        counter.textContent = target + suffix;
        clearInterval(timer);
      } else {
        counter.textContent = Math.floor(current) + suffix;
      }
    }, 20);
  });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  statsObserver.observe(statsSection);
}

// Set minimum date for reservation form to today
const dateInput = document.querySelector('#reservation-date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}

// Preload hero image for better performance
window.addEventListener('load', () => {
  const heroImg = document.querySelector('.hero-image');
  if (heroImg && heroImg.complete) {
    heroImg.style.transform = 'scale(1.02)';
  }
});