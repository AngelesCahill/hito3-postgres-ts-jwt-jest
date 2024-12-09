import "dotenv/config";
import app from "./app";
import { db } from "./config/connection.db";

const port = process.env.PORT || 3000;

const main = async () => {
  try {
    const { rows } = await db.query("SELECT NOW()");
    console.log(rows[0].now, "db conectada!");
    app.listen(port, () => {
      console.log("Servidor andando en el puerto: " + port);
    });
  } catch (error) {
    console.log(error);
  }
};

main();