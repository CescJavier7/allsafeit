document.addEventListener('DOMContentLoaded', function() {
    
    // --- HERO INTERACTIVO (SPOTLIGHT) ---
    const hero = document.querySelector('.hero');
    if (hero && window.matchMedia("(min-width: 768px)").matches) { // Solo en desktop
        hero.addEventListener('mousemove', e => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            document.documentElement.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
            document.documentElement.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
        });
    }

    // --- EFECTO 3D (TILT) EN TARJETAS ---
    if (window.matchMedia("(min-width: 768px)").matches) { // Solo en desktop
        const tiltCards = document.querySelectorAll('.card, .tech-card');
        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const { width, height } = rect;
                
                const rotateX = (y / height - 0.5) * -14;
                const rotateY = (x / width - 0.5) * 14;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.01)`; // Pequeño scale para efecto
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });
        });
    }
    
    // --- EFECTO DE CURSOR PERSONALIZADO ---
    const cursorFollower = document.querySelector('.cursor-follower');
    if (window.matchMedia("(min-width: 768px)").matches) { // Solo en desktop
        window.addEventListener('mousemove', e => {
            cursorFollower.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        });
        document.querySelectorAll('a, .btn, .card, .tech-card').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursorFollower.classList.add('active');
            });
            el.addEventListener('mouseleave', () => {
                cursorFollower.classList.remove('active');
            });
        });
    } else {
        cursorFollower.style.display = 'none'; // Ocultar en dispositivos táctiles
    }

    // --- EFECTO DE ESCRITURA ---
    const typingText = document.querySelector('.typing-text');
    if(typingText) {
        const words = ["Soluciones.", "Innovación.", "Confianza."]; // Palabras clave adaptadas
        let wordIndex = 0, charIndex = 0, isDeleting = false;
        function type() {
            if (!typingText) return; // Asegura que el elemento existe
            const currentWord = words[wordIndex];
            let displayText = isDeleting ? currentWord.substring(0, charIndex - 1) : currentWord.substring(0, charIndex + 1);
            typingText.textContent = displayText;
            let typeSpeed = isDeleting ? 90 : 180; // Ajuste de velocidad
            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000; isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false; wordIndex = (wordIndex + 1) % words.length; typeSpeed = 400;
            }
            charIndex = isDeleting ? charIndex - 1 : charIndex + 1;
            setTimeout(type, typeSpeed);
        }
        type();
    }

    // --- ANIMACIONES DE SCROLL (INTERSECTION OBSERVER API) ---
    const hiddenElements = document.querySelectorAll('.hidden');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Desactivar si solo quieres que la animación ocurra una vez
            } else {
                // entry.target.classList.remove('visible'); // Opcional: para que se oculten al salir de la vista
            }
        });
    }, { 
        threshold: 0.1, // Elemento visible en un 10%
        rootMargin: '0px 0px -50px 0px' // Cargar un poco antes de llegar al final
    });
    hiddenElements.forEach((el) => observer.observe(el));

    // --- NAVEGACIÓN ACTIVA AL HACER SCROLL ---
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = 'home';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Ajustar el offset para que la sección se active un poco antes
            if (pageYOffset >= sectionTop - (window.innerHeight / 2)) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(a => {
            a.classList.remove('active');
            if (a.getAttribute('href').substring(1) === current) {
                a.classList.add('active');
            }
        });
    });
});