-- Limpiar datos previos
DELETE FROM vehicles;

-- Insertar autos de prueba
INSERT INTO vehicles (brand, model, year, price, image_url, description, motor, potencia, torque, combustible, transmision, traccion, consumo_urbano, consumo_ruta, consumo_mixto, largo, ancho, alto, peso, cilindrada, aceleracion, velocidad_maxima, tanque, maletero, pasajeros, equipamiento, seguridad) VALUES
('Volkswagen', 'Gol', 2024, 18500, 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=2070', 'Auto test', '1.6L', '101 HP', '155 Nm', 'Nafta', 'Manual', 'Delantera', '8.2', '12.1', '9.8', '4.29m', '1.70m', '1.48m', '1150kg', '1598cc', '9.8s', '190', '50L', '285L', 5, '["Dir. Asistida","Cierre Centralizado","Espejos Elect.","Aire"]'::jsonb, '["ABS","Bolsas de Aire","Control Tracción"]'::jsonb);
