-- ==========================================
-- SCRIPT DE CONFIGURACIÓN COMPLETA DE BASE DE DATOS
-- ==========================================
-- Ejecutar este script en una base de datos limpia o nueva.

-- 1. Limpieza (Cuidado: Borra datos existentes si se ejecuta en una DB en uso)
DROP TABLE IF EXISTS publication_images CASCADE;
DROP TABLE IF EXISTS contacts CASCADE;
DROP TABLE IF EXISTS users CASCADE;
DROP TABLE IF EXISTS publications CASCADE;
DROP TYPE IF EXISTS publication_category CASCADE;

-- 2. Crear ENUM para categorías
CREATE TYPE publication_category AS ENUM ('VEHICULO', 'MAQUINARIA', 'HERRAMIENTA');

-- 3. Crear Tabla de Usuarios
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Crear Tabla Genérica de Publicaciones
CREATE TABLE publications (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    price DECIMAL(15, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'USD',
    description TEXT,
    category publication_category NOT NULL,
    specs JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Crear Tabla de Imágenes Asociadas
CREATE TABLE publication_images (
  id SERIAL PRIMARY KEY,
  publication_id INT NOT NULL REFERENCES publications(id) ON DELETE CASCADE,
  image_path TEXT NOT NULL,
  is_cover BOOLEAN DEFAULT FALSE,
  position INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Crear Tabla de Contactos
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 7. Crear Índices para Optimización
CREATE INDEX idx_publications_category ON publications(category);
CREATE INDEX idx_contacts_email ON contacts(email);
CREATE INDEX idx_publication_images_publication_id ON publication_images(publication_id);
CREATE INDEX idx_publications_specs ON publications USING GIN (specs);

-- ==========================================
-- FIN DEL SCRIPT
-- ==========================================
