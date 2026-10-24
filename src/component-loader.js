
async function loadComponent(elementId, filePath) {
    const container = document.getElementById(elementId);
    if (!container) throw new Error(`Wadah komponen tidak ditemukan: ${elementId}`);

    const response = await fetch(filePath);
    if (!response.ok) throw new Error(`Gagal memuat ${filePath}: ${response.status}`);

    container.innerHTML = await response.text();
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
loadAllComponents().catch(error => {
    console.error(error);

    const errorMessage = document.createElement('p');
    errorMessage.setAttribute('role', 'alert');
    errorMessage.className = 'font-poppins bg-bg1 text-text p-4';
    errorMessage.textContent = 'Konten halaman gagal dimuat. Silakan muat ulang halaman.';
    document.body.prepend(errorMessage);
});
