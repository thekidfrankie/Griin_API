export const configs = {
  db: {
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD || "root",
    host: process.env.DB_HOST || "localhost",
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_DATABASE || "griin_dev",
  },
  jwt: {
    secret: process.env.JWT_SECRET || "bezkoder-secret-key",
    jwtExpiration: process.env.JWT_EXPIRATION || 3600,           // 1 hour
    jwtRefreshExpiration: process.env.JWT_REFRESH || 86400,   // 24 hours
  }
};
