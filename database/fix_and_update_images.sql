-- Script COMPLETO para arreglar y actualizar imágenes en el servidor
-- Este script crea la tabla faltante Y actualiza los datos.

BEGIN;

-- ==========================================
-- 1. ACTUALIZACIÓN DE ESTRUCTURA (ESQUEMA)
-- ==========================================

-- Hacer que image_url sea opcional en la tabla vehicles (si no lo es ya)
ALTER TABLE vehicles ALTER COLUMN image_url DROP NOT NULL;

-- Crear tabla para almacenar múltiples imágenes (si no existe)
CREATE TABLE IF NOT EXISTS vehicle_images (
  id SERIAL PRIMARY KEY,
  vehicle_id INT NOT NULL REFERENCES vehicles(id) ON DELETE CASCADE,
  image_path TEXT NOT NULL,
  is_cover BOOLEAN DEFAULT FALSE,
  position INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para optimizar búsquedas
CREATE INDEX IF NOT EXISTS idx_vehicle_images_vehicle_id ON vehicle_images(vehicle_id);
CREATE INDEX IF NOT EXISTS idx_vehicle_images_is_cover ON vehicle_images(is_cover);


-- ==========================================
-- 2. ACTUALIZACIÓN DE DATOS (IMÁGENES)
-- ==========================================

-- Actualizar las URLs de las imágenes principales en la tabla vehicles
-- Volkswagen
UPDATE vehicles SET image_url = '/uploads/VolkswagenGolTrend.jpg' WHERE brand = 'Volkswagen' AND model = 'Gol Trend 1.6';
UPDATE vehicles SET image_url = '/uploads/VolkswagenPolo.jpg' WHERE brand = 'Volkswagen' AND model = 'Polo 1.6 MSI Comfortline';
UPDATE vehicles SET image_url = '/uploads/VolkswagenVirtus.jpg' WHERE brand = 'Volkswagen' AND model = 'Virtus 1.6 Highline';
UPDATE vehicles SET image_url = '/uploads/VolkswagenPassat.jpg' WHERE brand = 'Volkswagen' AND model = 'Passat 2.0 TSI Comfortline';
UPDATE vehicles SET image_url = '/uploads/VolkswagenAmarok.jpg' WHERE brand = 'Volkswagen' AND model = 'Amarok 2.0 TDI Highline';
UPDATE vehicles SET image_url = '/uploads/VolkswagenTcross.jpg' WHERE brand = 'Volkswagen' AND model = 'T-Cross 1.0 TSI Comfortline';
UPDATE vehicles SET image_url = '/uploads/VolkswagenTiguan.jpg' WHERE brand = 'Volkswagen' AND model = 'Tiguan 1.4 TSI Comfortline';
UPDATE vehicles SET image_url = '/uploads/VolkswagenJetta.jpg' WHERE brand = 'Volkswagen' AND model = 'Jetta 1.4 TSI Highline';

-- Ford
UPDATE vehicles SET image_url = '/uploads/FordfIESTA.jpg' WHERE brand = 'Ford' AND model = 'Fiesta 1.6 Titanium';
UPDATE vehicles SET image_url = '/uploads/FordfOCUS.jpg' WHERE brand = 'Ford' AND model = 'Focus 2.0 SE';
UPDATE vehicles SET image_url = '/uploads/FordMondeo.jpg' WHERE brand = 'Ford' AND model = 'Mondeo 2.0 Ecoboost Titanium';
UPDATE vehicles SET image_url = '/uploads/FordEcoSport.jpg' WHERE brand = 'Ford' AND model = 'EcoSport 1.5L SE';
UPDATE vehicles SET image_url = '/uploads/FordEdge.jpg' WHERE brand = 'Ford' AND model = 'Edge 2.0 Ecoboost Titanium';
UPDATE vehicles SET image_url = '/uploads/FordRanger.jpg' WHERE brand = 'Ford' AND model = 'Ranger 2.2L XLT';
UPDATE vehicles SET image_url = '/uploads/FordMustang.jpg' WHERE brand = 'Ford' AND model = 'Mustang 5.0L GT';
UPDATE vehicles SET image_url = '/uploads/FordeSCAPE.avif' WHERE brand = 'Ford' AND model = 'Escape 2.0L Titanium';

-- Fiat
UPDATE vehicles SET image_url = '/uploads/FiatArgo.jpg' WHERE brand = 'Fiat' AND model = 'Argo 1.3 Drive';
UPDATE vehicles SET image_url = '/uploads/FiatArgoHGT.jpg' WHERE brand = 'Fiat' AND model = 'Argo 1.8 HGT';
UPDATE vehicles SET image_url = '/uploads/FiatCronos.jpg' WHERE brand = 'Fiat' AND model = 'Cronos 1.3 Drive';
UPDATE vehicles SET image_url = '/uploads/FiatCronosPlus.jpg' WHERE brand = 'Fiat' AND model = 'Cronos 1.8 HGT Plus';
UPDATE vehicles SET image_url = '/uploads/FiatStrada.jpg' WHERE brand = 'Fiat' AND model = 'Strada 1.4 Working';
UPDATE vehicles SET image_url = '/uploads/FiatToro.jpg' WHERE brand = 'Fiat' AND model = 'Toro 2.0 AT9';
UPDATE vehicles SET image_url = '/uploads/Fiat500.jpg' WHERE brand = 'Fiat' AND model = '500 1.2 8v Pop';
UPDATE vehicles SET image_url = '/uploads/FiatX1H.jpg' WHERE brand = 'Fiat' AND model = 'X1H 1.4L Flex';

-- Renault
UPDATE vehicles SET image_url = '/uploads/RenaultKwid.jpg' WHERE brand = 'Renault' AND model = 'Kwid 1.0 Expression';
UPDATE vehicles SET image_url = '/uploads/RenaultSandero.jpg' WHERE brand = 'Renault' AND model = 'Sandero 1.6 Expression';
UPDATE vehicles SET image_url = '/uploads/RenaultMegane.jpg' WHERE brand = 'Renault' AND model = 'Megane 1.6 Zen';
UPDATE vehicles SET image_url = '/uploads/RenaultCaptur.jpg' WHERE brand = 'Renault' AND model = 'Captur 1.6 Expression';
UPDATE vehicles SET image_url = '/uploads/RenaultDuster.jpg' WHERE brand = 'Renault' AND model = 'Duster 1.6 Expression';
UPDATE vehicles SET image_url = '/uploads/RenaultKoleos.jpg' WHERE brand = 'Renault' AND model = 'Koleos 2.0 Intens';


-- ==========================================
-- 3. MIGRACIÓN DE DATOS (vehicle_images)
-- ==========================================

-- Migrar la imagen principal de cada vehículo a la nueva tabla vehicle_images
INSERT INTO vehicle_images (vehicle_id, image_path, is_cover, position)
SELECT id, image_url, TRUE, 0
FROM vehicles
WHERE image_url IS NOT NULL
-- Prevenir duplicados
AND NOT EXISTS (
    SELECT 1 
    FROM vehicle_images 
    WHERE vehicle_images.vehicle_id = vehicles.id
    AND vehicle_images.image_path = vehicles.image_url
);

COMMIT;

-- Verificación final
SELECT count(*) as total_imagenes_migradas FROM vehicle_images;
