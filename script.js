// Script untuk Portofolio Mahasiswa IT

document.addEventListener('DOMContentLoaded', () => {
    
    // ---------------------------------------------------------
    // 1. EFEK KETIK (TYPEWRITER) UNTUK HERO SECTION
    // ---------------------------------------------------------
    const textElement = document.getElementById('typing-text');
    const texts = ["Informatika", "Developer", "Mahasiswa IT", "Coder"];
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function typeWriter() {
        const currentText = texts[textIndex];
        
        if (isDeleting) {
            textElement.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Hapus lebih cepat
        } else {
            textElement.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 100; // Ketik normal
        }

        if (!isDeleting && charIndex === currentText.length) {
            isDeleting = true;
            typeSpeed = 2000; // Jeda sebelum hapus
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500; // Jeda sebelum lanjut kata berikutnya
        }

        setTimeout(typeWriter, typeSpeed);
    }

    // Jalankan efek ketik
    typeWriter();


    // ---------------------------------------------------------
    // 2. NAVBAR SCROLL EFFECT (UBAH BACKGROUND SAAT SCROLL)
    // ---------------------------------------------------------
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.3)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.9)';
            navbar.style.boxShadow = 'none';
        }
    });


    // ---------------------------------------------------------
    // 3. MOBILE MENU TOGGLE
    // ---------------------------------------------------------
    const mobileMenu = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Animasi hamburger menjadi X
        const bars = document.querySelectorAll('.bar');
        bars.forEach(bar => bar.classList.toggle('change'));
    });

    // Tutup menu saat link diklik
    document.querySelectorAll('.nav-links li a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const bars = document.querySelectorAll('.bar');
            bars.forEach(bar => bar.classList.remove('change'));
        });
    });


    // ---------------------------------------------------------
    // 4. SMOOTH SCROLLING UNTUK ANCHOR LINKS
    // ---------------------------------------------------------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if(targetId === '#') return;

            const targetSection = document.querySelector(targetId);
            if(targetSection) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });


    // ---------------------------------------------------------
    // 5. REVEAL ON SCROLL (ELEMEN MUNCUL SAAT DISCROLL)
    // ---------------------------------------------------------
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Amati elemen yang ingin dianimate
    const animateElements = document.querySelectorAll('.about-card, .project-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // Tambahkan kelas visible untuk animasi
    const style = document.createElement('style');
    style.textContent = `
        .visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);


    // ---------------------------------------------------------
    // 6. TANGGAL OTOMATIS DI FOOTER
    // ---------------------------------------------------------
    const yearElement = document.querySelector('footer p');
    if(yearElement) {
        const currentYear = new Date().getFullYear();
        yearElement.innerHTML = yearElement.innerHTML.replace('[Nama Anda]', `Nama Anda &copy; ${currentYear}`);
    }


    // ---------------------------------------------------------
    // 7. KONFIRMASI SEBELUM KIRIM EMAIL (OPSIONAL)
    // ---------------------------------------------------------
    const emailBtn = document.querySelector('.contact-wrapper .btn.primary');
    if(emailBtn) {
        emailBtn.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if(href && href.includes('mailto:')) {
                // Biarkan membuka mail client
                console.log('Membuka mail client...');
            }
        });
    }

    console.log("Portofolio loaded successfully! 🚀");
});
