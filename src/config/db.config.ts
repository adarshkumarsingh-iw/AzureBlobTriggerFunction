// import { Sequelize, Dialect, Model, DataTypes } from "sequelize";

// class ConfigurationService {
//   connect() {
//     const hostName = process.env.PG_HOST;
//     const userName = process.env.PG_USER;
//     const password = process.env.PASSWORD;
//     const database = process.env.PG_DATABASE;
//     const dialect = process.env.PG_DIALECT as Dialect;

//     console.log("dialect ", dialect);
//     console.log("database ", database);

//     const sequelize = new Sequelize(database, userName, password, {
//       host: hostName,
//       dialect: dialect,
//       pool: {
//         max: 10,
//         min: 0,
//         acquire: 20000,
//         idle: 5000,
//       },
//     });
//     const db: any = {};
//     db.Sequelize = Sequelize;
//     db.sequelize = sequelize;
//     // connect with model
//     return db;
//   }
// }
// export default ConfigurationService;
