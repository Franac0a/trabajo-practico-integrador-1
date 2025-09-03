import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.HOST || "localhost",
    dialect: process.env.DB_DIALECT || "mysql",
  }
);

export const startDb = async () => {
  try {
    await sequelize.authenticate();

    await sequelize.sync(); //({ force: true });
    console.log("Se establecio conexion con la base de datos");
  } catch (error) {
    console.log(error);
    console.log("Error al conectar la base de datos");
  }
};
