import { Page, Locator, expect } from '@playwright/test';

export class PortfolioPage {
  readonly page: Page;
  readonly headerSection: Locator;
  readonly berandaSection: Locator;
  readonly tentangSection: Locator;
  readonly keahlianSection: Locator;
  readonly pendidikanSection: Locator;
  readonly proyekSection: Locator;
  readonly footerSection: Locator;

  constructor(page: Page) {
    this.page = page;

    // Locator untuk setiap komponen dinamis yang dimuat oleh component-loader.js
    this.headerSection = page.locator('#comp-header');
    this.berandaSection = page.locator('#comp-beranda');
    this.tentangSection = page.locator('#comp-tentang');
    this.keahlianSection = page.locator('#comp-keahlian');
    this.pendidikanSection = page.locator('#comp-pendidikan');
    this.proyekSection = page.locator('#comp-proyek');
    this.footerSection = page.locator('#comp-footer');
  }

  async goto() {
    await this.page.goto('/');
    // Pastikan judul halaman sesuai
    await expect(this.page).toHaveTitle(/Portofolio Muhammad Nuril Huda/i);
  }

  async verifikasiKomponenDinamisTermuat() {
    // Web-First Assertion: memastikan semua komponen selesai di-render (tidak kosong)
    await expect(this.headerSection).not.toBeEmpty();
    await expect(this.berandaSection).not.toBeEmpty();
    await expect(this.proyekSection).not.toBeEmpty();
    await expect(this.footerSection).not.toBeEmpty();
  }

  async verifikasiIdentitasPemilik() {
    // Memastikan nama pemilik tampil di bagian beranda
    await expect(this.berandaSection.getByText(/Muhammad Nuril Huda|Nuril Huda/i).first()).toBeVisible();
  }

  async navigasiKeProyek() {
    // Klik menu navigasi Proyek/Project di bagian Header jika ada, atau scroll ke seksi proyek
    const linkProyek = this.headerSection.getByRole('link', { name: /Proyek|Project|Portofolio/i }).first();
    if (await linkProyek.isVisible()) {
      await linkProyek.click();
    } else {
      await this.proyekSection.scrollIntoViewIfNeeded();
    }
    await expect(this.proyekSection).toBeVisible();
  }
}