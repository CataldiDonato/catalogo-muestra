const { Client } = require("pg");

async function resetDatabase() {
  const client = new Client({
    user: "postgres",
    password: "donato",
    host: "localhost",
    port: 5432,
  });

  try {
    await client.connect();
    console.log("Conectado a PostgreSQL");

    // Terminar todas las conexiones a la base de datos
    await client.query(`
      SELECT pg_terminate_backend(pg_stat_activity.pid)
      FROM pg_stat_activity
      WHERE pg_stat_activity.datname = 'catalogo_autos'
      AND pid <> pg_backend_pid();
    `);

    // Eliminar la base de datos
    await client.query("DROP DATABASE IF EXISTS catalogo_autos;");
    console.log("✓ Base de datos eliminada");

    await client.end();
    console.log("Script completado");
    process.exit(0);
  } catch (err) {
    console.error("Error:", err.message);
    process.exit(1);
  }
}

resetDatabase();
