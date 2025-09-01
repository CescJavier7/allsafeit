document.addEventListener('DOMContentLoaded', function() {
    
    // Lógica para el Menú Móvil Funcional
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                }
            });
        });
    }

    // ==========================================================================
    // OPTIMIZACIÓN MÁXIMA PARA MÓVILES
    // ==========================================================================
    
    // Comprobamos si la pantalla es de escritorio (mayor a 768px)
    const isDesktop = window.matchMedia("(min-width: 769px)").matches;

    // Solo ejecutamos las animaciones y efectos visuales costosos en escritorio
    if (isDesktop) {
        // --- HERO INTERACTIVO (SPOTLIGHT) ---
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.addEventListener('mousemove', e => {
                const rect = hero.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                document.documentElement.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
                document.documentElement.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
            });
        }

        // --- EFECTO 3D (TILT) EN TARJETAS ---
        const tiltCards = document.querySelectorAll('.card, .tech-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const { width, height } = rect;
                
                const rotateX = (y / height - 0.5) * -14;
                const rotateY = (x / width - 0.5) * 14;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    
        // --- EFECTO DE CURSOR PERSONALIZADO ---
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursorFollower) {
            window.addEventListener('mousemove', e => {
                cursorFollower.style.transform = `translate3d(${e.clientX - 15}px, ${e.clientY - 15}px, 0)`;
            });
            document.querySelectorAll('a, .btn, .card, .tech-card, .menu-toggle').forEach(el => {
                el.addEventListener('mouseenter', () => cursorFollower.classList.add('active'));
                el.addEventListener('mouseleave', () => cursorFollower.classList.remove('active'));
            });
        }

        // --- ANIMACIONES DE SCROLL (SOLO PARA ESCRITORIO) ---
        const hiddenElements = document.querySelectorAll('.hidden');
        if (hiddenElements.length > 0) {
            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { 
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });
            hiddenElements.forEach((el) => observer.observe(el));
        }

    } else {
        // --- ACCIÓN PARA MÓVILES: ELIMINAR TODAS LAS ANIMACIONES ---
        // Hacemos que todos los elementos con la clase '.hidden' sean visibles inmediatamente.
        // Esto mejora el rendimiento y evita cualquier conflicto de layout por las animaciones.
        const hiddenElements = document.querySelectorAll('.hidden');
        hiddenElements.forEach(el => {
            el.classList.remove('hidden');
        });

        // Ocultamos el seguidor de cursor personalizado en móviles
        const cursorFollower = document.querySelector('.cursor-follower');
        if (cursorFollower) {
            cursorFollower.style.display = 'none';
        }
    }

    // --- EFECTO DE ESCRITURA (se ejecuta en todos los dispositivos) ---
    const typingText = document.querySelector('.typing-text');
    if (typingText) {
        const words = ["Soluciones.", "Innovación.", "Confianza."];
        let wordIndex = 0, charIndex = 0, isDeleting = false;
        
        function type() {
            if (!typingText) return;
            const currentWord = words[wordIndex];
            const displayText = isDeleting 
                ? currentWord.substring(0, charIndex - 1) 
                : currentWord.substring(0, charIndex + 1);
            
            typingText.textContent = displayText;
            let typeSpeed = isDeleting ? 90 : 180;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 400;
            }
            
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- NAVEGACIÓN ACTIVA AL HACER SCROLL (se ejecuta en todos los dispositivos) ---
    const sections = document.querySelectorAll('section[id]');
    if (sections.length > 0) {
        const navLinksObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    document.querySelectorAll('.nav-links a').forEach(a => {
                        a.classList.remove('active');
                        if (a.getAttribute('href') === `#${id}`) {
                            a.classList.add('active');
                        }
                    });
                }
            });
        }, { 
            rootMargin: '-50% 0px -50% 0px'
        });
        sections.forEach(section => navLinksObserver.observe(section));
    }
});
