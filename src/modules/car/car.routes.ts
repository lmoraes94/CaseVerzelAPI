import { Request, Response, Router } from "express";
import multer from "multer";
import multerConfig from "../../config/multerConfig";
import CarController from "./car.controller";
import Authorization from "../../middlewares/Authorization";

const routes = Router();
const authorization = new Authorization();
const carController = new CarController();

routes.post(
  "/cars",
  authorization.ensureIsAuthenticated,
  (req: Request, res: Response) => carController.store(req, res)
);

routes.get("/cars", (req: Request, res: Response) =>
  carController.index(req, res)
);

routes.get(
  "/cars/:id",
  authorization.ensureIsAuthenticated,
  (req: Request, res: Response) => carController.findOne(req, res)
);

routes.patch(
  "/cars/:id/image",
  authorization.ensureIsAuthenticated,
  multer(multerConfig).single("image"),
  (req: Request, res: Response) => carController.updateImage(req, res)
);

routes.patch(
  "/cars/:id/remove-image",
  authorization.ensureIsAuthenticated,
  (req: Request, res: Response) => carController.removeImage(req, res)
);

routes.put(
  "/cars/:id",
  authorization.ensureIsAuthenticated,
  (req: Request, res: Response) => carController.update(req, res)
);

routes.delete(
  "/cars/:id",
  authorization.ensureIsAuthenticated,
  (req: Request, res: Response) => carController.destroy(req, res)
);

export default routes;
