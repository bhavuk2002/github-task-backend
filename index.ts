import app from "./app";
import { sequelize } from "./config/database";

const port: number = 3000;

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Database syncronised.");
  })
  .catch((error) => {
    console.error("Error creating table:", error);
  });

app.listen(port, () => {
  console.log(`Server up on port: ${port}`);
});
