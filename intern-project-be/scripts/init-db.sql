-- Initialization script untuk database
-- Script ini akan dijalankan otomatis saat container postgres pertama kali dibuat

-- Create extension untuk UUID support (optional)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- STUDENTS TABLE
-- ============================================

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id BIGSERIAL PRIMARY KEY,
    nomor_induk VARCHAR(20) NOT NULL UNIQUE,
    nama_depan VARCHAR(100) NOT NULL,
    nama_belakang VARCHAR(100),
    tanggal_lahir DATE NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for performance
CREATE UNIQUE INDEX IF NOT EXISTS idx_nomor_induk ON students(nomor_induk);
CREATE INDEX IF NOT EXISTS idx_nama_depan ON students(nama_depan);
CREATE INDEX IF NOT EXISTS idx_nama_belakang ON students(nama_belakang);
CREATE INDEX IF NOT EXISTS idx_tanggal_lahir ON students(tanggal_lahir);

-- Insert sample student data
INSERT INTO students (nomor_induk, nama_depan, nama_belakang, tanggal_lahir, created_at, updated_at) VALUES
    ('2026001', 'Budi', 'Santoso', '2004-03-15', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('2026002', 'Siti', 'Nurhaliza', '2005-07-22', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('2026003', 'Ahmad', 'Fauzi', '2004-11-10', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('2026004', 'Dewi', 'Lestari', '2005-01-18', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('2026005', 'Rudi', NULL, '2004-09-05', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('2026006', 'Maya', 'Putri', '2005-04-30', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('2026007', 'Andi', 'Wijaya', '2004-12-20', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP),
    ('2026008', 'Rina', 'Kusuma', '2005-06-14', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
ON CONFLICT (nomor_induk) DO NOTHING;

-- ============================================
-- GRANT PERMISSIONS
-- ============================================

-- Grant all privileges to internuser
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO internuser;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO internuser;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO internuser;
