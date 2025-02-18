import Router from "express";
import { createUser } from "../controllers/user.controller.js";
import { Upload } from "../middlewares/multer.middleware.js";
const router = Router();

router
  .route("/register")
  .post(
    Upload.fields([
      {
        name: "profileImage",
        maxCount: 1,
      }
    ])
    ,createUser);

export default router;
