import { DataTypes, Model, Sequelize } from "sequelize";

export class User extends Model {
  public id!: number;
  public username!: string;
  public avatar_url!: string;
  public location!: string | null;
  public blog!: string | null;
  public bio!: string | null;
  public public_repos!: number;
  public public_gists!: number;
  public followers!: number;
  public following!: number;
  public createdAt!: Date;
  public updatedAt!: Date;
  public deletedAt!: Date;
}

export default (sequelize: Sequelize) => {
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
      },
      avatar_url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      location: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      blog: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      bio: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      public_repos: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      public_gists: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      followers: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      following: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "users",
      timestamps: true,
      paranoid: true, // Enables soft delete with deletedAt field
    }
  );

  return User;
};
