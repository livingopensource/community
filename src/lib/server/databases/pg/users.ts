import { Model, DataTypes } from "sequelize";
import { DBConn } from "./init";

class User extends Model {}

const user = User.init(
    {
        id: { 
          type: DataTypes.UUID,
          defaultValue: DataTypes.UUIDV4,
          primaryKey: true,
        },
        firstName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        lastName: {
          type: DataTypes.STRING,
          allowNull: false
        },
        email: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false
        },
        resetToken: {type: DataTypes.STRING},
        active: {
          type: DataTypes.BOOLEAN, 
          defaultValue: true
        }
    },
    {
        sequelize: DBConn,
        modelName: 'User',
        tableName: 'users'
    },
);

export {user as User}