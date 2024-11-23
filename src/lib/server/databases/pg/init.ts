import { Sequelize } from "sequelize";
import { env } from '$env/dynamic/private';

const sequelize = new Sequelize(env.DBName, env.User, env.Password, {
    host: env.Host,
    dialect: 'postgres',
    ssl: true,
    native: true,
})

export {sequelize as DBConn}