import pg from 'pg'
import  {configs}  from "./config.js";
const db = configs.db;
const pool = new pg.Pool({
  user: db.user,
  password: db.password,
  host: db.host,
  port: db.port,
  database: db.database,
});

export default pool
