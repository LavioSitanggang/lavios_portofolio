document.addEventListener('DOMContentLoaded', () => {
    // --- Professional Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    if (typewriterElement) {
        new Typed('#typewriter', { 
            strings: ['Lavio Putera Arya Sitanggang'], // <--- SUDAH DIGANTI
            typeSpeed: 70, 
            startDelay: 800, 
            showCursor: true, 
            cursorChar: '|', 
            autoInsertCss: true,
            loop: false,
            fadeOut: false,
            shuffle: false,
            backSpeed: 0
        });
    }

    // --- Efek yang Dihapus untuk Minimalisme ---
    // createInnovationRay() Dihapus
    // createKnowledgeNode() Dihapus
    // AIParticle class Dihapus

    // --- Minimalist Neural Network Canvas ---
    const canvas = document.getElementById('network-canvas');
    const ctx = canvas.getContext('2d');
    
    let w, h, particles, mouse;
    const particleCount = 70; // Jumlah node dalam jaringan
    const particleColor = 'rgba(10, 132, 255, 1)'; // --accent-primary
    const lineColor = 'rgba(248, 250, 252, 0.1)'; // --text-primary dengan opacity rendah
    const maxDistance = 100; // Jarak koneksi antar node

    function initCanvas() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        mouse = { x: undefined, y: undefined };
        particles = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.vx = (Math.random() - 0.5) * 0.5; // Kecepatan gerak lambat
            this.vy = (Math.random() - 0.5) * 0.5;
            this.radius = Math.random() * 1.5 + 1; // Ukuran node kecil
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Buat partikel kembali jika keluar layar
            if (this.x > w + 5 || this.x < -5 || this.y > h + 5 || this.y < -5) {
                this.x = Math.random() * w;
                this.y = h + 10; // Muncul dari bawah
            }
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = particleColor;
            ctx.fill();
        }
    }

    function drawLines() {
        let p1, p2;
        for (let i = 0; i < particles.length; i++) {
            p1 = particles[i];
            for (let j = i + 1; j < particles.length; j++) {
                p2 = particles[j];
                const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

                if (dist < maxDistance) {
                    const opacity = 1 - (dist / maxDistance);
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(248, 250, 252, ${opacity * 0.15})`; // Garis putih/abu-abu halus
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        // Garis ke mouse
        if (mouse.x) {
            for (let i = 0; i < particles.length; i++) {
                const dist = Math.hypot(particles[i].x - mouse.x, particles[i].y - mouse.y);
                if (dist < maxDistance * 1.5) { // Jarak interaksi mouse lebih besar
                    const opacity = 1 - (dist / (maxDistance * 1.5));
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.strokeStyle = `rgba(10, 132, 255, ${opacity * 0.3})`; // Garis biru ke mouse
                    ctx.lineWidth = 0.8;
                    ctx.stroke();
                }
            }
        }
    }
    
    // --- Animation Loop ---
    let animationId;
    function animate() {
        ctx.clearRect(0, 0, w, h);
        
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        
        drawLines();
        
        animationId = requestAnimationFrame(animate);
    }

    // --- Advanced Mouse Interaction ---
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseout', () => {
        mouse.x = undefined;
        mouse.y = undefined;
    });

    // --- Enhanced Scroll-triggered Animations ---
    const animatedElements = document.querySelectorAll('[data-animate]');
    const listItemElements = document.querySelectorAll('.animate-list-item');
    
    const learningObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const learningLine = entry.target.querySelector('.learning-line');
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                if (learningLine) learningLine.classList.add('activate');

                const delayedElements = entry.target.querySelectorAll('[data-animate-delay]');
                delayedElements.forEach((element, index) => {
                    setTimeout(() => element.classList.add('reveal'), 100 + (index * 100));
                });

                const listItems = entry.target.querySelectorAll('.animate-list-item');
                listItems.forEach((item, index) => {
                    setTimeout(() => item.classList.add('active'), 200 + (index * 150));
                });

            } else {
                // Hapus kelas untuk re-animasi jika pengguna scroll ke atas (opsional)
                // entry.target.classList.remove('reveal');
                // if (learningLine) learningLine.classList.remove('activate');
                // const delayedElements = entry.target.querySelectorAll('[data-animate-delay]');
                // delayedElements.forEach(element => element.classList.remove('reveal'));
                // const listItems = entry.target.querySelectorAll('.animate-list-item');
                // listItems.forEach(item => item.classList.remove('active'));
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => learningObserver.observe(el));
    listItemElements.forEach(el => learningObserver.observe(el));

    // --- Navigation System ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('#nav-links a');
    
    // CSS Variables untuk status aktif (dari :root di style.css)
    const activeTextColor = '#F8FAFC'; // --text-primary
    const activeBgColor = 'rgba(10, 132, 255, 0.1)'; // --accent-primary/10
    const mutedTextColor = '#64748B'; // --text-muted

    const navigationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.style.color = mutedTextColor;
                    link.style.backgroundColor = 'transparent';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = activeTextColor;
                        link.style.backgroundColor = activeBgColor;
                    }
                });
            }
        });
    }, { 
        rootMargin: '-20% 0px -80% 0px'
    });

    sections.forEach(section => navigationObserver.observe(section));
    
    // --- Scroll Progress (Tidak lagi digunakan untuk mengubah vine, tapi bisa untuk hal lain) ---
    // let ticking = false;
    // function updateProgressFlow() {
    //     // ...
    //     ticking = false;
    // }
    // window.addEventListener('scroll', () => {
    //     if (!ticking) {
    //         requestAnimationFrame(updateProgressFlow);
    //         ticking = true;
    //     }
    // });

    // --- Responsive System Management ---
    window.addEventListener('resize', () => {
        initCanvas();
    });

    // --- Performance Management ---
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            if (animationId) cancelAnimationFrame(animationId);
        } else {
            animate();
        }
    });

    // --- Smooth Professional Navigation ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // --- Inisialisasi ---
    initCanvas();
    animate();
});