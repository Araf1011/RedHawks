/* ================= Animated Background Particles ================= */
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// Mouse position
let mouse = { x: null, y: null, radius: 150 };

document.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

// Particle class
class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.color = `rgba(56, 189, 248, ${Math.random() * 0.5 + 0.2})`;
    }

    update() {
        // Mouse interaction - repulsion
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            const angle = Math.atan2(dy, dx);
            this.x -= Math.cos(angle) * force * 3;
            this.y -= Math.sin(angle) * force * 3;
        }

        // Normal movement
        this.x += this.speedX;
        this.y += this.speedY;

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();

        // Glow effect
        ctx.shadowBlur = 10;
        ctx.shadowColor = this.color;
    }
}

// Create particles
const particleCount = window.innerWidth < 768 ? 40 : 60;
const particles = [];
for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

// Animation loop
function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    requestAnimationFrame(animateParticles);
}

animateParticles();

/* ================= toggle icon navbar ================= */
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

if (menuIcon) {
    menuIcon.onclick = () => {
        menuIcon.classList.toggle('bx-x');
        menuIcon.children[0].classList.toggle('fa-times');
        navbar.classList.toggle('active');
    };
}

/* ================= scroll sections active link ================= */
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });

    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    if (navbar.classList.contains('active')) {
        menuIcon.classList.remove('bx-x');
        menuIcon.children[0].classList.remove('fa-times');
        navbar.classList.remove('active');
    }
};

/* ================= typed js ================= */
if (document.querySelector('.multiple-text')) {
    const typed = new Typed('.multiple-text', {
        strings: ['CSE Student', 'Frontend Developer', 'Problem Solver', 'Tech Enthusiast'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
}

/* ================= Interactive 3D Tilt (Roadmap & Bento Cards) ================= */
const tiltEls = document.querySelectorAll('.timeline-content, .bento-card');

tiltEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / 20; // Subtle Tilt
        const rotateY = (centerX - x) / 20;

        el.style.setProperty('--rotate-x', `${-rotateX}deg`);
        el.style.setProperty('--rotate-y', `${-rotateY}deg`);

        el.style.setProperty('--mouse-x', `${x}px`);
        el.style.setProperty('--mouse-y', `${y}px`);
    });

    el.addEventListener('mouseleave', () => {
        el.style.setProperty('--rotate-x', `0deg`);
        el.style.setProperty('--rotate-y', `0deg`);
    });
});

/* ================= Global Mouse Aura ================= */
const aura = document.querySelector('.mouse-aura');
if (aura) {
    document.addEventListener('mousemove', (e) => {
        aura.style.setProperty('--aura-x', `${e.clientX}px`);
        aura.style.setProperty('--aura-y', `${e.clientY}px`);
    });
}

/* ================= Magnetic Elements ================= */
const magneticEls = document.querySelectorAll('.magnetic');
magneticEls.forEach(el => {
    el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
    });

    el.addEventListener('mouseleave', () => {
        el.style.transform = `translate(0px, 0px)`;
    });
});

/* ================= Animated Stat Counters ================= */
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

const animateStats = () => {
    if (statsAnimated) return;

    statNumbers.forEach(stat => {
        const target = parseFloat(stat.getAttribute('data-target'));
        const isDecimal = target % 1 !== 0;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                stat.textContent = isDecimal ? current.toFixed(2) : Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                stat.textContent = isDecimal ? target.toFixed(2) : target;
            }
        };
        updateCounter();
    });
    statsAnimated = true;
};

// Trigger on scroll
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats();
            }
        });
    }, { threshold: 0.5 });

    observer.observe(statsSection);
}

/* ================= Timeline Card Mouse Tracking ================= */
const timelineCards = document.querySelectorAll('.timeline-content-box, .stat-card');
timelineCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});

/* ================= Skill Progress Bar Animation ================= */
const skillProgressBars = document.querySelectorAll('.skill-progress');
let skillsAnimated = false;

const animateSkillBars = () => {
    if (skillsAnimated) return;

    skillProgressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        setTimeout(() => {
            bar.style.width = `${progress}%`;
        }, 100);
    });

    skillsAnimated = true;
};

// Trigger animation when skills section is in view
const skillsSection = document.querySelector('.skills-bento-grid, .skills-grid');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkillBars();
            }
        });
    }, { threshold: 0.3 });

    skillsObserver.observe(skillsSection);
}

/* ================= Skill Box Mouse Tracking & 3D Tilt ================= */
const skillBoxes = document.querySelectorAll('.skill-box');
skillBoxes.forEach(box => {
    box.addEventListener('mousemove', (e) => {
        const rect = box.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        // Mouse spotlight effect
        box.style.setProperty('--mouse-x', `${x}px`);
        box.style.setProperty('--mouse-y', `${y}px`);

        // 3D Tilt effect
        if (box.hasAttribute('data-tilt')) {
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 15; // Subtle tilt
            const rotateY = (centerX - x) / 15;

            box.style.setProperty('--rotate-x', `${-rotateX}deg`);
            box.style.setProperty('--rotate-y', `${-rotateY}deg`);
        }
    });

    box.addEventListener('mouseleave', () => {
        // Reset 3D tilt
        box.style.setProperty('--rotate-x', '0deg');
        box.style.setProperty('--rotate-y', '0deg');
    });
});


