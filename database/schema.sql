-- Crear tabla vehicles
CREATE TABLE vehicles (
  id SERIAL PRIMARY KEY,
  brand VARCHAR(100) NOT NULL,
  model VARCHAR(100) NOT NULL,
  year INT NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  image_url TEXT NOT NULL,
  description TEXT NOT NULL,
  
  -- Especificaciones Técnicas
  motor VARCHAR(100),
  potencia VARCHAR(50),
  torque VARCHAR(50),
  combustible VARCHAR(50),
  transmision VARCHAR(50),
  traccion VARCHAR(50),
  
  -- Consumo
  consumo_urbano VARCHAR(50),
  consumo_ruta VARCHAR(50),
  consumo_mixto VARCHAR(50),
  
  -- Dimensiones
  largo VARCHAR(50),
  ancho VARCHAR(50),
  alto VARCHAR(50),
  peso VARCHAR(50),
  
  -- Capacidades
  cilindrada VARCHAR(50),
  aceleracion VARCHAR(50),
  velocidad_maxima VARCHAR(50),
  tanque VARCHAR(50),
  maletero VARCHAR(50),
  pasajeros INT DEFAULT 5,
  
  -- Equipamiento (JSON Array)
  equipamiento JSONB DEFAULT '[]'::jsonb,
  
  -- Características de Seguridad
  seguridad JSONB DEFAULT '[]'::jsonb,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla users
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50) DEFAULT 'user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear tabla contacts
CREATE TABLE contacts (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Crear índices para optimizar búsquedas
CREATE INDEX idx_vehicles_brand ON vehicles(brand);
CREATE INDEX idx_contacts_email ON contacts(email);
