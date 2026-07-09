document.addEventListener('DOMContentLoaded', () => {
    
    // --- Register GSAP Plugins ---
    gsap.registerPlugin(ScrollTrigger);

    // --- Initialize Lenis Smooth Scroll ---
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
        smoothWheel: true,
        touchMultiplier: 2
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);



    // --- Card Mouse-Tracking Glow Effect ---
    const glowCards = document.querySelectorAll('.service-card, .testimonial-list-item, .contact-form-panel, .hero-specs-card');
    glowCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // --- Magnetic Interactive Elements ---
    const magneticElements = document.querySelectorAll('.magnetic');
    magneticElements.forEach(elem => {
        const strength = parseFloat(elem.getAttribute('data-strength')) || 20;

        elem.addEventListener('mousemove', (e) => {
            const rect = elem.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const moveX = (e.clientX - centerX) / (rect.width / 2) * strength;
            const moveY = (e.clientY - centerY) / (rect.height / 2) * strength;

            gsap.to(elem, {
                x: moveX,
                y: moveY,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        elem.addEventListener('mouseleave', () => {
            gsap.to(elem, {
                x: 0,
                y: 0,
                duration: 0.5,
                ease: "elastic.out(1, 0.3)"
            });
        });
    });

    // --- Drawn-on-Scroll SVG Airflow Paths ---
    const paths = document.querySelectorAll('.airflow-path');
    paths.forEach(path => {
        const length = path.getTotalLength();
        path.style.strokeDasharray = `${length} ${length}`;
        path.style.strokeDashoffset = length;

        gsap.to(path, {
            strokeDashoffset: 0,
            ease: "none",
            scrollTrigger: {
                trigger: "body",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5
            }
        });
    });

    // --- Parallax Image Effects ---
    const parallaxImages = document.querySelectorAll('.project-card img, .about-img');
    parallaxImages.forEach(img => {
        gsap.to(img, {
            yPercent: 12,
            ease: "none",
            scrollTrigger: {
                trigger: img.parentElement,
                start: "top bottom",
                end: "bottom top",
                scrub: true
            }
        });
    });

    // --- Cinematic Text Reveals & Stagger Elements ---
    
    // Page load hero reveal
    const tlHero = gsap.timeline({ defaults: { ease: "power4.out" } });
    
    tlHero.to('.hero-title .reveal-inner', {
        y: 0,
        duration: 1.4,
        stagger: 0.25,
        delay: 0.2
    })
    .to('.gsap-reveal-fade', {
        opacity: 1,
        y: 0,
        duration: 1.0,
        stagger: 0.15
    }, "-=0.9");

    // Scroll trigger reveals for section tags (fades in)
    const tags = document.querySelectorAll('.gsap-tag');
    tags.forEach(tag => {
        gsap.fromTo(tag, 
            { opacity: 0, y: 15 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                scrollTrigger: {
                    trigger: tag,
                    start: "top 88%",
                    toggleActions: "play none none none"
                }
            }
        );
    });

    // Scroll trigger reveals for section titles (text reveal masks)
    const titles = document.querySelectorAll('.gsap-title');
    titles.forEach(title => {
        const original = title.innerHTML;
        // Wrap original innerHTML in block reveal classes
        title.innerHTML = `<span class="reveal-line" style="display: block;"><span class="reveal-inner" style="transform: translateY(105%); display: block; will-change: transform;">${original}</span></span>`;
        const inner = title.querySelector('.reveal-inner');

        gsap.to(inner, {
            y: 0,
            duration: 1.1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: title,
                start: "top 88%",
                toggleActions: "play none none none"
            }
        });
    });

    // Services stagger reveal
    gsap.fromTo('.service-card', 
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.services-bento-grid',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    // Testimonials grid stagger reveal
    gsap.fromTo('.testimonial-list-item, .testimonials-stats-row', 
        { opacity: 0, y: 40 },
        {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.testimonials-split-layout',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    // Portfolio grid items stagger reveal
    gsap.fromTo('.grid-item', 
        { opacity: 0, y: 50 },
        {
            opacity: 1,
            y: 0,
            duration: 1.0,
            stagger: 0.12,
            ease: "power3.out",
            scrollTrigger: {
                trigger: '.portfolio-offset-grid',
                start: "top 80%",
                toggleActions: "play none none none"
            }
        }
    );

    // --- Sticky Header Scroll Effect ---
    const header = document.getElementById('main-header');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // --- Mobile Menu Toggle ---
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    const toggleMobileMenu = () => {
        mobileMenuToggle.classList.toggle('open');
        navMenu.classList.toggle('open');
    };

    mobileMenuToggle.addEventListener('click', toggleMobileMenu);

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuToggle.classList.remove('open');
            navMenu.classList.remove('open');
        });
    });

    // --- Form Submission Handler ---
    const enquiryForm = document.getElementById('enquiry-form');
    const successBanner = document.getElementById('form-success-msg');

    if (enquiryForm) {
        enquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submissionData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                region: document.getElementById('project-city').value,
                message: document.getElementById('message').value
            };
            
            console.log('HVAC Consultation Form Submitted:', submissionData);

            // Animate transition to success banner using GSAP
            gsap.to(enquiryForm, {
                opacity: 0,
                y: -10,
                duration: 0.4,
                onComplete: () => {
                    enquiryForm.classList.add('hidden');
                    successBanner.classList.remove('hidden');
                    gsap.fromTo(successBanner, 
                        { opacity: 0, y: 15 },
                        { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
                    );
                }
            });
        });
    }
});
