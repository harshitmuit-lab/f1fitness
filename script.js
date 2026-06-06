document.addEventListener('DOMContentLoaded', () => {
    // =========================================
    // Toast Notification System
    // =========================================
    function showToast(message, type = 'success') {
        const toast = document.getElementById('toast');
        if (!toast) return;

        toast.textContent = message;
        toast.className = 'toast';
        toast.classList.add(`toast-${type}`, 'show');

        setTimeout(() => {
            toast.classList.remove('show');
        }, 4000);
    }

    // =========================================
    // Navbar Scroll Effect
    // =========================================
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });

    // =========================================
    // Mobile Menu Toggle
    // =========================================
    const menuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active') &&
                !navLinks.contains(e.target) &&
                !menuBtn.contains(e.target)) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Close menu on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && navLinks.classList.contains('active')) {
                menuBtn.classList.remove('active');
                navLinks.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // =========================================
    // Intersection Observer for Scroll Animations
    // =========================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');

                // Counter animation
                const counters = entry.target.querySelectorAll('.count-up');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const duration = 2000;
                    const increment = target / (duration / 16);

                    let current = 0;
                    const updateCounter = () => {
                        current += increment;
                        if (current < target) {
                            counter.innerText = Math.ceil(current).toLocaleString();
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.innerText = target.toLocaleString();
                        }
                    };
                    updateCounter();
                });

                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll(
        '.fade-in, .fade-in-up, .slide-up, .slide-left, .slide-right, .scale-up'
    ).forEach(el => observer.observe(el));

    // Fallback for hero content
    setTimeout(() => {
        const heroContent = document.querySelector('.hero-content');
        if (heroContent && !heroContent.classList.contains('appear')) {
            heroContent.classList.add('appear');
        }
    }, 500);

    // =========================================
    // GSAP ScrollTrigger — Testimonials Ribbon
    // =========================================
    if (typeof gsap !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const topRow = document.querySelector('.top-row .scroller-track');
        const midRow = document.querySelector('.mid-row .scroller-track');

        if (topRow && midRow) {
            const masterTl = gsap.timeline({
                scrollTrigger: {
                    trigger: "#testimonials",
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1.5
                }
            });

            masterTl.fromTo(topRow, { x: "0%" }, { x: "-50%", ease: "none" }, 0);
            masterTl.fromTo(midRow, { x: "-50%" }, { x: "0%", ease: "none" }, 0);
        }

        // =========================================
        // Canvas Image Sequence — Hero
        // =========================================
        function setupCanvasSequence(canvasId, imagePathFunc, frameCount, startFrameIndex, fps) {
            const canvas = document.getElementById(canvasId);
            if (!canvas) return;
            const context = canvas.getContext('2d');

            canvas.width = 1920;
            canvas.height = 1080;

            const images = [];
            const seqData = { frame: 0 };

            for (let i = 0; i < frameCount; i++) {
                const img = new Image();
                const frameNum = (i + startFrameIndex).toString().padStart(3, '0');
                img.src = imagePathFunc(frameNum);
                images.push(img);
            }

            images[0].onload = render;

            const duration = frameCount / fps;

            gsap.to(seqData, {
                frame: frameCount - 1,
                snap: "frame",
                ease: "none",
                duration: duration,
                repeat: -1,
                onUpdate: render
            });

            function render() {
                if (!images[seqData.frame] || !images[seqData.frame].complete) return;

                context.clearRect(0, 0, canvas.width, canvas.height);
                const img = images[seqData.frame];

                const canvasRatio = canvas.width / canvas.height;
                const imgRatio = img.width / img.height;

                let drawWidth = canvas.width;
                let drawHeight = canvas.height;
                let diffX = 0;
                let diffY = 0;

                if (canvasRatio > imgRatio) {
                    drawHeight = canvas.width / imgRatio;
                    diffY = (drawHeight - canvas.height) / 2;
                } else {
                    drawWidth = canvas.height * imgRatio;
                    diffX = (drawWidth - canvas.width) / 2;
                }

                context.drawImage(img, -diffX, -diffY, drawWidth, drawHeight);
            }

            window.addEventListener('resize', render, { passive: true });
        }

        setupCanvasSequence(
            'hero-canvas',
            num => `assets/hero/ezgif-frame-${num}.jpg`,
            147, 1, 24
        );
    }

    // =========================================
    // Web3Forms AJAX Submission
    // =========================================
    const ctaForm = document.getElementById('cta-form');
    if (ctaForm) {
        ctaForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const accessKey = ctaForm.querySelector('input[name="access_key"]').value;
            if (accessKey === 'YOUR_ACCESS_KEY_HERE') {
                showToast('Please configure your Web3Forms Access Key first!', 'error');
                return;
            }

            const formData = new FormData(ctaForm);
            const json = JSON.stringify(Object.fromEntries(formData));

            const submitBtn = ctaForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = "SUBMITTING...";
            submitBtn.disabled = true;

            fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: json
            })
                .then(async (response) => {
                    const jsonRes = await response.json();
                    if (response.status === 200) {
                        showToast("Application Submitted Successfully! Welcome to F1fitness.", 'success');
                        ctaForm.reset();
                    } else {
                        console.error(response);
                        showToast(jsonRes.message || "Something went wrong. Please try again.", 'error');
                    }
                })
                .catch(error => {
                    console.error(error);
                    showToast("Form submission failed. Please check your internet connection.", 'error');
                })
                .finally(() => {
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                });
        });
    }

    // =========================================
    // Select Plan — Auto-fill Message
    // =========================================
    const messageField = document.querySelector('textarea[name="message"]');

    document.querySelectorAll('.select-plan-btn').forEach(button => {
        button.addEventListener('click', function () {
            const planName = this.getAttribute('data-plan');
            if (messageField && planName) {
                messageField.value = `I am interested in the ${planName} plan.`;
            }
        });
    });
});
