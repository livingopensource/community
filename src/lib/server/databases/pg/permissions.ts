import { Model, DataTypes } from "sequelize";
import { DBConn } from "./init";

class Permission extends Model {}

const permission = Permission.init(
    {
        id: { 
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
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


class Role extends Model {}

const role = Role.init(
    {
        id: { 
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
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

Role.hasMany(Permission)
Permission.belongsToMany(Role, {through: "permissions_roles"})
Role.belongsToMany(Permission, {through: "permissions_roles"})

export {role as Role}
export {permission as Permission}