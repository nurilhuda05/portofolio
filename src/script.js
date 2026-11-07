class NavigationController {
    constructor() {
        this.burger = document.getElementById("burger");
        this.mobileMenu = document.getElementById("mobile-menu");
        this.header = document.querySelector("header");
        this.logo = this.header.querySelector("img");
        this.desktopMenu = this.header.querySelector("ul");
        this.sections = document.querySelectorAll("section, footer");
    }

    initialize() {
        this.burger.addEventListener("click", () => this.toggleMobileMenu());

        this.mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                window.setTimeout(() => this.closeMobileMenu(), 200);
            });
        });

        window.addEventListener("scroll", () => this.updateHeaderForActiveSection());
        this.updateHeaderForActiveSection();
    }

    toggleMobileMenu() {
        const isExpanded = this.burger.getAttribute("aria-expanded") === "true";
        this.mobileMenu.classList.toggle("hidden", isExpanded);
        this.burger.setAttribute("aria-expanded", String(!isExpanded));
        this.burger.setAttribute(
            "aria-label",
            isExpanded ? "Buka menu navigasi" : "Tutup menu navigasi"
        );
    }

    closeMobileMenu() {
        this.mobileMenu.classList.add("hidden");
        this.burger.setAttribute("aria-expanded", "false");
        this.burger.setAttribute("aria-label", "Buka menu navigasi");
    }

    updateHeaderForActiveSection() {
        let activeSection = null;

        this.sections.forEach(section => {
            const bounds = section.getBoundingClientRect();
            if (bounds.top <= 80 && bounds.bottom > 80) {
                activeSection = section;
            }
        });

        if (!activeSection && this.sections.length > 0) {
            activeSection = this.sections[0];
        }

        if (!activeSection) return;

        if (activeSection.classList.contains("bg-bg1")) {
            this.header.classList.remove("bg-bg", "text-bg1");
            this.header.classList.add("bg-bg1", "text-bg");
            this.desktopMenu.classList.remove("border-bg1");
            this.desktopMenu.classList.add("border-bg");
            this.logo.classList.add("logo-blue");
            return;
        }

        this.header.classList.remove("bg-bg1", "text-bg");
        this.header.classList.add("bg-bg", "text-bg1");
        this.desktopMenu.classList.remove("border-bg");
        this.desktopMenu.classList.add("border-bg1");
        this.logo.classList.remove("logo-blue");
    }
}

class SkillPopoverController {
    constructor() {
        this.section = document.getElementById("keahlian");
        this.icons = this.section.querySelectorAll("svg[data-skill]");
        this.popover = document.createElement("div");
        this.activeIcon = null;
    }

    initialize() {
        this.popover.className = "skill-popover";
        this.popover.setAttribute("role", "status");
        this.popover.setAttribute("aria-live", "polite");
        this.section.append(this.popover);

        this.icons.forEach(icon => {
            icon.addEventListener("click", event => {
                event.stopPropagation();
                this.togglePopover(icon);
            });

            icon.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    this.togglePopover(icon);
                }
            });
        });

        document.addEventListener("click", () => this.closePopover());
        document.addEventListener("keydown", event => {
            if (event.key === "Escape") this.closePopover();
        });
        window.addEventListener("resize", () => this.closePopover());
        window.addEventListener("scroll", () => this.closePopover(), { passive: true });
    }

    closePopover() {
        if (this.activeIcon) {
            this.activeIcon.setAttribute("aria-expanded", "false");
            this.activeIcon = null;
        }

        this.popover.classList.remove("is-visible");
    }

    togglePopover(icon) {
        if (this.activeIcon === icon) {
            this.closePopover();
            return;
        }

        if (this.activeIcon) {
            this.activeIcon.setAttribute("aria-expanded", "false");
        }

        this.activeIcon = icon;
        icon.setAttribute("aria-expanded", "true");
        this.popover.textContent = icon.dataset.skill;
        this.popover.classList.remove("is-visible");

        const iconBounds = icon.getBoundingClientRect();
        const popoverBounds = this.popover.getBoundingClientRect();
        const horizontalPadding = 8;
        const left = Math.min(
            Math.max(
                iconBounds.left + iconBounds.width / 2 - popoverBounds.width / 2,
                horizontalPadding
            ),
            window.innerWidth - popoverBounds.width - horizontalPadding
        );
        const top = iconBounds.bottom + popoverBounds.height + 8 <= window.innerHeight
            ? iconBounds.bottom + 8
            : Math.max(horizontalPadding, iconBounds.top - popoverBounds.height - 8);

        this.popover.style.left = `${left}px`;
        this.popover.style.top = `${top}px`;
        this.popover.getBoundingClientRect();
        this.popover.classList.add("is-visible");
    }
}

class GpaCounterController {
    constructor() {
        this.badge = document.querySelector(".gpa-badge");
        this.counter = this.badge?.querySelector(".gpa-counter");
        this.card = this.badge?.closest(".education-card");
        this.target = 3.84;
        this.duration = 1000;
        this.animationFrame = null;
    }

