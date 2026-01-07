const bcrypt = require("bcryptjs");
const { Pool } = require("pg");
require("dotenv").config();

// Configurar conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "catalogo_autos",
});

// Usuarios de prueba predeterminados
const testUsers = [
  {
    email: "admin@catalogo.com",
    password: "admin123",
    name: "Administrador",
    role: "admin",
  },
  {
    email: "usuario1@example.com",
    password: "usuario123",
    name: "Usuario de Prueba 1",
    role: "user",
  },
  {
    email: "usuario2@example.com",
    password: "usuario123",
    name: "Usuario de Prueba 2",
    role: "user",
  },
];

async function createTestUsers() {
  try {
    console.log("🔐 Creando usuarios de prueba...\n");

    for (const user of testUsers) {
      // Encriptar contraseña
      const hashedPassword = await bcrypt.hash(user.password, 10);

      // Verificar si el usuario ya existe
      const existingUser = await pool.query(
        "SELECT id FROM users WHERE email = $1",
        [user.email]
      );

      if (existingUser.rows.length > 0) {
        console.log(`⚠️  Usuario ${user.email} ya existe, omitiendo...`);
        continue;
      }

      // Crear usuario
      const result = await pool.query(
        "INSERT INTO users (email, password, name, role) VALUES ($1, $2, $3, $4) RETURNING id, email, name, role",
        [user.email, hashedPassword, user.name, user.role]
      );

      const createdUser = result.rows[0];
      console.log(`✅ Usuario creado exitosamente:`);
      console.log(`   📧 Email: ${createdUser.email}`);
      console.log(`   👤 Nombre: ${createdUser.name}`);
      console.log(`   🔑 Rol: ${createdUser.role}`);
      console.log(`   🔐 Contraseña temporal: ${user.password}\n`);
    }

    console.log("✨ ¡Proceso completado!");
    console.log("\n📋 Usuarios creados:");
    console.log("   • admin@catalogo.com (contraseña: admin123)");
    console.log("   • usuario1@example.com (contraseña: usuario123)");
    console.log("   • usuario2@example.com (contraseña: usuario123)");
  } catch (err) {
    console.error("❌ Error al crear usuarios:", err);
  } finally {
    await pool.end();
  }
}

// Ejecutar
createTestUsers();
