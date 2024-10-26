import { Model, DataTypes } from "sequelize";
import { DBConn } from "./init";
// import { Permission } from "./permissions";

class Role extends Model {}

Role.init(
    {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {type: DataTypes.STRING}
    },
    {
        sequelize: DBConn,
        modelName: 'Role',
        tableName: 'roles'
    }
);

// Role.Permission = Role.hasMany(Permission)