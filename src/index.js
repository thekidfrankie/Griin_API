import app from "./app.js";
import { sequelize } from "./database/database.js";
import "./models/modelsAsossiations.js"
async function main() {
  //https://sequelize.org/docs/v6/
  await sequelize.sync({force: true});
  app.listen(4000);
  console.log("Server on port 4000");
}

main();