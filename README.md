# Griin_API
Griin develop API

- Para correr la API en local hay que hacer un "npm install" y para correrla "npm run dev"
- asegurarse de correr una vez la API con "force: true" en la instacia de sequelize en index.js para crear las tablas en la base de datos
- Para correr el seed de etf y portafolios primero se tiene que ir a index.js y cambiar el "force:true a false" y despues  se usa el comando "npx sequelize-cli db:seed:all" 
