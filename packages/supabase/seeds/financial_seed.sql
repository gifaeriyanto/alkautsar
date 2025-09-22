-- FINANCIAL REPORTS AND WALLETS SEED DATA
-- This seed file creates sample data for wallets and financial_reports tables
-- IMPORTANT: Run init.sql first to create the organization before running this seed file

-- First, create some wallets for the organization
INSERT INTO "public"."wallets" ("id", "name", "organization_id", "created_at", "updated_at")
VALUES
    ('550e8400-e29b-41d4-a716-446655440001', 'Kas Masjid Utama', '123e4567-e89b-12d3-a456-426614174000', '2024-01-01 08:00:00+00', '2024-01-01 08:00:00+00'),
    ('550e8400-e29b-41d4-a716-446655440002', 'Kas Kegiatan Ramadhan', '123e4567-e89b-12d3-a456-426614174000', '2024-01-01 08:00:00+00', '2024-01-01 08:00:00+00'),
    ('550e8400-e29b-41d4-a716-446655440003', 'Kas Pembangunan', '123e4567-e89b-12d3-a456-426614174000', '2024-01-01 08:00:00+00', '2024-01-01 08:00:00+00'),
    ('550e8400-e29b-41d4-a716-446655440004', 'Kas Bantuan Sosial', '123e4567-e89b-12d3-a456-426614174000', '2024-01-01 08:00:00+00', '2024-01-01 08:00:00+00'),
    ('550e8400-e29b-41d4-a716-446655440005', 'Kas Operasional', '123e4567-e89b-12d3-a456-426614174000', '2024-01-01 08:00:00+00', '2024-01-01 08:00:00+00');

