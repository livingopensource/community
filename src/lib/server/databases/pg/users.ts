import { Model, DataTypes } from "sequelize";
import { DBConn } from "./init";

class User extends Model {
  static getByEmail(email: string) {
    return User.findOne({where : {
      email: email
    }})
  }
}

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

class Session extends Model {
  static getUser(sessionId: string) {
    return Session.findOne({
      where: {
        session: sessionId
      },
      include: [
        {
          model: User
        }
      ]
    })
  }

  static deleteSession(sessionId: string) {
    return Session.destroy({
      where: {
        session: sessionId
      }
    });
  }
}

const session = Session.init({
  id: { 
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  session: {
    type: DataTypes.UUID,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4
  }
},{
  sequelize: DBConn,
  modelName: 'Session',
  tableName: "sessions"
});

Session.belongsTo(User)

export {user as User}
export {session as Session}