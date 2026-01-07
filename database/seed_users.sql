-- Inicializar tabla de usuarios con un usuario de prueba
-- NOTA: Este archivo es opcional, se puede usar para agregar usuarios manualmente

-- Hash de la contraseña "admin123" encriptada con bcryptjs
-- Puedes generar tus propios hashes usando: bcrypt.hash('tu_contraseña', 10)

INSERT INTO users (email, password, name, role) VALUES
('admin@catalogo.com', '$2a$10$example_hash_bcrypt_here', 'Administrador', 'admin'),
('usuario1@example.com', '$2a$10$example_hash_bcrypt_here', 'Usuario de Prueba 1', 'user'),
('usuario2@example.com', '$2a$10$example_hash_bcrypt_here', 'Usuario de Prueba 2', 'user')
ON CONFLICT (email) DO NOTHING;

-- Para generar los hashes correctos, ejecuta este código Node.js:
-- const bcrypt = require('bcryptjs');
-- bcrypt.hash('contraseña_aqui', 10).then(hash => console.log(hash));

-- Contraseñas de ejemplo para usuarios de prueba:
-- admin@catalogo.com -> contraseña: admin123
-- usuario1@example.com -> contraseña: usuario123
-- usuario2@example.com -> contraseña: usuario123
