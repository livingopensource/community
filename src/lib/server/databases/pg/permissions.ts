import { Model, DataTypes } from "sequelize";
import { DBConn } from "./init";

class Permission extends Model {}

Permission.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {type: DataTypes.STRING}
    },
    {
        sequelize: DBConn,
        modelName: 'Permission',
        tableName: 'permissions'
    }
);