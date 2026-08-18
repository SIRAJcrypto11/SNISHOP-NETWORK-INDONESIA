/* ================================================
   SNISHOP WORKSPACE - Main JavaScript
   ================================================ */

document.addEventListener('DOMContentLoaded', function () {

    // === Header Scroll Effect (Optimized for 60FPS) ===
    const header = document.querySelector('.header');
    let isScrolling = false;

    function handleScroll() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        isScrolling = false;
    }

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(handleScroll);
            isScrolling = true;
        }
    }, { passive: true });

    // === Mobile Menu Toggle & Dynamic Mobile CTAs ===
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.nav');

    if (nav && !nav.querySelector('.mobile-nav-actions')) {
        const mobileActions = document.createElement('div');
        mobileActions.className = 'mobile-nav-actions';
        mobileActions.innerHTML = `
            <a href="https://erp.snishop.com/" class="btn btn-primary" target="_blank" style="background: linear-gradient(135deg, #1e3a8a, #2563eb);">🚀 Mulai AI-ERP (B2B)</a>
            <a href="https://wa.me/6285185151356?text=Halo%20SNISHOP.ID" class="btn btn-secondary" target="_blank">💬 Hubungi Sales (B2B)</a>
        `;
        nav.appendChild(mobileActions);
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });

        // Close menu when clicking a link or CTA button inside nav
        nav.querySelectorAll('.nav-link, .mobile-nav-actions a').forEach(link => {
            link.addEventListener('click', function () {
                nav.classList.remove('active');
                menuToggle.classList.remove('active');
            });
        });
    }

    // === Enhanced Scroll Reveal Animations ===
    const revealOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -100px 0px'
    };

    const revealObserver = new IntersectionObserver(function (entries) {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add delay for stagger effect
                setTimeout(() => {
                    entry.target.classList.add('active');
                    entry.target.classList.add('visible');
                }, index * 100); // 100ms delay between each element

                // Unobserve after animation
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // === CRITICAL FIX: Immediate Visibility Check ===
    // This runs SYNCHRONOUSLY to prevent blank page
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale, .fade-in, .stagger > *');

    // IMMEDIATELY show elements already in viewport BEFORE setting up observer
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

        if (isInViewport) {
            // Instantly visible with no delay or animation
            el.style.opacity = '1';
            el.style.transform = 'none';
            el.classList.add('active');
        } else {
            // Elements below viewport will animate when scrolled into view
            revealObserver.observe(el);
        }
    });

    // === Smooth Scroll for Anchor Links ===
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight - 20;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // === Scroll to Top Button ===
    const scrollToTopBtn = document.getElementById('scrollToTop');

    if (scrollToTopBtn) {
        // Show/hide button based on scroll position - 60FPS Optimized
        let isBtnScrolling = false;

        function handleBtnScroll() {
            if (window.scrollY > 300) {
                scrollToTopBtn.classList.add('visible');
            } else {
                scrollToTopBtn.classList.remove('visible');
            }
            isBtnScrolling = false;
        }

        window.addEventListener('scroll', () => {
            if (!isBtnScrolling) {
                window.requestAnimationFrame(handleBtnScroll);
                isBtnScrolling = true;
            }
        }, { passive: true });

        // Scroll to top on click
        scrollToTopBtn.addEventListener('click', function () {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // === Animated Number Counters ===
    const statNumbers = document.querySelectorAll('.stat-number');
    let countersAnimated = false;

    const animateCounter = (element) => {
        const target = parseFloat(element.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        const isDecimal = target % 1 !== 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = isDecimal ? target.toFixed(1) : target.toLocaleString();
            }
        };

        updateCounter();
    };

    // Observe stats section for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !countersAnimated) {
                countersAnimated = true;
                statNumbers.forEach((stat, index) => {
                    setTimeout(() => animateCounter(stat), index * 100);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // === Pricing Toggle ===
    const pricingToggle = document.querySelector('.pricing-toggle input');
    const monthlyPrices = document.querySelectorAll('.price-monthly');
    const annualPrices = document.querySelectorAll('.price-annual');

    if (pricingToggle) {
        pricingToggle.addEventListener('change', function () {
            if (this.checked) {
                monthlyPrices.forEach(el => el.style.display = 'none');
                annualPrices.forEach(el => el.style.display = 'block');
            } else {
                monthlyPrices.forEach(el => el.style.display = 'block');
                annualPrices.forEach(el => el.style.display = 'none');
            }
        });
    }

    // === FAQ Accordion ===
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        if (question && answer) {
            question.addEventListener('click', function () {
                const isActive = item.classList.contains('active');

                // Close all other FAQ items
                faqItems.forEach(otherItem => {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = null;
                    }
                });

                // Toggle current item
                if (!isActive) {
                    item.classList.add('active');
                    answer.style.maxHeight = answer.scrollHeight + 'px';
                }
            });
        }
    });

    // === Service Category Filter ===
    const categoryBtns = document.querySelectorAll('.category-btn');
    const serviceCards = document.querySelectorAll('.service-card');

    categoryBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const category = this.dataset.category;

            // Update active button
            categoryBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter cards
            serviceCards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.style.display = 'block';
                    setTimeout(() => card.classList.add('visible'), 50);
                } else {
                    card.classList.remove('visible');
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // === Ecosystem Apps Filter ===
    const filterBtns = document.querySelectorAll('.filter-btn');
    const appCards = document.querySelectorAll('.app-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const filter = this.dataset.filter;

            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Filter app cards
            appCards.forEach(card => {
                const categories = card.dataset.category ? card.dataset.category.split(' ') : [];

                if (filter === 'all' || categories.includes(filter)) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // === Counter Animation ===
    const counters = document.querySelectorAll('.counter');

    const counterObserver = new IntersectionObserver(function (entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                const target = parseInt(counter.dataset.target);
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;

                const updateCounter = () => {
                    current += step;
                    if (current < target) {
                        counter.textContent = Math.floor(current).toLocaleString();
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                };

                updateCounter();
                counterObserver.unobserve(counter);
            }
        });
    }, { threshold: 0.5 });

    counters.forEach(counter => {
        counterObserver.observe(counter);
    });

    // === Marquee Animation (Pause on Hover) ===
    const marqueeTrack = document.querySelector('.marquee-track');

    if (marqueeTrack) {
        marqueeTrack.addEventListener('mouseenter', function () {
            this.style.animationPlayState = 'paused';
        });

        marqueeTrack.addEventListener('mouseleave', function () {
            this.style.animationPlayState = 'running';
        });
    }

    // === Tab Navigation ===
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const targetId = this.dataset.tab;

            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            // Show target pane
            tabPanes.forEach(pane => {
                if (pane.id === targetId) {
                    pane.classList.add('active');
                } else {
                    pane.classList.remove('active');
                }
            });
        });
    });

    // === Form Validation ===
    const forms = document.querySelectorAll('form[data-validate]');

    forms.forEach(form => {
        form.addEventListener('submit', function (e) {
            let isValid = true;
            const inputs = form.querySelectorAll('input[required], textarea[required]');

            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.classList.add('error');
                } else {
                    input.classList.remove('error');
                }
            });

            if (!isValid) {
                e.preventDefault();
            }
        });
    });

    // === Copy to Clipboard (for contact info) ===
    const copyBtns = document.querySelectorAll('.copy-btn');

    copyBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const text = this.dataset.copy;
            navigator.clipboard.writeText(text).then(() => {
                const originalText = this.textContent;
                this.textContent = 'Tersalin!';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 2000);
            });
        });
    });

    // === WhatsApp Chat Initialization ===
    const waNumber = '6285185151356';
    const waMessage = 'Halo SNISHOP.ID, saya ingin bertanya tentang layanan yang tersedia.';

    document.querySelectorAll('.whatsapp-float, .btn-whatsapp').forEach(btn => {
        if (!btn.href) {
            btn.href = `https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`;
            btn.target = '_blank';
        }
    });

    // === Feature Carousel Navigation ===
    const carousel = document.getElementById('featureCarousel');
    const carouselDots = document.querySelectorAll('.carousel-dot');

    // === Feature Carousel Navigation (Buttons & Dots) ===
    if (carousel) {
        const cards = carousel.querySelectorAll('.feature-card');
        const cardWidth = 340 + 24; // card width + gap

        // Navigation Buttons
        const prevBtn = document.querySelector('.feature-nav-btn.prev');
        const nextBtn = document.querySelector('.feature-nav-btn.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                carousel.scrollBy({
                    left: -cardWidth,
                    behavior: 'smooth'
                });
            });
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                carousel.scrollBy({
                    left: cardWidth,
                    behavior: 'smooth'
                });
            });
        }

        // Click on dots (if they exist)
        if (carouselDots.length > 0) {
            carouselDots.forEach(dot => {
                dot.addEventListener('click', function () {
                    const index = parseInt(this.dataset.index);
                    carousel.scrollTo({
                        left: index * cardWidth,
                        behavior: 'smooth'
                    });
                });
            });

            // Update active dot on scroll
            carousel.addEventListener('scroll', function () {
                const scrollPosition = this.scrollLeft;
                const activeIndex = Math.round(scrollPosition / cardWidth);

                carouselDots.forEach((dot, index) => {
                    if (index === activeIndex) {
                        dot.classList.add('active');
                    } else {
                        dot.classList.remove('active');
                    }
                });
            }, { passive: true });
        }
    }

    // === Auto-Play Slideshow ===
    let autoPlayInterval;
    const autoPlayDelay = 5000; // 5 seconds

    const startAutoPlay = () => {
        if (!carousel) return;

        autoPlayInterval = setInterval(() => {
            const cardWidth = 340 + 24;
            carousel.scrollBy({
                left: cardWidth,
                behavior: 'smooth'
            });

            // Check if at end, scroll back to start
            if (carousel.scrollLeft >= carousel.scrollWidth - carousel.clientWidth - 50) {
                setTimeout(() => {
                    carousel.scrollTo({
                        left: 0,
                        behavior: 'smooth'
                    });
                }, 500);
            }
        }, autoPlayDelay);
    };

    const stopAutoPlay = () => {
        if (autoPlayInterval) {
            clearInterval(autoPlayInterval);
        }
    };

    // Start auto-play and pause on hover
    if (carousel) {
        startAutoPlay();

        const carouselWrapper = carousel.closest('.feature-showcase-wrapper');
        if (carouselWrapper) {
            carouselWrapper.addEventListener('mouseenter', stopAutoPlay);
            carouselWrapper.addEventListener('mouseleave', startAutoPlay);
        }
    }

    // === DRAGGABLE CLIENT LOGO SLIDER ===
    const clientSlider = document.querySelector('.client-slider-wrapper');
    const clientTrack = document.querySelector('.client-slider-track');

    if (clientSlider && clientTrack) {
        let isDown = false;
        let startX;
        let scrollLeft;
        let animationPaused = false;
        let resumeTimeout;

        // Pause animation on hover/touch
        const pauseAnimation = () => {
            if (!animationPaused) {
                clientTrack.style.animationPlayState = 'paused';
                animationPaused = true;
            }
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(resumeAnimation, 3000);
        };

        const resumeAnimation = () => {
            clientTrack.style.animationPlayState = 'running';
            animationPaused = false;
        };

        // Mouse events
        clientSlider.addEventListener('mouseenter', pauseAnimation);
        clientSlider.addEventListener('mouseleave', () => {
            if (!isDown) {
                clearTimeout(resumeTimeout);
                resumeTimeout = setTimeout(resumeAnimation, 1000);
            }
        });

        clientSlider.addEventListener('mousedown', (e) => {
            isDown = true;
            clientSlider.classList.add('dragging');
            startX = e.pageX - clientSlider.offsetLeft;
            scrollLeft = clientSlider.scrollLeft;
            pauseAnimation();
        });

        clientSlider.addEventListener('mouseleave', () => {
            isDown = false;
            clientSlider.classList.remove('dragging');
        });

        clientSlider.addEventListener('mouseup', () => {
            isDown = false;
            clientSlider.classList.remove('dragging');
        });

        clientSlider.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - clientSlider.offsetLeft;
            const walk = (x - startX) * 2;
            clientSlider.scrollLeft = scrollLeft - walk;
        });

        // Touch events
        clientSlider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].pageX - clientSlider.offsetLeft;
            scrollLeft = clientSlider.scrollLeft;
            pauseAnimation();
        }, { passive: true });

        clientSlider.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - clientSlider.offsetLeft;
            const walk = (x - startX) * 2;
            clientSlider.scrollLeft = scrollLeft - walk;
        }, { passive: true });

        clientSlider.addEventListener('touchend', () => {
            clearTimeout(resumeTimeout);
            resumeTimeout = setTimeout(resumeAnimation, 2000);
        });
    }

    // === EXACT HEIGHT MATCHER & ZERO-SLIP ARCHITECTURE FOR PERFECT CARD STACKING ===
    const stackingCards = document.querySelectorAll('.stacking-card');
    if (stackingCards.length > 0) {
        const equalizeHeights = () => {
            // Only equalize on desktop (>= 1024px); on mobile, let each card breathe naturally with compact height
            if (window.innerWidth >= 1024) {
                stackingCards.forEach(card => card.style.minHeight = 'auto');
                let maxHeight = 0;
                stackingCards.forEach(card => {
                    if (card.offsetHeight > maxHeight) maxHeight = card.offsetHeight;
                });
                stackingCards.forEach(card => {
                    card.style.minHeight = maxHeight + 'px';
                });
            } else {
                stackingCards.forEach(card => card.style.minHeight = 'auto');
            }
        };

        // Initialize and bind with ResizeObserver & Orientation
        equalizeHeights();
        window.addEventListener('resize', equalizeHeights, { passive: true });
        window.addEventListener('orientationchange', equalizeHeights, { passive: true });

        // Failsafe for late-loading fonts/images
        setTimeout(equalizeHeights, 300);
        setTimeout(equalizeHeights, 1000);
        setTimeout(equalizeHeights, 2500);

        // Optional: Desktop Subtle Stacking Scale Effect on Scroll
        if (window.innerWidth >= 1024) {
            window.addEventListener('scroll', () => {
                const scrollY = window.scrollY;
                stackingCards.forEach((card, index) => {
                    const rect = card.getBoundingClientRect();
                    if (rect.top <= (76 + (index * 16))) {
                        // Card is sticky-docked
                        card.style.borderColor = 'rgba(0, 0, 0, 0.12)';
                    } else {
                        card.style.borderColor = 'var(--border-subtle)';
                    }
                });
            }, { passive: true });
        }
    }

    // === ENHANCED SECTION REVEAL ANIMATIONS ===
    const sectionRevealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');

                // Stagger child animations
                const children = entry.target.querySelectorAll('.reveal-item');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('revealed');
                });
            }
        });
    }, { threshold: 0.01, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.section-reveal').forEach(section => {
        sectionRevealObserver.observe(section);
    });

    // === PARALLAX SCROLL EFFECT ===
    const parallaxElements = document.querySelectorAll('.parallax-bg');

    const handleParallax = () => {
        parallaxElements.forEach(el => {
            const speed = el.dataset.speed || 0.5;
            const rect = el.getBoundingClientRect();
            const scrolled = window.scrollY;
            const yPos = -(scrolled * parseFloat(speed) * 0.1);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    };

    if (parallaxElements.length > 0) {
        window.addEventListener('scroll', handleParallax, { passive: true });
    }

    // === SMOOTH SCROLL PROGRESS INDICATOR ===
    const progressBar = document.querySelector('.scroll-progress');

    if (progressBar) {
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;
            progressBar.style.width = `${progress}%`;
        }, { passive: true });
    }

    // === MAGNETIC BUTTON EFFECT ===
    const magneticBtns = document.querySelectorAll('.btn-magnetic');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });

    // === COUNTER WITH EASING ===
    const animateValue = (element, start, end, duration) => {
        const range = end - start;
        let startTime = null;

        const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            // Ease out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(start + (range * easeProgress));
            element.textContent = current.toLocaleString('id-ID');
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };

    // === Footer Hero Text - Cursor Following Glow ===
    const footerHero = document.getElementById('footer-hero-text');
    const glowElement = document.getElementById('footer-hero-glow');

    if (footerHero && glowElement) {
        footerHero.addEventListener('mousemove', (e) => {
            const rect = footerHero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Create radial gradient glow that follows cursor
            glowElement.style.background = `
                radial-gradient(
                    circle 250px at ${x}px ${y}px,
                    rgba(66, 133, 244, 0.5) 0%,
                    rgba(66, 133, 244, 0.25) 30%,
                    rgba(52, 168, 83, 0.15) 50%,
                    transparent 70%
                )
            `;
        });

        footerHero.addEventListener('mouseleave', () => {
            glowElement.style.background = 'none';
        });

        // Touch support for mobile
        footerHero.addEventListener('touchmove', (e) => {
            const rect = footerHero.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            glowElement.style.background = `
                radial-gradient(
                    circle 150px at ${x}px ${y}px,
                    rgba(66, 133, 244, 0.5) 0%,
                    rgba(66, 133, 244, 0.25) 35%,
                    transparent 60%
                )
            `;
            glowElement.style.opacity = '1';
        });

        footerHero.addEventListener('touchend', () => {
            glowElement.style.background = 'none';
            glowElement.style.opacity = '0';
        });
    }

    // === TRUE INFINITE LOOP SLIDESHOW (Fitur Premium) ===
    function initInfiniteCarousel() {
        const track = document.getElementById('featureCarousel');
        if (!track) return;

        const cards = Array.from(track.querySelectorAll('.feature-card'));
        if (cards.length === 0) return;

        const prevBtn = document.querySelector('.feature-nav-btn.prev');
        const nextBtn = document.querySelector('.feature-nav-btn.next');
        const wrapper = document.querySelector('.feature-showcase-wrapper');

        // Configuration
        const autoPlaySpeed = 3000;
        let currentIndex = 0; // 0 represents the first ORIGINAL card
        let isAnimating = false;
        let autoPlayInterval;

        // Clone cards for infinite illusion (Clone last 3 to start, first 3 to end)
        const clonesStart = cards.slice(-3).map(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('clone');
            return clone;
        });
        const clonesEnd = cards.slice(0, 3).map(card => {
            const clone = card.cloneNode(true);
            clone.classList.add('clone');
            return clone;
        });

        // Prepend and Append clones
        clonesStart.reverse().forEach(clone => track.prepend(clone));
        clonesEnd.forEach(clone => track.appendChild(clone));

        // The real total items and how many clones we added at the beginning
        const totalOriginal = cards.length;
        const offsetIndex = 3; // Because we prepended 3 clones

        // Get exact width of a card + gap
        function getCardWidth() {
            const cardElement = track.querySelector('.feature-card');
            const style = window.getComputedStyle(cardElement);
            const cardWidth = cardElement.offsetWidth;
            const gap = parseFloat(window.getComputedStyle(track).gap) || 0;
            return cardWidth + gap;
        }

        // Apply Transform
        function updateCarousel(instant = false) {
            const itemWidth = getCardWidth();
            // Calculate pixel movement based on index + offset of cloned items
            const translateX = -((currentIndex + offsetIndex) * itemWidth);

            if (instant) {
                track.classList.remove('animating');
            } else {
                track.classList.add('animating');
            }
            track.style.transform = `translate3d(${translateX}px, 0, 0)`;
        }

        // Move to slide
        function goToSlide(dir) {
            if (isAnimating) return;
            isAnimating = true;

            currentIndex += dir;
            updateCarousel();

            // Wait for transition to finish before checking infinite bounds
            setTimeout(() => {
                isAnimating = false;

                // If we scrolled past the last original card into the end clones
                if (currentIndex >= totalOriginal) {
                    currentIndex = 0; // Reset to first original
                    updateCarousel(true); // Instant teleport without animation
                }
                // If we scrolled backwards past the first original card into the start clones
                else if (currentIndex < 0) {
                    currentIndex = totalOriginal - 1; // Reset to last original
                    updateCarousel(true); // Instant teleport without animation
                }
            }, 500); // Must match CSS transition duration
        }

        // Event Listeners
        if (nextBtn) nextBtn.addEventListener('click', () => { goToSlide(1); resetAutoPlay(); });
        if (prevBtn) prevBtn.addEventListener('click', () => { goToSlide(-1); resetAutoPlay(); });

        // Auto-play Logic
        function startAutoPlay() {
            autoPlayInterval = setInterval(() => {
                goToSlide(1);
            }, autoPlaySpeed);
        }

        function stopAutoPlay() {
            clearInterval(autoPlayInterval);
        }

        function resetAutoPlay() {
            stopAutoPlay();
            startAutoPlay();
        }

        // Pause on hover/touch
        if (wrapper) {
            wrapper.addEventListener('mouseenter', stopAutoPlay);
            wrapper.addEventListener('mouseleave', startAutoPlay);
            wrapper.addEventListener('touchstart', stopAutoPlay, { passive: true });
            wrapper.addEventListener('touchend', startAutoPlay);
        }

        // Initial Setup
        // Small timeout to ensure CSS is rendered and gap is calculable
        setTimeout(() => {
            updateCarousel(true);
            startAutoPlay();
        }, 100);

        // Handle Window Resize to recalculate widths
        window.addEventListener('resize', () => {
            updateCarousel(true);
        }, { passive: true });
    }

    initInfiniteCarousel();

    // === Testimonial Slider ===
    const testimonialTrack = document.getElementById('testimonialTrack');
    const prevTestiBtn = document.querySelector('.testimonial-section .prev-btn');
    const nextTestiBtn = document.querySelector('.testimonial-section .next-btn');

    if (testimonialTrack && prevTestiBtn && nextTestiBtn) {
        let isScrollingTesti = false; // Debounce
        
        const scrollAmount = () => {
            const card = testimonialTrack.querySelector('.testimonial-card');
            // Card width + gap (24px = var(--space-lg))
            return card ? card.offsetWidth + 24 : 0;
        };

        prevTestiBtn.addEventListener('click', () => {
            if (isScrollingTesti) return;
            isScrollingTesti = true;
            testimonialTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
            // Release lock after smooth scroll duration (~500ms)
            setTimeout(() => isScrollingTesti = false, 500);
        });

        nextTestiBtn.addEventListener('click', () => {
            if (isScrollingTesti) return;
            isScrollingTesti = true;
            testimonialTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
            setTimeout(() => isScrollingTesti = false, 500);
        });
    }

    // === SNISHOP AI-First B2B vs B2C Interactive Filter & Taxonomy ===
    const b2bB2cBtns = document.querySelectorAll('.b2b-b2c-tab-btn');
    if (b2bB2cBtns.length > 0) {
        b2bB2cBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                b2bB2cBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-filter') || 'all';

                // Filter cards across the active page
                const cardsToFilter = document.querySelectorAll('.service-card, .card, .feature-app-card, .pricing-card');
                cardsToFilter.forEach(card => {
                    const cardType = card.getAttribute('data-type') || '';
                    const cardCat = card.getAttribute('data-category') || '';
                    const cardHTML = card.innerHTML.toUpperCase();

                    let isB2B = cardType.includes('b2b') || cardCat === 'b2b-erp' || cardCat === 'it' || cardHTML.includes('B2B') || cardHTML.includes('ERP') || cardHTML.includes('MITRA') || cardHTML.includes('ENTERPRISE');
                    let isB2C = cardType.includes('b2c') || cardCat === 'edukasi' || cardCat === 'aplikasi' || cardCat === 'game' || cardCat === 'ppob' || cardHTML.includes('B2C') || cardHTML.includes('EDUKASI') || cardHTML.includes('NETFLIX') || cardHTML.includes('GAME');

                    let shouldShow = true;
                    if (filter === 'b2b') shouldShow = isB2B;
                    if (filter === 'b2c') shouldShow = isB2C;

                    if (shouldShow) {
                        card.style.display = '';
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.96)';
                        setTimeout(() => {
                            card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                            card.style.opacity = '1';
                            card.style.transform = 'scale(1)';
                        }, 30);
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }

    // === Category Nav Filter (layanan.html) ===
    {
        const categoryBtns = document.querySelectorAll('.category-btn');
        const serviceCards = document.querySelectorAll('.service-card');
        if (categoryBtns.length > 0 && serviceCards.length > 0) {
            categoryBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    categoryBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    const cat = btn.getAttribute('data-category') || 'all';

                    serviceCards.forEach(card => {
                        const cardCat = card.getAttribute('data-category');
                        if (cat === 'all' || cardCat === cat) {
                            card.style.display = '';
                            card.style.opacity = '0';
                            card.style.transform = 'translateY(8px)';
                            setTimeout(() => {
                                card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                                card.style.opacity = '1';
                                card.style.transform = 'translateY(0)';
                            }, 30);
                        } else {
                            card.style.display = 'none';
                        }
                    });
                });
            });
        }

        // Live instant search
        const searchInput = document.getElementById('serviceSearchInput');
        if (searchInput && serviceCards.length > 0) {
            searchInput.addEventListener('input', (e) => {
                const query = e.target.value.toLowerCase().trim();
                serviceCards.forEach(card => {
                    const text = card.textContent.toLowerCase();
                    if (query === '' || text.includes(query)) {
                        card.style.display = '';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        }
    }

    // === Silicon Valley Spotlight Mouse Tracker (60 FPS) ===
    const spotlightCards = document.querySelectorAll('.spotlight-card, .bento-cell, .rootly-stage-window');

    if (spotlightCards.length > 0) {
        document.addEventListener('mousemove', (e) => {
            window.requestAnimationFrame(() => {
                spotlightCards.forEach(card => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    card.style.setProperty('--mouse-x', `${x}px`);
                    card.style.setProperty('--mouse-y', `${y}px`);
                });
            });
        }, { passive: true });
    }

    // === Interactive AI Terminal Simulator (Supabase + Rootly) ===
    const terminalStream = document.getElementById('terminalStream');
    const chipBtns = document.querySelectorAll('.terminal-quick-chips .chip-btn');
    const termTabs = document.querySelectorAll('.terminal-tabs-row .term-tab');
    const termInput = document.getElementById('termInputText');

    const sampleFlows = {
        stok: {
            cmd: "Tambahkan produk A, stok 300, modal 3000, jual 10000, supplier PT Maju Jaya ke Gudang B",
            steps: [
                { badge: "0.1s", title: "Supplier Resolution", desc: "Found ID: SUP-0921 (PT Maju Jaya) verified." },
                { badge: "0.3s", title: "Warehouse Target", desc: "Linked to Warehouse_B_02 (Kapasitas Tersedia: 82%)." },
                { badge: "0.5s", title: "Catalog & Stock", desc: "SKU 'PROD-A' Created. Stock increment +300 unit recorded." },
                { badge: "0.8s", title: "Accounting Entry", desc: "Jurnal Pembelian Rp900.000 tercatat. Estimasi margin laba: 70% (Rp7.000/unit)." }
            ]
        },
        qris: {
            cmd: "Aktivasi QRIS Dinamis Usahakan.Digital untuk Merchant Kedai Kopi Nusantara",
            steps: [
                { badge: "0.2s", title: "Merchant KYC", desc: "Merchant 'Kedai Kopi Nusantara' lolos verifikasi SNI-SHIELD." },
                { badge: "0.4s", title: "Tripay Gateway Link", desc: "NMID & QRIS Dinamis PCI-DSS Level 1 generated." },
                { badge: "0.7s", title: "POS Kasir Sync", desc: "Dashboard kasir kasir.usahakan.digital langsung aktif 24/7." }
            ]
        },
        gks: {
            cmd: "RupiahIN AI: Analisis arus kas bulan ini dan rekomendasi penghematan modal",
            steps: [
                { badge: "0.1s", title: "Local GKS Retrieval", desc: "Querying 127 sub-topik regulasi & basis data transaksi lokal." },
                { badge: "0.4s", title: "CoT Chain Analysis", desc: "HPP rasio 42% (Optimal). Biaya operasional non-esensial terdeteksi +14%." },
                { badge: "0.6s", title: "Synthesized Advice", desc: "Rekomendasi: Alihkan 10% cashflow cadangan ke inventaris fast-moving." }
            ]
        }
    };

    function renderTerminalFlow(flowKey) {
        const flow = sampleFlows[flowKey] || sampleFlows.stok;
        if (termInput) termInput.textContent = flow.cmd;
        if (terminalStream) {
            terminalStream.innerHTML = '';
            flow.steps.forEach((step, idx) => {
                const stepEl = document.createElement('div');
                stepEl.className = 'term-step-line';
                stepEl.style.opacity = '0';
                stepEl.style.transform = 'translateY(6px)';
                stepEl.innerHTML = `
                    <span class="term-step-badge">${step.badge}</span>
                    <div>
                        <div style="font-weight: 700; color: #38bdf8; font-size: 0.85rem;">${step.title}</div>
                        <div style="color: #cbd5e1; font-size: 0.82rem;">${step.desc}</div>
                    </div>
                `;
                terminalStream.appendChild(stepEl);
                setTimeout(() => {
                    stepEl.style.transition = 'all 0.3s ease';
                    stepEl.style.opacity = '1';
                    stepEl.style.transform = 'translateY(0)';
                }, (idx + 1) * 150);
            });
        }
    }

    if (chipBtns.length > 0) {
        chipBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetFlow = btn.getAttribute('data-flow') || 'stok';
                renderTerminalFlow(targetFlow);
            });
        });
    }

    if (termTabs.length > 0) {
        termTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                termTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                const targetFlow = tab.getAttribute('data-flow') || 'stok';
                renderTerminalFlow(targetFlow);
            });
        });
    }

    // Initial render terminal
    if (terminalStream) {
        renderTerminalFlow('stok');
    }

    // === ROI & Margin Calculator Engine (Vercel Style) ===
    const trxSlider = document.getElementById('calcTrxSlider');
    const trxValDisplay = document.getElementById('calcTrxVal');
    const resHours = document.getElementById('calcResHours');
    const resSavings = document.getElementById('calcResSavings');
    const resMargin = document.getElementById('calcResMargin');

    function updateROICalculator() {
        if (!trxSlider) return;
        const trx = parseInt(trxSlider.value, 10) || 500;
        if (trxValDisplay) trxValDisplay.textContent = trx.toLocaleString('id-ID') + ' Transaksi / Bulan';
        
        // Formulasi bisnis penghematan waktu & biaya
        const hoursSaved = Math.round(trx * 0.08); // Rata-rata hemat 0.08 jam per transaksi
        const costSavings = Math.round(trx * 15000); // Estimasi efisiensi operasional Rp15.000/trx
        const profitMarginBoost = Math.min(48, Math.round(15 + (trx / 200)));

        if (resHours) resHours.textContent = hoursSaved + ' Jam / Bln';
        if (resSavings) resSavings.textContent = 'Rp ' + (costSavings / 1000000).toFixed(1) + ' Juta';
        if (resMargin) resMargin.textContent = '+' + profitMarginBoost + '% Profit';
    }

    if (trxSlider) {
        trxSlider.addEventListener('input', updateROICalculator);
        updateROICalculator();
    }

    // === Modern FAQ Accordions ===
    const faqQuestions = document.querySelectorAll('.faq-question, .faq-item-header');
    faqQuestions.forEach(q => {
        q.addEventListener('click', () => {
            const parent = q.closest('.faq-item');
            if (parent) {
                const wasActive = parent.classList.contains('active');
                document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
                if (!wasActive) {
                    parent.classList.add('active');
                }
            }
        });
    });

    // === Enterprise Portfolio Showcase Filter Engine ===
    const portfolioFilterBtns = document.querySelectorAll('.portfolio-filter-btn');
    const portfolioCards = document.querySelectorAll('.portfolio-card-large');

    if (portfolioFilterBtns.length > 0 && portfolioCards.length > 0) {
        portfolioFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                portfolioFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filter = btn.getAttribute('data-filter');

                portfolioCards.forEach(card => {
                    const cardCat = card.getAttribute('data-category');
                    if (filter === 'all' || cardCat === filter) {
                        card.style.display = 'grid';
                        setTimeout(() => {
                            card.style.opacity = '1';
                            card.style.transform = 'translateY(0)';
                        }, 50);
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'translateY(10px)';
                        setTimeout(() => {
                            card.style.display = 'none';
                        }, 250);
                    }
                });
            });
        });
    }

    // === INTERACTIVE SPOTLIGHT CARDS (Cursor-Tracking Radial Glow) ===
    const spotlightCards = document.querySelectorAll('.spotlight-card, .rootly-feature-card, .portfolio-card-large, .bento-card');
    spotlightCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // === SUBTLE SCROLL PARALLAX EFFECT ON NATURE WALLPAPER ===
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        // Parallax only on large screens
        if (window.innerWidth >= 1024) {
            const banner = document.querySelector('.rootly-nature-banner');
            if (banner) {
                const rect = banner.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const offset = (window.innerHeight - rect.top) * 0.05;
                    banner.style.backgroundPositionY = `calc(50% + ${offset}px)`;
                }
            }
        }
    }, { passive: true });

});
