import express, { Application } from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import routerSetup from "./startup/routes";
import appSetup from "./startup/init";
import securitySetup from "./startup/security";

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

appSetup(app);
securitySetup(app, express);
routerSetup(app)

