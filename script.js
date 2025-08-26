// Theme Toggle Functionality
const themeToggle = document.getElementById('themeToggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference or respect OS preference
const savedTheme = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    body.classList.replace('light-theme', 'dark-theme');
    icon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-theme')) {
        body.classList.replace('light-theme', 'dark-theme');
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.replace('dark-theme', 'light-theme');
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Portfolio Tabs
const portfolioTabs = document.querySelectorAll('.portfolio-tab');
const portfolioContents = document.querySelectorAll('.portfolio-content');

portfolioTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        
        // Update active tab
        portfolioTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        // Show target content
        portfolioContents.forEach(content => {
            content.classList.remove('active');
            if (content.id === target) {
                content.classList.add('active');
            }
        });
    });
});

// Initialize all sliders
const sliders = {
    dataScienceSlider: {
        element: document.getElementById('dataScienceSlider'),
        currentSlide: 0,
        totalSlides: document.querySelectorAll('#dataScienceSlider .slide').length
    },
    webDevSlider: {
        element: document.getElementById('webDevSlider'),
        currentSlide: 0,
        totalSlides: document.querySelectorAll('#webDevSlider .slide').length
    },
    cloudSlider: {
        element: document.getElementById('cloudSlider'),
        currentSlide: 0,
        totalSlides: document.querySelectorAll('#cloudSlider .slide').length
    }
};

// Initialize dots for each slider
function initDots(sliderId, totalSlides) {
    const dotsContainer = document.getElementById(sliderId + 'Dots');
    dotsContainer.innerHTML = '';
    
    for (let i = 0; i < totalSlides; i++) {
        const dot = document.createElement('div');
        dot.classList.add('slider-dot');
        if (i === 0) dot.classList.add('active');
        dot.setAttribute('data-index', i);
        dot.setAttribute('data-slider', sliderId);
        dotsContainer.appendChild(dot);
    }
}

// Initialize all dots
for (const [sliderId, slider] of Object.entries(sliders)) {
    initDots(sliderId, slider.totalSlides);
}

// Update slider position
function updateSlider(sliderId, slideIndex) {
    const slider = sliders[sliderId];
    slider.currentSlide = slideIndex;
    slider.element.style.transform = `translateX(-${slideIndex * 100}%)`;
    
    // Update dots
    const dots = document.querySelectorAll(`#${sliderId}Dots .slider-dot`);
    dots.forEach((dot, index) => {
        if (index === slideIndex) {
            dot.classList.add('active');
        } else {
                    dot.classList.remove('active');
        }
    });
}

// Handle slider button clicks
document.querySelectorAll('.slider-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const sliderId = btn.getAttribute('data-slider');
        const slider = sliders[sliderId];
        let newSlide = slider.currentSlide;
        
        if (btn.classList.contains('next')) {
            newSlide = (newSlide + 1) % slider.totalSlides;
        } else {
            newSlide = (newSlide - 1 + slider.totalSlides) % slider.totalSlides;
        }
        
        updateSlider(sliderId, newSlide);
    });
});

// Handle dot clicks
document.querySelectorAll('.slider-dot').forEach(dot => {
    dot.addEventListener('click', () => {
        const sliderId = dot.getAttribute('data-slider');
        const slideIndex = parseInt(dot.getAttribute('data-index'));
        updateSlider(sliderId, slideIndex);
    });
});

// Smooth scrolling for navigation links - UPDATED VERSION
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            // Get the exact header height
            const headerHeight = document.querySelector('header').offsetHeight;
            
            // Calculate position with additional offset for better visibility
            const additionalOffset = 20; // Extra space to make sure content is fully visible
            const targetPosition = targetElement.offsetTop - headerHeight - additionalOffset;
            
            // Scroll to the position
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update URL
            history.replaceState(null, null, targetId);
        }
    });
});

// Form Submission
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    contactForm.reset();
});

// Animation for elements on scroll
const fadeElements = document.querySelectorAll('.fade-in');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
        }
    });
}, {
    threshold: 0.1
});

fadeElements.forEach(element => {
    element.style.opacity = 0;
    element.style.transition = 'opacity 0.5s ease-in-out';
    observer.observe(element);
});
