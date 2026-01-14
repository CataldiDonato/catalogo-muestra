-- Datos de prueba para publications (Vehículos, Maquinaria)

INSERT INTO publications (title, price, currency, description, category, specs) VALUES
('Toyota Hilux 2024', 45000, 'USD', 'Camioneta 4x4 doble cabina', 'VEHICULO', 
    '{
        "anio": 2024,
        "km": 0,
        "transmision": "Automática",
        "combustible": "Diesel",
        "motor": "2.8L Turbo",
        "potencia": "204 HP",
        "traccion": "4x4"
    }'::jsonb),
    
('Ford Ranger Raptor', 58000, 'USD', 'La pick-up más potente', 'VEHICULO', 
    '{
        "anio": 2023,
        "km": 5000,
        "transmision": "Automática 10 vel",
        "combustible": "Nafta",
        "motor": "3.0L V6 EcoBoost",
        "potencia": "397 HP",
        "traccion": "4x4"
    }'::jsonb),

('John Deere 6155M', 120000, 'USD', 'Tractor de alta potencia', 'MAQUINARIA', 
    '{
        "anio": 2022,
        "horas": 500,
        "potencia": "155 HP",
        "traccion": "4WD",
        "cabina": "Premium"
    }'::jsonb),

('Cosechadora New Holland CR7.90', 450000, 'USD', 'Alta capacidad de cosecha', 'MAQUINARIA', 
    '{
        "anio": 2023,
        "horas": 200,
        "cabezal": "35 pies"
    }'::jsonb),

('Juego de Llaves Combinadas', 150, 'USD', 'Set de 24 piezas acero cromo vanadio', 'HERRAMIENTA', 
    '{
        "condicion": "Nuevo",
        "marca": "Bahco",
        "piezas": 24
    }'::jsonb);

-- Imágenes de prueba
INSERT INTO publication_images (publication_id, image_path, is_cover, position) VALUES
(1, '/uploads/hilux.jpg', true, 0),
(2, '/uploads/ranger.jpg', true, 0),
(3, '/uploads/tractor.jpg', true, 0),
(4, '/uploads/cosechadora.jpg', true, 0),
(5, '/uploads/herramientas.jpg', true, 0);
