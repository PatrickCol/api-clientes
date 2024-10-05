import pg from "pg";

export const pool = new pg.Pool({
  user: "postgres",
  host: "54.158.142.164",
  password: "Utec",
  database: "clientes",
  port: "5432",
});