-- Financial reports data for different months and wallets
INSERT INTO "public"."financial_reports" ("id", "date", "wallet_id", "amount", "description", "notes", "photos", "organization_id", "created_at", "updated_at")
VALUES
    -- Kas Masjid Utama transactions (January 2024)
    ('660e8400-e29b-41d4-a716-446655440001', '2024-01-05', '550e8400-e29b-41d4-a716-446655440001', 2500000, 'Sumbangan Jumat Pertama', 'Dari jamaah sholat Jumat minggu pertama', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-05 14:30:00+00', '2024-01-05 14:30:00+00'),
    ('660e8400-e29b-41d4-a716-446655440002', '2024-01-12', '550e8400-e29b-41d4-a716-446655440001', 3200000, 'Sumbangan Jumat Kedua', 'Dari jamaah sholat Jumat minggu kedua', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-12 14:30:00+00', '2024-01-12 14:30:00+00'),
    ('660e8400-e29b-41d4-a716-446655440003', '2024-01-15', '550e8400-e29b-41d4-a716-446655440001', -850000, 'Bayar Listrik Masjid', 'Pembayaran tagihan listrik bulan Januari', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-15 10:00:00+00', '2024-01-15 10:00:00+00'),
    ('660e8400-e29b-41d4-a716-446655440004', '2024-01-19', '550e8400-e29b-41d4-a716-446655440001', 2800000, 'Sumbangan Jumat Ketiga', 'Dari jamaah sholat Jumat minggu ketiga', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-19 14:30:00+00', '2024-01-19 14:30:00+00'),
    ('660e8400-e29b-41d4-a716-446655440005', '2024-01-22', '550e8400-e29b-41d4-a716-446655440001', -450000, 'Beli Perlengkapan Sholat', 'Pembelian sajadah dan mukena baru', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-22 16:00:00+00', '2024-01-22 16:00:00+00'),
    ('660e8400-e29b-41d4-a716-446655440006', '2024-01-26', '550e8400-e29b-41d4-a716-446655440001', 3100000, 'Sumbangan Jumat Keempat', 'Dari jamaah sholat Jumat minggu keempat', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-26 14:30:00+00', '2024-01-26 14:30:00+00'),

    -- Kas Kegiatan Ramadhan transactions
    ('660e8400-e29b-41d4-a716-446655440007', '2024-02-10', '550e8400-e29b-41d4-a716-446655440002', 5000000, 'Sumbangan untuk Kegiatan Ramadhan', 'Dana awal untuk persiapan Ramadhan 1445H', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-02-10 09:00:00+00', '2024-02-10 09:00:00+00'),
    ('660e8400-e29b-41d4-a716-446655440008', '2024-02-15', '550e8400-e29b-41d4-a716-446655440002', -1200000, 'Beli Kurma dan Air Zam-zam', 'Persiapan takjil untuk berbuka puasa', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-02-15 11:30:00+00', '2024-02-15 11:30:00+00'),
    ('660e8400-e29b-41d4-a716-446655440009', '2024-02-20', '550e8400-e29b-41d4-a716-446655440002', 2500000, 'Sumbangan Donatur untuk Ramadhan', 'Dari donatur tetap untuk kegiatan Ramadhan', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-02-20 13:00:00+00', '2024-02-20 13:00:00+00'),

    -- Kas Pembangunan transactions
    ('660e8400-e29b-41d4-a716-44665544000a', '2024-01-08', '550e8400-e29b-41d4-a716-446655440003', 15000000, 'Sumbangan Pembangunan Minaret', 'Dana untuk pembangunan menara masjid', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-08 15:00:00+00', '2024-01-08 15:00:00+00'),
    ('660e8400-e29b-41d4-a716-44665544000b', '2024-01-25', '550e8400-e29b-41d4-a716-446655440003', -8500000, 'Bayar Material Bangunan', 'Pembayaran semen, batu bata, dan pasir', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-25 10:30:00+00', '2024-01-25 10:30:00+00'),
    ('660e8400-e29b-41d4-a716-44665544000c', '2024-02-05', '550e8400-e29b-41d4-a716-446655440003', 10000000, 'Sumbangan Infaq Pembangunan', 'Infaq khusus untuk pembangunan masjid', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-02-05 16:45:00+00', '2024-02-05 16:45:00+00'),

    -- Kas Bantuan Sosial transactions
    ('660e8400-e29b-41d4-a716-44665544000d', '2024-01-10', '550e8400-e29b-41d4-a716-446655440004', 3000000, 'Sumbangan untuk Bantuan Sosial', 'Dana untuk membantu jamaah yang membutuhkan', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-10 12:00:00+00', '2024-01-10 12:00:00+00'),
    ('660e8400-e29b-41d4-a716-44665544000e', '2024-01-18', '550e8400-e29b-41d4-a716-446655440004', -500000, 'Bantuan untuk Pak Ahmad', 'Bantuan biaya pengobatan untuk Pak Ahmad', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-18 14:00:00+00', '2024-01-18 14:00:00+00'),
    ('660e8400-e29b-41d4-a716-44665544000f', '2024-01-28', '550e8400-e29b-41d4-a716-446655440004', -750000, 'Bantuan untuk Bu Siti', 'Bantuan sembako untuk keluarga Bu Siti', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-28 11:15:00+00', '2024-01-28 11:15:00+00'),

    -- Kas Operasional transactions
    ('660e8400-e29b-41d4-a716-446655440010', '2024-01-03', '550e8400-e29b-41d4-a716-446655440005', 4000000, 'Dana Operasional Awal Tahun', 'Transfer dana operasional untuk 2024', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-03 08:00:00+00', '2024-01-03 08:00:00+00'),
    ('660e8400-e29b-41d4-a716-446655440011', '2024-01-07', '550e8400-e29b-41d4-a716-446655440005', -300000, 'Beli Alat Kebersihan', 'Pembelian sapu, pel, dan pembersih lantai', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-07 09:30:00+00', '2024-01-07 09:30:00+00'),
    ('660e8400-e29b-41d4-a716-446655440012', '2024-01-14', '550e8400-e29b-41d4-a716-446655440005', -200000, 'Bayar Internet Masjid', 'Tagihan internet bulan Januari', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-01-14 16:20:00+00', '2024-01-14 16:20:00+00'),

    -- February 2024 additional transactions
    ('660e8400-e29b-41d4-a716-446655440014', '2024-02-02', '550e8400-e29b-41d4-a716-446655440001', 2900000, 'Sumbangan Jumat Februari Week 1', 'Sumbangan jamaah minggu pertama Februari', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-02-02 14:30:00+00', '2024-02-02 14:30:00+00'),
    ('660e8400-e29b-41d4-a716-446655440015', '2024-02-09', '550e8400-e29b-41d4-a716-446655440001', 3400000, 'Sumbangan Jumat Februari Week 2', 'Sumbangan jamaah minggu kedua Februari', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-02-09 14:30:00+00', '2024-02-09 14:30:00+00'),
    ('660e8400-e29b-41d4-a716-446655440016', '2024-02-12', '550e8400-e29b-41d4-a716-446655440005', -800000, 'Bayar Listrik Februari', 'Tagihan listrik bulan Februari', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-02-12 10:15:00+00', '2024-02-12 10:15:00+00'),
    ('660e8400-e29b-41d4-a716-446655440017', '2024-02-16', '550e8400-e29b-41d4-a716-446655440001', 3600000, 'Sumbangan Jumat Februari Week 3', 'Sumbangan jamaah minggu ketiga Februari', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-02-16 14:30:00+00', '2024-02-16 14:30:00+00'),
    ('660e8400-e29b-41d4-a716-446655440018', '2024-02-23', '550e8400-e29b-41d4-a716-446655440001', 3100000, 'Sumbangan Jumat Februari Week 4', 'Sumbangan jamaah minggu keempat Februari', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-02-23 14:30:00+00', '2024-02-23 14:30:00+00'),

    -- March 2024 transactions (including preparation for Ramadan)
    ('660e8400-e29b-41d4-a716-446655440019', '2024-03-01', '550e8400-e29b-41d4-a716-446655440002', 7500000, 'Sumbangan Khusus Ramadhan', 'Sumbangan besar untuk persiapan Ramadhan', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-03-01 10:00:00+00', '2024-03-01 10:00:00+00'),
    ('660e8400-e29b-41d4-a716-44665544001a', '2024-03-05', '550e8400-e29b-41d4-a716-446655440002', -2800000, 'Beli Perlengkapan Iftar', 'Pembelian piring, gelas, dan peralatan untuk buka puasa bersama', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-03-05 11:45:00+00', '2024-03-05 11:45:00+00'),
    ('660e8400-e29b-41d4-a716-44665544001b', '2024-03-08', '550e8400-e29b-41d4-a716-446655440001', 4200000, 'Sumbangan Jumat Maret Week 1', 'Sumbangan jamaah minggu pertama Maret', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-03-08 14:30:00+00', '2024-03-08 14:30:00+00'),
    ('660e8400-e29b-41d4-a716-44665544001c', '2024-03-15', '550e8400-e29b-41d4-a716-446655440001', 3800000, 'Sumbangan Jumat Maret Week 2', 'Sumbangan jamaah minggu kedua Maret', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-03-15 14:30:00+00', '2024-03-15 14:30:00+00'),
    ('660e8400-e29b-41d4-a716-44665544001d', '2024-03-22', '550e8400-e29b-41d4-a716-446655440001', 4500000, 'Sumbangan Jumat Maret Week 3', 'Sumbangan jamaah minggu ketiga Maret', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-03-22 14:30:00+00', '2024-03-22 14:30:00+00'),
    ('660e8400-e29b-41d4-a716-44665544001e', '2024-03-29', '550e8400-e29b-41d4-a716-446655440001', 4100000, 'Sumbangan Jumat Maret Week 4', 'Sumbangan jamaah minggu keempat Maret', NULL, '123e4567-e89b-12d3-a456-426614174000', '2024-03-29 14:30:00+00', '2024-03-29 14:30:00+00');