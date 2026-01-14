-- Script para actualizar imágenes en el servidor
-- Ejecutar en su herramienta de administración de base de datos (pgAdmin, DBeaver, etc.)

BEGIN;

-- 1. Actualizar las URLs de las imágenes principales en la tabla vehicles
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


-- 2. Configurar la tabla vehicle_images (Soporte para múltiples imágenes)
-- Esto migra la imagen principal de cada vehículo a la nueva tabla vehicle_images
INSERT INTO vehicle_images (vehicle_id, image_path, is_cover, position)
SELECT id, image_url, TRUE, 0
FROM vehicles
WHERE image_url IS NOT NULL
-- El siguiente chequeo previene duplicados si se corre el script varias veces
AND NOT EXISTS (
    SELECT 1 
    FROM vehicle_images 
    WHERE vehicle_images.vehicle_id = vehicles.id
    AND vehicle_images.image_path = vehicles.image_url
);

COMMIT;

-- Verificación final
SELECT v.brand, v.model, COUNT(vi.id) as image_count
FROM vehicles v
LEFT JOIN vehicle_images vi ON v.id = vi.vehicle_id
GROUP BY v.id, v.brand, v.model
ORDER BY v.brand, v.model;
