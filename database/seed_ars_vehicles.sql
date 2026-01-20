-- SQL para cargar 25 vehículos con precios en pesos argentinos (ARS) e información detallada
-- Incluye publicaciones e imágenes de prueba

SET client_encoding TO 'UTF8';

BEGIN;

-- Limpiar publicaciones de prueba anteriores en ARS para evitar duplicados y corregir encoding
DELETE FROM publication_images WHERE publication_id IN (SELECT id FROM publications WHERE currency = 'ARS');
DELETE FROM publications WHERE currency = 'ARS';

-- Insertar publicaciones
INSERT INTO publications (title, price, currency, description, category, specs) VALUES
('Toyota Hilux SRX 4x4 AT', 78500000.00, 'ARS', 'La pickup más vendida. Versión tope de gama SRX, tracción 4x4, caja automática. Único dueño, service oficial.', 'VEHICULO', '{"brand": "Toyota", "model": "Hilux", "year": 2023, "km": 15000, "transmision": "Automática", "combustible": "Diesel", "motor": "2.8 TD", "potencia": "204 CV"}'),
('Volkswagen Amarok V6 Extreme', 88900000.00, 'ARS', 'Máxima potencia en su segmento. Motor V6, llantas de 20 pulgadas, tapizado de cuero, excelente estado.', 'VEHICULO', '{"brand": "Volkswagen", "model": "Amarok", "year": 2022, "km": 28000, "transmision": "Automática", "combustible": "Diesel", "motor": "3.0 V6", "potencia": "258 CV"}'),
('Ford Ranger Limited Plus', 75200000.00, 'ARS', 'Nueva generación de Ranger. Tecnología de punta, assistentes de conducción, pantalla de 12 pulgadas.', 'VEHICULO', '{"brand": "Ford", "model": "Ranger", "year": 2024, "km": 5000, "transmision": "Automática", "combustible": "Diesel", "motor": "3.0 V6", "potencia": "250 CV"}'),
('Fiat Cronos Precision 1.3', 28500000.00, 'ARS', 'El auto más elegido por los argentinos. Bajo consumo, ideal para ciudad, muy bien cuidado.', 'VEHICULO', '{"brand": "Fiat", "model": "Cronos", "year": 2023, "km": 12000, "transmision": "Manual", "combustible": "Nafta", "motor": "1.3 GSE", "potencia": "99 CV"}'),
('Peugeot 208 Feline Tiptronic', 34800000.00, 'ARS', 'Diseño sofisticado y i-Cockpit. Techo panorámico, cámara 180 grados, ayudas a la conducción.', 'VEHICULO', '{"brand": "Peugeot", "model": "208", "year": 2023, "km": 10500, "transmision": "Automática", "combustible": "Nafta", "motor": "1.6 VTi", "potencia": "115 CV"}'),
('Toyota Corolla SEG Hybrid', 48200000.00, 'ARS', 'Sedán líder mundial con tecnología híbrida. Consumo bajísimo, confort de marcha insuperable.', 'VEHICULO', '{"brand": "Toyota", "model": "Corolla", "year": 2022, "km": 35000, "transmision": "e-CVT", "combustible": "Híbrido", "motor": "1.8 Hybrid", "potencia": "122 CV"}'),
('Chevrolet Cruze Premier II', 32500000.00, 'ARS', 'Fabricación nacional con motor turbo. Excelente torque, sistema OnStar, Wi-Fi integrado.', 'VEHICULO', '{"brand": "Chevrolet", "model": "Cruze", "year": 2021, "km": 42000, "transmision": "Automática", "combustible": "Nafta", "motor": "1.4 Turbo", "potencia": "153 CV"}'),
('Jeep Compass Limited Plus 4x4', 62400000.00, 'ARS', 'SUV premium con ADN Jeep. Sonido Beats, techo corredizo doble, tracción inteligente.', 'VEHICULO', '{"brand": "Jeep", "model": "Compass", "year": 2022, "km": 24000, "transmision": "Automática", "combustible": "Nafta", "motor": "1.3 T270", "potencia": "175 CV"}'),
('Volkswagen Taos Highline', 52100000.00, 'ARS', 'SUV producido en Argentina. Seguridad 5 estrellas Latin NCAP, gran espacio interior.', 'VEHICULO', '{"brand": "Volkswagen", "model": "Taos", "year": 2023, "km": 18000, "transmision": "Automática", "combustible": "Nafta", "motor": "1.4 TSI", "potencia": "150 CV"}'),
('Nissan Frontier Pro-4X', 71800000.00, 'ARS', 'Edición especial Pro-4X. Suspensión reforzada, diseño exclusivo, bloqueo de diferencial.', 'VEHICULO', '{"brand": "Nissan", "model": "Frontier", "year": 2023, "km": 12500, "transmision": "Automática", "combustible": "Diesel", "motor": "2.3 Bi-Turbo", "potencia": "190 CV"}'),
('Honda HR-V EXL', 44500000.00, 'ARS', 'Confiabilidad Honda. Sistema Magic Seats para carga versátil, calidad de terminación japonesa.', 'VEHICULO', '{"brand": "Honda", "model": "HR-V", "year": 2021, "km": 48000, "transmision": "CVT", "combustible": "Nafta", "motor": "1.8 i-VTEC", "potencia": "140 CV"}'),
('Toyota SW4 SRX 7 Asientos', 92000000.00, 'ARS', 'La SUV todoterreno por excelencia. Capacidad para 7 pasajeros, confort y robustez absoluta.', 'VEHICULO', '{"brand": "Toyota", "model": "SW4", "year": 2023, "km": 9000, "transmision": "Automática", "combustible": "Diesel", "motor": "2.8 TD", "potencia": "204 CV"}'),
('Citroen C3 VTi 115 Feel Pack', 24200000.00, 'ARS', 'Nuevo C3 con actitud SUV. Pantalla de 10 pulgadas, cómodo y ágil para el uso diario.', 'VEHICULO', '{"brand": "Citroen", "model": "C3", "year": 2024, "km": 3000, "transmision": "Manual", "combustible": "Nafta", "motor": "1.6 VTi", "potencia": "115 CV"}'),
('Ford Territory Titanium', 58500000.00, 'ARS', 'Crossover de lujo con máxima tecnología. Control crucero adaptativo, estacionamiento autónomo.', 'VEHICULO', '{"brand": "Ford", "model": "Territory", "year": 2023, "km": 14000, "transmision": "Automática", "combustible": "Nafta", "motor": "1.8 Turbo", "potencia": "185 CV"}'),
('Renault Stepway Intens', 26800000.00, 'ARS', 'Mecánica confiable y bajo mantenimiento. Mayor despeje del suelo, ideal para nuestras calles.', 'VEHICULO', '{"brand": "Renault", "model": "Stepway", "year": 2022, "km": 31000, "transmision": "Manual", "combustible": "Nafta", "motor": "1.6 16v HR16", "potencia": "115 CV"}'),
('Mercedes-Benz C200 Avantgarde', 115000000.00, 'ARS', 'Sedán premium alemán. Lujo y distinción, caja de 9 marchas, luces LED inteligentes.', 'VEHICULO', '{"brand": "Mercedes-Benz", "model": "Clase C", "year": 2022, "km": 16000, "transmision": "Automática", "combustible": "Nafta", "motor": "2.0 Turbo", "potencia": "204 CV"}'),
('BMW 320i Sport Line', 122000000.00, 'ARS', 'Deportividad y elegancia. El sedán deportivo por referencia, tracción trasera, impecable.', 'VEHICULO', '{"brand": "BMW", "model": "Serie 3", "year": 2022, "km": 12000, "transmision": "Automática", "combustible": "Nafta", "motor": "2.0 Turbo", "potencia": "184 CV"}'),
('Audi A4 35 TFSI Stronic', 108000000.00, 'ARS', 'Virtual Cockpit, terminaciones de alta gama. Tecnología alemana y diseño atemporal.', 'VEHICULO', '{"brand": "Audi", "model": "A4", "year": 2021, "km": 25000, "transmision": "Automática", "combustible": "Nafta", "motor": "2.0 Turbo (MHEV)", "potencia": "150 CV"}'),
('Ram 1500 Laramie', 89000000.00, 'ARS', 'Potencia americana pura. Motor HEMI V8, capacidad de arrastre brutal, lujo interior excesivo.', 'VEHICULO', '{"brand": "Ram", "model": "1500", "year": 2022, "km": 36000, "transmision": "Automática", "combustible": "Nafta", "motor": "5.7 HEMI V8", "potencia": "395 CV"}'),
('Fiat Toro Freedom AT6', 36200000.00, 'ARS', 'Pickup compacta muy versátil. Gran equipamiento de serie, portón trasero de doble apertura.', 'VEHICULO', '{"brand": "Fiat", "model": "Toro", "year": 2022, "km": 41000, "transmision": "Automática", "combustible": "Nafta", "motor": "1.8 eTorQ", "potencia": "130 CV"}'),
('Volkswagen Gol Trend Trendline', 18500000.00, 'ARS', 'Un clásico que nunca falla. Repuestos económicos, noble y siempre buscado para reventa.', 'VEHICULO', '{"brand": "Volkswagen", "model": "Gol Trend", "year": 2019, "km": 68000, "transmision": "Manual", "combustible": "Nafta", "motor": "1.6 8v", "potencia": "101 CV"}'),
('Ford Ka SEL 1.5', 16500000.00, 'ARS', 'Pequeño gigante. Motor eficiente de 3 cilindros, control de estabilidad de serie, muy ágil.', 'VEHICULO', '{"brand": "Ford", "model": "Ka", "year": 2019, "km": 55000, "transmision": "Manual", "combustible": "Nafta", "motor": "1.5 Dragon", "potencia": "123 CV"}'),
('Renault Sandero Life', 19800000.00, 'ARS', 'Amplitud interior líder en su segmento. Ideal para familia pequeña o primer auto.', 'VEHICULO', '{"brand": "Renault", "model": "Sandero", "year": 2021, "km": 44000, "transmision": "Manual", "combustible": "Nafta", "motor": "1.6 16v", "potencia": "115 CV"}'),
('Hyundai Tucson 4WD Full', 56200000.00, 'ARS', 'SUV coreana de gran calidad. Tracción total, confiable y segura, muy equilibrada.', 'VEHICULO', '{"brand": "Hyundai", "model": "Tucson", "year": 2021, "km": 52000, "transmision": "Automática", "combustible": "Nafta", "motor": "2.0", "potencia": "155 CV"}'),
('Jeep Renegade Longitude', 39500000.00, 'ARS', 'Aventura en frasco chico. Estilo icónico Jeep, muy buen equipamiento de seguridad.', 'VEHICULO', '{"brand": "Jeep", "model": "Renegade", "year": 2023, "km": 15000, "transmision": "Automática", "combustible": "Nafta", "motor": "1.3 T270", "potencia": "175 CV"}');

-- Insertar imágenes de marcador de posición para cada publicación (opcional)
-- Como no tenemos las IDs exactas fácilmente sin una función, usamos una subconsulta para las últimas 25
-- o simplemente vinculamos algunas imágenes genéricas si existieran.
-- Usaremos una imagen genérica para que no queden vacíos en el catálogo.

INSERT INTO publication_images (publication_id, image_path, is_cover, position)
SELECT id, 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800', TRUE, 0
FROM publications 
WHERE id > (SELECT COALESCE(MAX(id), 0) FROM publications) - 25;

COMMIT;
