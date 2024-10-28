import { Model, DataTypes } from "sequelize";
import { DBConn } from "./init";

class Membership extends Model {}

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
    description: {type: DataTypes.STRING},
    amount: {type: DataTypes.DOUBLE, allowNull: false},
    currency: {type: DataTypes.STRING, allowNull: false},
    period: {type: DataTypes.INTEGER, allowNull: false, defaultValue: 12, comment: "Time period in months"}
},{
    sequelize: DBConn,
    modelName: 'Membership',
    tableName: "memberships"
});

class Subscription extends Model {}

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
    status: {type: DataTypes.STRING},
    reason: {type: DataTypes.STRING}
},{
    sequelize: DBConn,
    modelName: 'Subscription',
    tableName: "subscriptions"
});

Membership.hasOne(Subscription)

export {membership as Membership}
export {subscription as Subscription}