    initialize() {
        if (!this.badge || !this.counter || !this.card) return;

        this.card.addEventListener("mouseenter", () => this.start());
        this.badge.addEventListener("click", () => this.start());
        this.badge.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                this.start();
            }
        });
    }

    start() {
        if (this.animationFrame !== null) return;

        this.counter.textContent = "0.00";
        this.animationFrame = requestAnimationFrame(timestamp => {
            this.update(timestamp, timestamp);
        });
    }

    update(timestamp, startTime) {
        const progress = Math.min((timestamp - startTime) / this.duration, 1);
        const easedProgress = 1 - (1 - progress) ** 3;
        this.counter.textContent = (this.target * easedProgress).toFixed(2);

        if (progress < 1) {
            this.animationFrame = requestAnimationFrame(nextTimestamp => {
                this.update(nextTimestamp, startTime);
            });
        } else {
            this.animationFrame = null;
        }
    }
}

class FooterMusicPlayer {
    constructor(lyricsData) {
        this.audio = document.getElementById("footer-audio");
        this.playToggle = document.getElementById("footer-play-toggle");
        this.trackToggle = document.getElementById("footer-track-toggle");
        this.timeDisplay = document.getElementById("footer-time");
        this.lyricsDisplay = document.getElementById("footer-lyrics");
        this.audioStatus = document.getElementById("footer-audio-status");
        this.backToTop = document.getElementById("footer-back-to-top");
        this.lyricsData = lyricsData;
        this.fallbackDuration = 300;
        this.lyricTransitionTimer = null;
        this.hasStartedPlayback = false;
    }

    initialize() {
        if (
            !this.audio ||
            !this.playToggle ||
            !this.trackToggle ||
            !this.timeDisplay ||
            !this.lyricsDisplay ||
            !this.audioStatus ||
            !this.backToTop
        ) {
            return;
        }

        this.playToggle.addEventListener("click", () => this.togglePlayback());
        this.trackToggle.addEventListener("click", () => this.togglePlayback());
        this.audio.addEventListener("play", () => {
            this.hasStartedPlayback = true;
            this.updatePlaybackControls();
        });
        this.audio.addEventListener("pause", () => this.updatePlaybackControls());
        this.audio.addEventListener("loadedmetadata", () => this.updateAudioTime());
        this.audio.addEventListener("durationchange", () => this.updateAudioTime());
        this.audio.addEventListener("timeupdate", () => this.handleTimeUpdate());
        this.audio.addEventListener("ended", () => this.handlePlaybackEnded());
        this.audio.addEventListener("error", () => {
            this.audioStatus.textContent = "File audio gagal dimuat.";
        });
        this.backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });

        this.updatePlaybackControls();
        this.updateAudioTime();
    }

    formatTime(seconds) {
        const safeSeconds = Number.isFinite(seconds) ? Math.max(0, Math.floor(seconds)) : 0;
        const minutes = Math.floor(safeSeconds / 60).toString().padStart(2, "0");
        const remainingSeconds = (safeSeconds % 60).toString().padStart(2, "0");
        return `${minutes}:${remainingSeconds}`;
    }

    updateAudioTime() {
        const duration = Number.isFinite(this.audio.duration) && this.audio.duration > 0
            ? this.audio.duration
            : this.fallbackDuration;
        this.timeDisplay.textContent =
            `${this.formatTime(this.audio.currentTime)} / ${this.formatTime(duration)}`;
    }

    setLyrics(text) {
        if (this.lyricsDisplay.textContent === `"${text}"`) return;

        window.clearTimeout(this.lyricTransitionTimer);
        this.lyricsDisplay.classList.add("is-changing");
        this.lyricTransitionTimer = window.setTimeout(() => {
            this.lyricsDisplay.textContent = `"${text}"`;
            this.lyricsDisplay.classList.remove("is-changing");
        }, 100);
    }

    updateLyrics() {
        let currentLine = this.lyricsData[0];

        for (const lyric of this.lyricsData) {
            if (this.audio.currentTime < lyric.time) break;
            currentLine = lyric;
        }

        if (currentLine) this.setLyrics(currentLine.text);
    }

    async togglePlayback() {
        this.audioStatus.textContent = "";

        if (this.audio.paused) {
            try {
                await this.audio.play();
            } catch (error) {
                console.error("Audio gagal diputar:", error);
                this.audioStatus.textContent = "Audio tidak dapat diputar. Periksa file audio lalu coba lagi.";
            }
            return;
        }

        this.audio.pause();
    }

    updatePlaybackControls() {
        const isPlaying = !this.audio.paused && !this.audio.ended;
        this.playToggle.textContent = isPlaying ? "⏸" : "▶";
        this.playToggle.setAttribute("aria-label", isPlaying ? "Jeda lagu" : "Putar lagu");
        this.trackToggle.setAttribute(
            "aria-label",
            `${isPlaying ? "Jeda" : "Putar"} Gemilang - Perunggu`
        );
    }

    handleTimeUpdate() {
        this.updateAudioTime();
        if (this.hasStartedPlayback) this.updateLyrics();
    }

    handlePlaybackEnded() {
        this.audio.currentTime = 0;
        this.hasStartedPlayback = false;
        this.updatePlaybackControls();
        this.updateAudioTime();
        this.setLyrics("Klik ▶ untuk memutar lagu favorit saya");
    }
}

document.addEventListener('components-loaded', () => {
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

    new NavigationController().initialize();
    new SkillPopoverController().initialize();
    new GpaCounterController().initialize();
    new FooterMusicPlayer(lyricsData).initialize();
});
