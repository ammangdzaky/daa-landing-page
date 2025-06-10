// js/script.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Smooth Scroll untuk Navigasi Internal ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            // Pastikan targetId bukan hanya '#' (untuk Home link)
            if (targetId === '#') {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
                return;
            }

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Hitung posisi scroll dengan mempertimbangkan tinggi header
                const headerOffset = document.querySelector('.main-header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                const offsetPosition = elementPosition - headerOffset - 20; // -20px tambahan margin

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }

            // Tutup menu mobile jika terbuka setelah klik
            const mainNav = document.querySelector('.main-nav .nav-list');
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
            }
        });
    });

    // --- Fungsionalitas Toggle Menu Mobile ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navList = document.querySelector('.main-nav .nav-list');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            navList.classList.toggle('active');
            // Mengubah ikon hamburger menjadi X dan sebaliknya
            const icon = menuToggle.querySelector('i');
            if (navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // --- Fungsionalitas Tags (DAA, Struktur Data, dll.) ---
    const tagButtons = document.querySelectorAll('.tag-button');
    const categoryContents = document.querySelectorAll('.category-content');

    if (tagButtons.length > 0 && categoryContents.length > 0) {
        tagButtons.forEach(button => {
            button.addEventListener('click', function() {
                // *** INI BARIS PERBAIKANNYA ***
                // Hentikan eksekusi jika tombol yang diklik sudah aktif
                if (this.classList.contains('active')) {
                    return; // Keluar dari fungsi jika sudah aktif
                }
                // ******************************

                // Hapus kelas 'active' dari semua tombol tag
                tagButtons.forEach(btn => btn.classList.remove('active'));
                // Tambahkan kelas 'active' ke tombol yang diklik
                this.classList.add('active');

                const targetCategory = this.dataset.category; // Ambil data-category dari tombol

                // Sembunyikan semua konten kategori
                categoryContents.forEach(content => content.classList.remove('active-content'));

                // Tampilkan konten kategori yang sesuai
                const activeContent = document.getElementById(targetCategory);
                if (activeContent) {
                    activeContent.classList.add('active-content');
                }
            });
        });
    }

    // --- Active Nav Link on Scroll (Opsional) ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.main-nav .nav-list a');

    function activateNavLink() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - document.querySelector('.main-header').offsetHeight - 50; // Offset untuk header
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', activateNavLink);
    activateNavLink(); // Panggil saat halaman dimuat
});