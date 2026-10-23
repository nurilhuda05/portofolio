// Menunggu semua komponen selesai dimuat oleh component-loader.js
document.addEventListener('components-loaded', () => {
    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobile-menu");
    const header = document.querySelector("header");
    const logo = header.querySelector("img");
    const desktopMenu = header.querySelector("ul");
    const sections = document.querySelectorAll("section");

    // Alihkan (toggle) menu seluler
    burger.addEventListener("click", () => {
        mobileMenu.classList.toggle("hidden");
    });

    // Tutup menu saat salah satu link diklik (diberi delay agar animasi garis bawah terlihat dahulu)
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 200);
        });
    });

    // Warna navbar dinamis saat di-scroll (background solid menyesuaikan setiap seksi)
    function handleScroll() {
        let activeSection = null;
        
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            // Seksi dianggap aktif jika batas atasnya di bawah atau sama dengan ambang batas navbar (80px)
            // dan batas bawahnya berada di atas ambang batas navbar (80px).
            if (rect.top <= 80 && rect.bottom > 80) {
                activeSection = section;
            }
        });

        // Default ke seksi pertama jika tidak ada seksi yang aktif (misalnya di bagian paling atas halaman)
        if (!activeSection && sections.length > 0) {
            activeSection = sections[0];
        }

        if (activeSection) {
            if (activeSection.classList.contains("bg-bg1")) {
                // Mode Abu-abu Terang (bg-bg1): Teks Biru, Logo Biru, Border Biru
                header.classList.remove("bg-bg", "text-bg1");
                header.classList.add("bg-bg1", "text-bg");
                
                desktopMenu.classList.remove("border-bg1");
                desktopMenu.classList.add("border-bg");
                
                logo.classList.add("logo-blue");
            } else {
                // Mode Biru (bg-bg): Teks Krem (bg1), Logo Putih (normal), Border Krem
                header.classList.remove("bg-bg1", "text-bg");
                header.classList.add("bg-bg", "text-bg1");
                
                desktopMenu.classList.remove("border-bg");
                desktopMenu.classList.add("border-bg1");
                
                logo.classList.remove("logo-blue");
            }
        }
    }

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Jalankan sekali di awal load
});
