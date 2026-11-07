// Menunggu semua komponen selesai dimuat oleh component-loader.js
document.addEventListener('components-loaded', () => {
    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobile-menu");
    const header = document.querySelector("header");
    const logo = header.querySelector("img");
    const desktopMenu = header.querySelector("ul");
    const sections = document.querySelectorAll("section");
    const skillsSection = document.getElementById("keahlian");
    const skillIcons = skillsSection.querySelectorAll("svg[data-skill]");
    const skillPopover = document.createElement("div");
    let activeSkillIcon = null;

    skillPopover.className = "skill-popover";
    skillPopover.setAttribute("role", "status");
    skillPopover.setAttribute("aria-live", "polite");
    skillsSection.append(skillPopover);

    function closeSkillPopover() {
        if (activeSkillIcon) {
            activeSkillIcon.setAttribute("aria-expanded", "false");
            activeSkillIcon = null;
        }

        skillPopover.classList.remove("is-visible");
    }

    function toggleSkillPopover(icon) {
        if (activeSkillIcon === icon) {
            closeSkillPopover();
            return;
        }

        if (activeSkillIcon) {
            activeSkillIcon.setAttribute("aria-expanded", "false");
        }

        activeSkillIcon = icon;
        activeSkillIcon.setAttribute("aria-expanded", "true");
        skillPopover.textContent = icon.dataset.skill;
        skillPopover.classList.remove("is-visible");

        const iconBounds = icon.getBoundingClientRect();
        const popoverBounds = skillPopover.getBoundingClientRect();
        const horizontalPadding = 8;
        const left = Math.min(
            Math.max(iconBounds.left + iconBounds.width / 2 - popoverBounds.width / 2, horizontalPadding),
            window.innerWidth - popoverBounds.width - horizontalPadding
        );
        const top = iconBounds.bottom + popoverBounds.height + 8 <= window.innerHeight
            ? iconBounds.bottom + 8
            : Math.max(horizontalPadding, iconBounds.top - popoverBounds.height - 8);

        skillPopover.style.left = `${left}px`;
        skillPopover.style.top = `${top}px`;
        skillPopover.getBoundingClientRect();
        skillPopover.classList.add("is-visible");
    }

    skillIcons.forEach(icon => {
        icon.addEventListener("click", event => {
            event.stopPropagation();
            toggleSkillPopover(icon);
        });

        icon.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                toggleSkillPopover(icon);
            }
        });
    });

    document.addEventListener("click", closeSkillPopover);
    document.addEventListener("keydown", event => {
        if (event.key === "Escape") closeSkillPopover();
    });
    window.addEventListener("resize", closeSkillPopover);
    window.addEventListener("scroll", closeSkillPopover, { passive: true });

    // Alihkan (toggle) menu seluler
    burger.addEventListener("click", () => {
        const isExpanded = burger.getAttribute("aria-expanded") === "true";
        mobileMenu.classList.toggle("hidden", isExpanded);
        burger.setAttribute("aria-expanded", String(!isExpanded));
        burger.setAttribute("aria-label", isExpanded ? "Buka menu navigasi" : "Tutup menu navigasi");
    });

    // Tutup menu saat salah satu link diklik (diberi delay agar animasi garis bawah terlihat dahulu)
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
                burger.setAttribute("aria-expanded", "false");
                burger.setAttribute("aria-label", "Buka menu navigasi");
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
