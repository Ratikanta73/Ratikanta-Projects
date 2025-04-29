// ========================
// PRELOADER
// ========================
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    setTimeout(() => {
        preloader.classList.add('hide');
    }, 500);
});

// ========================
// NAVBAR
// ========================
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-links');

// Add scrolled class to navbar when scrolling
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Highlight active nav link on scroll
window.addEventListener('scroll', () => {
    let current = '';
    
    const sections = document.querySelectorAll('section');
    const navHeight = navbar.offsetHeight;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - navHeight - 50;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// ========================
// SCROLL REVEAL ANIMATION
// ========================
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    
    revealElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
};

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);

// ========================
// BACK TO TOP BUTTON
// ========================
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ========================
// LIGHTBOX FUNCTIONALITY
// ========================
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const closeLightbox = document.querySelector('.close-lightbox');
const lightboxBtns = document.querySelectorAll('.lightbox-btn');

lightboxBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const imgSrc = btn.getAttribute('data-img');
        const imgTitle = btn.getAttribute('data-title');
        
        lightboxImg.src = imgSrc;
        lightboxCaption.textContent = imgTitle;
        lightbox.classList.add('show');
        document.body.style.overflow = 'hidden';
    });
});

closeLightbox.addEventListener('click', () => {
    lightbox.classList.remove('show');
    document.body.style.overflow = '';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('show');
        document.body.style.overflow = '';
    }
});

// ========================
// FORM VALIDATION
// ========================
const contactForm = document.getElementById('contact-form');
const whatsappNumber = '+917847038007'; // Replace with your WhatsApp number (with country code)

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const sendToWhatsApp = document.getElementById('send-to-whatsapp').checked;
    
    // Simple validation
    if (nameInput.value.trim() === '') {
        showFormError(nameInput, 'Please enter your name');
        return;
    }
    
    if (emailInput.value.trim() === '') {
        showFormError(emailInput, 'Please enter your email');
        return;
    }
    
    if (!isValidEmail(emailInput.value)) {
        showFormError(emailInput, 'Please enter a valid email');
        return;
    }
    
    if (messageInput.value.trim() === '') {
        showFormError(messageInput, 'Please enter your message');
        return;
    }
    
    // Format message for WhatsApp
    if (sendToWhatsApp) {
        const formattedMessage = `
*Contact Form Submission*
------------------------
*Name:* ${nameInput.value}
*Email:* ${emailInput.value}
*Message:* ${messageInput.value}
------------------------
        `.trim();
        
        // Encode the message for URL
        const encodedMessage = encodeURIComponent(formattedMessage);
        
        // Create WhatsApp URL
        const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
        
        // Open WhatsApp in a new tab
        window.open(whatsappURL, '_blank');
    }
    
    // Show success message
    document.getElementById('success-message').style.display = 'block';
    
    // Reset form
    contactForm.reset();
    
    // Hide success message after 3 seconds
    setTimeout(() => {
        document.getElementById('success-message').style.display = 'none';
    }, 3000);
});

function showFormError(input, message) {
    const formGroup = input.parentElement;
    
    // Remove any existing error message
    const existingError = formGroup.querySelector('.error-message');
    if (existingError) {
        formGroup.removeChild(existingError);
    }
    
    // Create error message
    const errorMessage = document.createElement('div');
    errorMessage.className = 'error-message';
    errorMessage.textContent = message;
    errorMessage.style.color = '#ff3860';
    errorMessage.style.fontSize = '0.8rem';
    errorMessage.style.marginTop = '5px';
    
    // Add red border to input
    input.style.borderColor = '#ff3860';
    
    // Add error message to form group
    formGroup.appendChild(errorMessage);
    
    // Remove error on input focus
    input.addEventListener('focus', () => {
        input.style.borderColor = '';
        const error = formGroup.querySelector('.error-message');
        if (error) {
            formGroup.removeChild(error);
        }
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
// ========================
// PARALLAX EFFECT FOR HERO
// ========================
const parallaxBg = document.querySelector('.parallax-bg');

window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    if (parallaxBg) {
        parallaxBg.style.transform = `translateY(${scrollPosition * 0.5}px)`;
    }
});

// ========================
// SMOOTH SCROLLING FOR ANCHOR LINKS
// ========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const navHeight = document.getElementById('navbar').offsetHeight;
            const targetPosition = targetElement.offsetTop - navHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});