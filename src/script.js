// Menunggu semua komponen selesai dimuat oleh component-loader.js
document.addEventListener('components-loaded', () => {
    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobile-menu");
    const header = document.querySelector("header");
    const logo = header.querySelector("img");
    const desktopMenu = header.querySelector("ul");
    const sections = document.querySelectorAll("section, footer");
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

    const gpaBadge = document.querySelector(".gpa-badge");
    const gpaCounter = gpaBadge?.querySelector(".gpa-counter");
    const gpaCard = gpaBadge?.closest(".education-card");

    if (gpaBadge && gpaCounter && gpaCard) {
        const target = 3.84;
        const duration = 1000;
        let animationFrame = null;

        function animateGpaCounter(timestamp, startTime) {
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easedProgress = 1 - (1 - progress) ** 3;

            gpaCounter.textContent = (target * easedProgress).toFixed(2);

            if (progress < 1) {
                animationFrame = requestAnimationFrame(nextTimestamp => {
                    animateGpaCounter(nextTimestamp, startTime);
                });
            } else {
                animationFrame = null;
            }
        }

        function startGpaCounter() {
            if (animationFrame !== null) return;

            gpaCounter.textContent = "0.00";
            animationFrame = requestAnimationFrame(timestamp => {
                animateGpaCounter(timestamp, timestamp);
            });
        }

        gpaCard.addEventListener("mouseenter", startGpaCounter);
        gpaBadge.addEventListener("click", startGpaCounter);
        gpaBadge.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                startGpaCounter();
            }
        });
    }

    const audio = document.getElementById("footer-audio");
    const playToggle = document.getElementById("footer-play-toggle");
    const trackToggle = document.getElementById("footer-track-toggle");
    const timeDisplay = document.getElementById("footer-time");
    const lyricsDisplay = document.getElementById("footer-lyrics");
    const audioStatus = document.getElementById("footer-audio-status");
    const backToTop = document.getElementById("footer-back-to-top");

    if (audio && playToggle && trackToggle && timeDisplay && lyricsDisplay && audioStatus && backToTop) {
        const lyricsData = [
            { time: 0.00, text: "Instrumental..." },
            { time: 31.58, text: "Terjilat" },
            { time: 34.88, text: "Matahari timur yang kejam" },
            { time: 39.48, text: "Sengat melekat di bahuku" },
            { time: 43.70, text: "Perlukah" },
            { time: 46.92, text: "Menepi, menyisi sebentar?" },
            { time: 51.64, text: "Tapi ku wajib tepat waktu" },
            { time: 55.26, text: "•••" },
            { time: 56.52, text: "Keluhan demi keluhan" },
            { time: 62.50, text: "Segera kugilas perlahan" },
            { time: 69.01, text: "•••" },
            { time: 69.64, text: "Karena ini yang kumau" },
            { time: 75.65, text: "Berkah kepala yang batu" },
            { time: 80.58, text: "Semua yang ragukan atau tak percaya" },
            { time: 86.62, text: "Debu pagi kujelang" },
            { time: 90.77, text: "Instrumental..." },
            { time: 103.87, text: "Tak terasa" },
            { time: 107.31, text: "Sebelas tahun telah berselang" },
            { time: 111.86, text: "Masih terasa di bahuku" },
            { time: 116.10, text: "Beban yang" },
            { time: 119.51, text: "Bercampur bangga telah kurengkuh" },
            { time: 123.96, text: "Semua berpihak kepadaku" },
            { time: 127.80, text: "Pasti doamu yang lancarkan upayaku" },
            { time: 133.82, text: "Mesti doa yang meluncur dari bibirmu" },
            { time: 139.89, text: "Dan yang kutahu kau takkan pernah berhenti" },
            { time: 145.90, text: "Tumbuhku kini semoga sesuai yang kau impi" },
            { time: 153.62, text: "•••" },
            { time: 154.20, text: "Tertulis jelas namaku" },
            { time: 160.33, text: "Di setiap harap malammu" },
            { time: 165.25, text: "Tentang masa depan, tentang masa terang" },
            { time: 171.20, text: "Warisan akal budi gemilang" },
            { time: 178.41, text: "Pelan pasti kukabulkan" },
            { time: 184.34, text: "Segala catatan harapmu" },
            { time: 189.32, text: "Tentang masa depan, tentang masa terang" },
            { time: 195.39, text: "Kebul jalan kuterjang" },
            { time: 203.06, text: "Outro..." }
        ];
        const fallbackDuration = 300;
        let lyricTransitionTimer = null;
        let hasStartedPlayback = false;

        function formatAudioTime(seconds) {
            const safeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
            const minutes = Math.floor(safeSeconds / 60).toString().padStart(2, "0");
            const remainingSeconds = (safeSeconds % 60).toString().padStart(2, "0");
            return `${minutes}:${remainingSeconds}`;
        }

        function updateAudioTime() {
            const duration = Number.isFinite(audio.duration) && audio.duration > 0
                ? audio.duration
                : fallbackDuration;
            timeDisplay.textContent = `${formatAudioTime(audio.currentTime)} / ${formatAudioTime(duration)}`;
        }

        function setLyrics(text) {
            if (lyricsDisplay.textContent === `"${text}"`) return;

            window.clearTimeout(lyricTransitionTimer);
            lyricsDisplay.classList.add("is-changing");
            lyricTransitionTimer = window.setTimeout(() => {
                lyricsDisplay.textContent = `"${text}"`;
                lyricsDisplay.classList.remove("is-changing");
            }, 100);
        }

        function updateLyrics() {
            let currentLine = lyricsData[0];

            for (const lyric of lyricsData) {
                if (audio.currentTime < lyric.time) break;
                currentLine = lyric;
            }

            if (currentLine) setLyrics(currentLine.text);
        }

        async function toggleAudioPlayback() {
            audioStatus.textContent = "";

            if (audio.paused) {
                try {
                    await audio.play();
                } catch (error) {
                    console.error("Audio gagal diputar:", error);
                    audioStatus.textContent = "Audio tidak dapat diputar. Periksa file audio lalu coba lagi.";
                }
            } else {
                audio.pause();
            }
        }

        function updatePlaybackControls() {
            const isPlaying = !audio.paused && !audio.ended;
            playToggle.textContent = isPlaying ? "⏸" : "▶";
            playToggle.setAttribute("aria-label", isPlaying ? "Jeda lagu" : "Putar lagu");
            trackToggle.setAttribute("aria-label", `${isPlaying ? "Jeda" : "Putar"} Gemilang - Perunggu`);
        }

        playToggle.addEventListener("click", toggleAudioPlayback);
        trackToggle.addEventListener("click", toggleAudioPlayback);
        audio.addEventListener("play", () => {
            hasStartedPlayback = true;
            updatePlaybackControls();
        });
        audio.addEventListener("pause", updatePlaybackControls);
        audio.addEventListener("loadedmetadata", updateAudioTime);
        audio.addEventListener("durationchange", updateAudioTime);
        audio.addEventListener("timeupdate", () => {
            updateAudioTime();
            if (hasStartedPlayback) updateLyrics();
        });
        audio.addEventListener("ended", () => {
            audio.currentTime = 0;
            hasStartedPlayback = false;
            updatePlaybackControls();
            updateAudioTime();
            setLyrics("Klik ▶ untuk memutar lagu favorit saya");
        });
        audio.addEventListener("error", () => {
            audioStatus.textContent = "File audio gagal dimuat.";
        });
        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        updatePlaybackControls();
        updateAudioTime();
    }

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
