const { Client } = require("pg");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

// Configurar cliente PostgreSQL
const adminClient = new Client({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
});

const dbClient = new Client({
  user: process.env.DB_USER || "postgres",
  password: process.env.DB_PASSWORD || "password",
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 5432,
  database: process.env.DB_NAME || "catalogo_autos",
});

// Función para leer archivos SQL
const readSQLFile = (filename) => {
  const filePath = path.join(__dirname, "..", "database", filename);
  return fs.readFileSync(filePath, "utf8");
};

// Función para inicializar la base de datos
const initializeDatabase = async () => {
  try {
    console.log("🔄 Verificando base de datos...");

    // Conectar con admin
    await adminClient.connect();
    console.log("✓ Conectado al servidor PostgreSQL");

    // Verificar si la base de datos existe
    const dbCheck = await adminClient.query(
      `SELECT 1 FROM pg_database WHERE datname = $1`,
      [process.env.DB_NAME || "catalogo_autos"]
    );

    if (dbCheck.rows.length === 0) {
      console.log("📦 Creando base de datos...");
      await adminClient.query(
        `CREATE DATABASE "${process.env.DB_NAME || "catalogo_autos"}"`
      );
      console.log("✓ Base de datos creada");
    } else {
      console.log("✓ Base de datos ya existe");
    }

    await adminClient.end();

    // Conectar a la base de datos
    await dbClient.connect();
    console.log("✓ Conectado a la base de datos");

    // Verificar si la tabla vehicles existe
    const tableCheck = await dbClient.query(
      `SELECT 1 FROM information_schema.tables WHERE table_name = 'vehicles'`
    );

    if (tableCheck.rows.length === 0) {
      console.log("📋 Creando esquema de base de datos...");
      const schemaSQL = readSQLFile("schema.sql");
      await dbClient.query(schemaSQL);
      console.log("✓ Esquema creado");

      console.log("📚 Cargando datos de prueba...");
      const seedSQL = readSQLFile("seed.sql");
      await dbClient.query(seedSQL);
      console.log("✓ Datos cargados (12 vehículos)");
    } else {
      console.log("✓ Tablas ya existen");

      // Verificar si hay datos
      const dataCheck = await dbClient.query("SELECT COUNT(*) FROM vehicles");
      const count = dataCheck.rows[0].count;

      if (count === 0) {
        console.log("📚 Cargando datos de prueba...");
        const seedSQL = readSQLFile("seed.sql");
        await dbClient.query(seedSQL);
        console.log("✓ Datos cargados (12 vehículos)");
      } else {
        console.log(`✓ Base de datos lista (${count} vehículos)`);
      }
    }

    await dbClient.end();
    console.log("✅ Base de datos inicializada correctamente\n");
    return true;
  } catch (err) {
    console.error("❌ Error al inicializar la base de datos:", err.message);
    try {
      await adminClient.end();
    } catch (e) {}
    try {
      await dbClient.end();
    } catch (e) {}
    return false;
  }
};

module.exports = initializeDatabase;
