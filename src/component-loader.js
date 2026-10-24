
async function loadComponent(elementId, filePath) {
    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error(`Gagal memuat ${filePath}: ${response.status}`);
        const html = await response.text();
        document.getElementById(elementId).innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

async function loadAllComponents() {
    await Promise.all([
        loadComponent('comp-header',     './src/components/header.html'),
        loadComponent('comp-beranda',    './src/components/beranda.html'),
        loadComponent('comp-tentang',    './src/components/tentang.html'),
        loadComponent('comp-keahlian',   './src/components/keahlian.html'),
        loadComponent('comp-pendidikan', './src/components/pendidikan.html'),
        loadComponent('comp-proyek',     './src/components/proyek.html'),
        loadComponent('comp-footer',     './src/components/footer.html'),
    ]);

    // Dispatch event bahwa semua komponen sudah dimuat
    document.dispatchEvent(new Event('components-loaded'));
}

// Muat semua komponen saat DOM siap
loadAllComponents();
