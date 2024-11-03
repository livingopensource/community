import { Model, DataTypes } from "sequelize";
import { DBConn } from "./init";
import { User } from "./users";

class Membership extends Model {
    static getMembershipDetails(name: string) {
        return Membership.findOne({
            where: {
                name: name
            }
        })
    }

    static getMembership(id: string) {
        return Membership.findOne({
            where: {
                id: id
            }
        })
    }

    static getAllMemberships() {
        return Membership.findAll()
    }
}

const membership = Membership.init({
    id: { 
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    subTitle: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
    amount: {type: DataTypes.DOUBLE, allowNull: false},
    currency: {type: DataTypes.STRING, allowNull: false},
    period: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 12, comment: "Time period in months"}
},{
    sequelize: DBConn,
    modelName: 'Membership',
    tableName: "memberships"
});

class Subscription extends Model {
    static getUserActiveSubscriptions(userId: string) {
        return Subscription.findAll({
            where: {
                UserId: userId,
                paid: true
            }
        })
    }

    static createSubscription(userId: string, membershipId: string, amount: number, currency: string, paymentMethod: string, transactionId: string, status: string, reason: string) {
        return Subscription.create({
            UserId: userId,
            MembershipId: membershipId,
            amount: amount,
            currency: currency,
            paymentMethod: paymentMethod,
            transactionId: transactionId,
            status: status,
            reason: reason
        })
    }

    static getUserSubscriptions(userId: string)  {
        return Subscription.findAll({
            where: {
                UserId: userId
            }
        })
    }
}

const subscription = Subscription.init({
    id: { 
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    amount: {type: DataTypes.DOUBLE, allowNull: false},
    currency: {type: DataTypes.STRING, allowNull: false},
    paid: {type: DataTypes.BOOLEAN, defaultValue: false},
    paymentMethod: {type: DataTypes.STRING},
    transactionId: {type: DataTypes.STRING},
    externalTransactionId: {type: DataTypes.STRING},
    status: {type: DataTypes.STRING},
    reason: {type: DataTypes.STRING}
},{
    defaultScope: {
        include: {
            model: Membership
        }
    },
    sequelize: DBConn,
    modelName: 'Subscription',
    tableName: "subscriptions"
});

Subscription.belongsTo(Membership)
Subscription.belongsTo(User)

export {membership as Membership}
export {subscription as Subscription}