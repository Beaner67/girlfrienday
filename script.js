/**
 * GIRLFRIEND'S DAY — EDITORIAL SCRAPBOOK INTERACTIVITY & ANIMATIONS
 */

document.addEventListener('DOMContentLoaded', () => {

    /* --------------------------------------------------------------------------
     * 0. Mobile Zoom Prevention (Pinch & Double-tap Zoom Prevention)
     * -------------------------------------------------------------------------- */
    // Prevent Pinch-to-zoom on iOS Safari
    document.addEventListener('gesturestart', function (e) {
        e.preventDefault();
    });
    document.addEventListener('gesturechange', function (e) {
        e.preventDefault();
    });
    document.addEventListener('gestureend', function (e) {
        e.preventDefault();
    });

    // Prevent Double-Tap Zoom
    let lastTouchEnd = 0;
    document.addEventListener('touchend', function (e) {
        const now = (new Date()).getTime();
        if (now - lastTouchEnd <= 300) {
            e.preventDefault();
        }
        lastTouchEnd = now;
    }, false);


    /* --------------------------------------------------------------------------
     * 0.5 Background Music Automatic Playback & Control (Deployment Ready)
     * -------------------------------------------------------------------------- */
    const bgAudio = document.getElementById('bg-audio');
    const musicBtn = document.getElementById('music-toggle-btn');
    const musicBanner = document.getElementById('music-prompt-banner');

    function startMusic() {
        if (!bgAudio) return;
        bgAudio.volume = 0.45;
        const playPromise = bgAudio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                if (musicBtn) musicBtn.classList.add('is-playing');
                if (musicBanner) musicBanner.classList.remove('is-visible');
                console.log("Background music playing automatically");
            }).catch(err => {
                console.log("Autoplay waiting for initial interaction:", err);
                if (musicBanner) musicBanner.classList.add('is-visible');
            });
        }
    }

    // Attempt immediate autoplay on DOM load & window load
    startMusic();
    window.addEventListener('load', startMusic);

    // Trigger playback on any global user interaction (bypasses browser autoplay blocks)
    const interactionEvents = ['click', 'touchstart', 'touchend', 'pointerdown', 'scroll', 'wheel', 'keydown'];
    const handleUserInteraction = () => {
        if (bgAudio && bgAudio.paused) {
            startMusic();
        }
        if (memoryVideo && memoryVideo.paused) {
            memoryVideo.play().catch(() => {});
        }
        interactionEvents.forEach(evt => window.removeEventListener(evt, handleUserInteraction));
    };

    interactionEvents.forEach(evt => {
        window.addEventListener(evt, handleUserInteraction, { passive: true });
    });

    // Toggle button click handler
    if (musicBtn && bgAudio) {
        musicBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (bgAudio.paused) {
                bgAudio.play();
                musicBtn.classList.add('is-playing');
                if (musicBanner) musicBanner.classList.remove('is-visible');
            } else {
                bgAudio.pause();
                musicBtn.classList.remove('is-playing');
            }
        });
    }


    /* --------------------------------------------------------------------------
     * 1. Photo & Video Data Archive for Lightbox Gallery
     * -------------------------------------------------------------------------- */
    const photoData = [
        {
            type: 'image',
            src: 'https://images.weserv.nl/?url=https://drive.google.com/uc?id=1dCL9dYwsMKeTpoWfHYyVmn6YsDiH3Paw',
            title: 'you and me ❤️',
            meta: 'MEMORIES // 06.02'
        },
        {
            type: 'image',
            src: 'https://images.weserv.nl/?url=https://drive.google.com/uc?id=1VnXAm9sU1ESnJb8n7nwPDCwbZ12hnENf',
            title: 'type shit 😜',
            meta: 'MEMORIES // 06.02'
        },
        {
            type: 'image',
            src: 'https://images.weserv.nl/?url=https://drive.google.com/uc?id=19CfcVACRZT5ODuqG1oNypcllnaXnF6FQ',
            title: 'Silly Mustache',
            meta: 'MEMORIES // 06.02'
        },
        {
            type: 'image',
            src: 'https://images.weserv.nl/?url=https://drive.google.com/uc?id=1giL513bJPRhocKeOMw8y6PN__5eH7Sjl',
            title: 'my fav',
            meta: 'MEMORIES // 06.02'
        },
        {
            type: 'image',
            src: 'https://images.weserv.nl/?url=https://drive.google.com/uc?id=1mlvdP1gtM-s_M4DefQdgcIUxficLTzJ9',
            title: 'Cat Meme Match 🐾',
            meta: '06.02 • PERFECT PAIR'
        },
        {
            type: 'image',
            src: 'https://images.weserv.nl/?url=https://drive.google.com/uc?id=1pZDpIYrbpNsrInP4SnEasJj2e5rLMdTp',
            title: 'matching energy ✨',
            meta: 'MEMORIES // 06.02'
        },
        {
            type: 'image',
            src: 'https://images.weserv.nl/?url=https://drive.google.com/uc?id=18n9HGSj3YER81lgJaDSxv0S6MIFYRCWi',
            title: 'double trouble 😜',
            meta: 'MEMORIES // 06.02'
        },
        {
            type: 'image',
            src: 'https://images.weserv.nl/?url=https://drive.google.com/uc?id=1eZwLS8MJGyqA1L0Iv__M9ESbU9O8m4Rg',
            title: 'sweetest chaos 💙',
            meta: 'MEMORIES // 06.02'
        },
        {
            type: 'video',
            src: './assets/memory_video.mp4',
            gdrivePreview: 'https://drive.google.com/file/d/1EAcl5ZkRNsD34yPN0h4g99OwaNoOdAQA/preview',
            title: 'i love you always',
            meta: 'LIVING MEMORY // 06.02'
        }
    ];

    let currentPhotoIndex = 0;


    /* --------------------------------------------------------------------------
     * 2. Automatic Video Playback Assurance for Frame Display
     * -------------------------------------------------------------------------- */
    const memoryVideo = document.getElementById('memory-video');
    const gdriveIframe = document.getElementById('gdrive-iframe');

    if (memoryVideo) {
        memoryVideo.muted = true;
        memoryVideo.defaultMuted = true;
        memoryVideo.playsInline = true;

        const attemptAutoplay = () => {
            const playPromise = memoryVideo.play();
            if (playPromise !== undefined) {
                playPromise.then(() => {
                    console.log("Living Video Portrait playing automatically in frame");
                }).catch(err => {
                    console.log("Autoplay retry fallback:", err);
                    memoryVideo.muted = true;
                    memoryVideo.play().catch(() => {
                        if (gdriveIframe) {
                            memoryVideo.style.display = 'none';
                            gdriveIframe.style.display = 'block';
                        }
                    });
                });
            }
        };

        attemptAutoplay();

        // Also trigger playback on user scroll / interaction if blocked by browser policy
        window.addEventListener('touchstart', attemptAutoplay, { once: true });
        window.addEventListener('click', attemptAutoplay, { once: true });
    }


    /* --------------------------------------------------------------------------
     * 3. Intersection Observer for Scroll Fade-In & Reveal Effects
     * -------------------------------------------------------------------------- */
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -80px 0px',
        threshold: 0.15
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 60);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    revealElements.forEach(el => revealObserver.observe(el));


    /* --------------------------------------------------------------------------
     * 4. Smooth Parallax Scrolling Effect
     * -------------------------------------------------------------------------- */
    const parallaxElements = document.querySelectorAll('[data-parallax-speed]');
    let isScrolling = false;

    function handleParallax() {
        if (window.innerWidth < 768) {
            parallaxElements.forEach(el => {
                el.style.transform = '';
            });
            isScrolling = false;
            return;
        }

        const scrollY = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = parseFloat(el.getAttribute('data-parallax-speed')) || 0;
            const parentSection = el.closest('.scrapbook-section');
            
            if (parentSection) {
                const rect = parentSection.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    const relativeScroll = scrollY - (parentSection.offsetTop - window.innerHeight / 2);
                    const translateY = relativeScroll * speed * -0.5;
                    
                    if (el.classList.contains('script-physical')) {
                        el.style.transform = `translateY(${translateY}px) rotate(-7deg)`;
                    } else if (el.classList.contains('script-fly')) {
                        el.style.transform = `translateY(${translateY}px) rotate(12deg)`;
                    } else if (el.classList.contains('script-sky')) {
                        el.style.transform = `translateY(${translateY}px) rotate(-8deg)`;
                    } else if (el.classList.contains('video-container')) {
                        el.style.transform = `translateY(${translateY * 0.8}px) rotate(4deg)`;
                    } else {
                        el.style.transform = `translateY(${translateY}px)`;
                    }
                }
            }
        });

        isScrolling = false;
    }

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(handleParallax);
            isScrolling = true;
        }
    }, { passive: true });

    handleParallax();


    /* --------------------------------------------------------------------------
     * 5. Mouse Tilt Effect for Central Image Frame
     * -------------------------------------------------------------------------- */
    const imageFrameContainer = document.querySelector('.image-frame-container');
    const imageFrame = document.querySelector('.image-frame');

    if (imageFrameContainer && imageFrame && window.innerWidth >= 768) {
        imageFrameContainer.addEventListener('mousemove', (e) => {
            const rect = imageFrameContainer.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            const tiltX = (y / rect.height) * -8;
            const tiltY = (x / rect.width) * 8;

            imageFrame.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale(1.02)`;
        });

        imageFrameContainer.addEventListener('mouseleave', () => {
            imageFrame.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1.0)';
        });
    }


    /* --------------------------------------------------------------------------
     * 6. Interactive Lightbox Modal Viewer (Image & Video Support)
     * -------------------------------------------------------------------------- */
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxOverlay = document.querySelector('.lightbox-overlay');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxIframe = document.getElementById('lightbox-iframe');
    const lightboxScript = document.getElementById('lightbox-script');
    const lightboxMeta = document.getElementById('lightbox-meta');
    const lightboxClose = document.getElementById('lightbox-close');
    const lightboxPrev = document.getElementById('lightbox-prev');
    const lightboxNext = document.getElementById('lightbox-next');

    function openLightbox(index) {
        currentPhotoIndex = index;
        const data = photoData[currentPhotoIndex];
        
        if (data.type === 'video') {
            lightboxImg.style.display = 'none';
            if (lightboxIframe) lightboxIframe.style.display = 'none';

            lightboxVideo.style.display = 'block';
            lightboxVideo.src = data.src;
            lightboxVideo.onerror = function() {
                if (data.gdrivePreview && lightboxIframe) {
                    lightboxVideo.style.display = 'none';
                    lightboxIframe.style.display = 'block';
                    lightboxIframe.src = data.gdrivePreview;
                }
            };
            lightboxVideo.muted = false;
            lightboxVideo.play().catch(e => {
                if (data.gdrivePreview && lightboxIframe) {
                    lightboxVideo.style.display = 'none';
                    lightboxIframe.style.display = 'block';
                    lightboxIframe.src = data.gdrivePreview;
                }
            });
        } else {
            if (lightboxVideo) {
                lightboxVideo.pause();
                lightboxVideo.style.display = 'none';
            }
            if (lightboxIframe) {
                lightboxIframe.src = '';
                lightboxIframe.style.display = 'none';
            }
            lightboxImg.style.display = 'block';
            lightboxImg.src = data.src;
        }

        lightboxScript.textContent = data.title;
        lightboxMeta.textContent = data.meta;

        lightboxModal.classList.add('is-open');
        document.body.style.overflow = 'hidden';
    }

    function closeLightbox() {
        if (lightboxVideo) {
            lightboxVideo.pause();
        }
        if (lightboxIframe) {
            lightboxIframe.src = '';
        }
        lightboxModal.classList.remove('is-open');
        document.body.style.overflow = '';
    }

    function nextPhoto() {
        currentPhotoIndex = (currentPhotoIndex + 1) % photoData.length;
        openLightbox(currentPhotoIndex);
    }

    function prevPhoto() {
        currentPhotoIndex = (currentPhotoIndex - 1 + photoData.length) % photoData.length;
        openLightbox(currentPhotoIndex);
    }

    // Attach Event Triggers for Images & Photostrip
    document.querySelectorAll('.gallery-trigger').forEach(el => {
        el.addEventListener('click', () => {
            const index = parseInt(el.getAttribute('data-photo-index'), 10) || 0;
            openLightbox(index);
        });
    });

    // Attach Event Trigger for Video Polaroid Card
    const videoPolaroidCard = document.getElementById('video-polaroid-card');
    if (videoPolaroidCard) {
        videoPolaroidCard.addEventListener('click', (e) => {
            if (e.target.closest('.upload-video-btn')) return; // ignore file upload click
            openLightbox(8); // Open video item
        });
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);
    if (lightboxNext) lightboxNext.addEventListener('click', nextPhoto);
    if (lightboxPrev) lightboxPrev.addEventListener('click', prevPhoto);

    // Keyboard Shortcuts
    document.addEventListener('keydown', (e) => {
        if (!lightboxModal.classList.contains('is-open')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowRight') nextPhoto();
        if (e.key === 'ArrowLeft') prevPhoto();
    });

    console.log("Girlfriend's Day Editorial Scrapbook — Background Audio deployment ready.");
});
