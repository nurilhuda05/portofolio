import { test, expect } from '@playwright/test';
import { PortfolioPage } from '../pages/PortfolioPage';

test.describe('Pengujian E2E Website Portofolio Muhammad Nuril Huda', () => {

  test('1. Skenario Render Dinamis: Seluruh komponen halaman berhasil dimuat oleh component-loader', async ({ page }) => {
    const portfolio = new PortfolioPage(page);

    await portfolio.goto();
    await portfolio.verifikasiKomponenDinamisTermuat();
  });

  test('2. Skenario Konten Beranda: Menampilkan identitas Muhammad Nuril Huda dengan benar', async ({ page }) => {
    const portfolio = new PortfolioPage(page);

    await portfolio.goto();
    await portfolio.verifikasiIdentitasPemilik();
  });

  test('3. Skenario Navigasi: Pengunjung dapat menavigasi dan melihat bagian Proyek & Keahlian', async ({ page }) => {
    const portfolio = new PortfolioPage(page);

    await portfolio.goto();
    await portfolio.navigasiKeProyek();

    // Pastikan komponen Keahlian dan Pendidikan juga tampil di halaman
    await expect(portfolio.keahlianSection).toBeVisible();
    await expect(portfolio.pendidikanSection).toBeVisible();
  });

});