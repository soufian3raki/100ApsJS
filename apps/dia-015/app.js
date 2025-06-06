class Portfolio {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "E-commerce Platform",
                description: "Plataforma de comercio electrónico completa con carrito de compras, pagos y panel de administración.",
                category: "web",
                tags: ["React", "Node.js", "MongoDB"],
                image: "fas fa-shopping-cart",
                demo: "#",
                code: "#"
            },
            {
                id: 2,
                title: "Task Manager App",
                description: "Aplicación de gestión de tareas con interfaz intuitiva y funcionalidades avanzadas.",
                category: "web",
                tags: ["JavaScript", "CSS3", "HTML5"],
                image: "fas fa-tasks",
                demo: "#",
                code: "#"
            },
            {
                id: 3,
                title: "Weather Dashboard",
                description: "Dashboard del clima con pronósticos detallados y visualización de datos meteorológicos.",
                category: "web",
                tags: ["API", "JavaScript", "CSS3"],
                image: "fas fa-cloud-sun",
                demo: "#",
                code: "#"
            },
            {
                id: 4,
                title: "Music Player",
                description: "Reproductor de música con visualizador y controles avanzados de reproducción.",
                category: "web",
                tags: ["JavaScript", "Web Audio API", "CSS3"],
                image: "fas fa-music",
                demo: "#",
                code: "#"
            },
            {
                id: 5,
                title: "Mobile Banking App",
                description: "Aplicación móvil de banca con transacciones seguras y gestión de cuentas.",
                category: "mobile",
                tags: ["React Native", "Firebase", "Redux"],
                image: "fas fa-mobile-alt",
                demo: "#",
                code: "#"
            },
            {
                id: 6,
                title: "UI/UX Design System",
                description: "Sistema de diseño completo con componentes reutilizables y guías de estilo.",
                category: "design",
                tags: ["Figma", "Design System", "Prototyping"],
                image: "fas fa-palette",
                demo: "#",
                code: "#"
            }
        ];
        
        this.currentFilter = 'all';
        this.init();
    }
    
    init() {
        this.bindEvents();
        this.renderProjects();
        this.initAnimations();
        this.initSmoothScrolling();
        this.initMobileMenu();
    }
    
    bindEvents() {
        // Project filters
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.setFilter(e.target.dataset.filter);
            });
        });
        
        // Contact form
        const contactForm = document.getElementById('contactForm');
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.handleContactSubmit();
            });
        }
        
        // Scroll animations
        window.addEventListener('scroll', () => {
            this.handleScroll();
        });
    }
    
    setFilter(filter) {
        this.currentFilter = filter;
        
        // Update active filter button
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.filter === filter);
        });
        
        this.renderProjects();
    }
    
    renderProjects() {
        const projectsGrid = document.getElementById('projectsGrid');
        if (!projectsGrid) return;
        
        let filteredProjects = this.projects;
        
        if (this.currentFilter !== 'all') {
            filteredProjects = this.projects.filter(project => 
                project.category === this.currentFilter
            );
        }
        
        projectsGrid.innerHTML = '';
        
        filteredProjects.forEach(project => {
            const projectElement = this.createProjectElement(project);
            projectsGrid.appendChild(projectElement);
        });
    }
    
    createProjectElement(project) {
        const projectElement = document.createElement('div');
        projectElement.className = 'project-card';
        
        projectElement.innerHTML = `
            <div class="project-image">
                <i class="${project.image}"></i>
            </div>
            <div class="project-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                </div>
                <div class="project-links">
                    <a href="${project.demo}" class="project-link">Demo</a>
                    <a href="${project.code}" class="project-link">Código</a>
                </div>
            </div>
        `;
        
        return projectElement;
    }
    
    handleContactSubmit() {
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Simulate form submission
        console.log('Form submitted:', formData);
        
        // Show success message
        this.showNotification('¡Mensaje enviado con éxito!', 'success');
        
        // Reset form
        document.getElementById('contactForm').reset();
    }
    
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        
        // Style the notification
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        if (type === 'success') {
            notification.style.background = '#27ae60';
        } else {
            notification.style.background = '#3498db';
        }
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
    
    initAnimations() {
        // Animate skill progress bars
        const skillProgresses = document.querySelectorAll('.skill-progress');
        
        const animateSkills = () => {
            skillProgresses.forEach(progress => {
                const rect = progress.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    progress.style.width = progress.style.width || '0%';
                }
            });
        };
        
        // Initial animation
        setTimeout(animateSkills, 500);
        
        // Animate on scroll
        window.addEventListener('scroll', animateSkills);
    }
    
    initSmoothScrolling() {
        // Smooth scroll for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    }
    
    initMobileMenu() {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('navMenu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Close menu when clicking on a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
        }
    }
    
    handleScroll() {
        // Navbar background on scroll
        const navbar = document.querySelector('.navbar');
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
            }
        }
        
        // Animate elements on scroll
        const animateElements = document.querySelectorAll('.skill-item, .project-card, .stat');
        
        animateElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.8) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
}

// Global function for smooth scrolling
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    
    // Add initial styles for animations
    const style = document.createElement('style');
    style.textContent = `
        .skill-item, .project-card, .stat {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease;
        }
        
        .skill-item.show, .project-card.show, .stat.show {
            opacity: 1;
            transform: translateY(0);
        }
        
        .hamburger.active .bar:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active .bar:nth-child(1) {
            transform: translateY(8px) rotate(45deg);
        }
        
        .hamburger.active .bar:nth-child(3) {
            transform: translateY(-8px) rotate(-45deg);
        }
    `;
    document.head.appendChild(style);
});

// Add typing animation to hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.innerHTML;
        typeWriter(heroTitle, originalText, 50);
    }
}); 