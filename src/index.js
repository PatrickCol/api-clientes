import express from "express";
import usersRoutes from "./routes/users.routes.js";
import { PORT } from "./config.js";

const app = express();

// middlewares
app.use(express.json());
//app.use(express.urlencoded({ extended: false }));

app.use(usersRoutes);

app.listen(PORT);
// eslint-disable-next-line no-console
console.log("Server on port", PORT);