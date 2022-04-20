import app from "./app.js";
import { sequelize } from "./database/database.js";

async function main() {
  await sequelize.sync({force: false});
  app.listen(4000);
  console.log("Server on port 4000");
  // handling errors
  app.use((err, req, res, next) => {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  });
}

main();