import { DataTypes, Model, Sequelize } from "sequelize";

export class Friend extends Model {
  public id!: number;
  public userId!: number;
  public friendId!: number;
}

export default (sequelize: Sequelize) => {
  Friend.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      friendId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "friends",
      timestamps: false,
    }
  );

  return Friend;
};
