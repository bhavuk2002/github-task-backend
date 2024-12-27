import { Sequelize } from "sequelize";
import User from "../models/User";
import Friend from "../models/Friend";
import dotenv from "dotenv";

dotenv.config();

const dbConfig = {
  host: process.env.DATABASE_HOST,
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
};

const sequelize = new Sequelize(
  dbConfig.database!,
  dbConfig.user!,
  dbConfig.password!,
  {
    host: dbConfig.host!,
    dialect: "mysql",
  }
);

const models = {
  User: User(sequelize),
  Friend: Friend(sequelize),
};

Object.values(models).forEach((model) => {
  if ("associate" in model) {
    (model as any).associate(models);
  }
});

export { sequelize, models };
