import { Router } from "express";
import generalMiddleware from "../middleware/general.middleware";
import EmailController from "../controllers/emailAuth.controller";

const router = Router();
const module = "email";

// router.post(
//   "/",
//   generalMiddleware.controllerWrapper(
//     ChatController.checkRoomExist,
//     "Error creating feedback"
//   )
// );

// router.post(
//   "/send",
//   generalMiddleware.controllerWrapper(
//     ChatController.sendMessage,
//     "Error Fetching feedbacks"
//   )
// );

router.get(
  "/",
  generalMiddleware.controllerWrapper(
    EmailController.generateAuthUrl,
    "Error Fetching feedbacks"
  )
);

router.get(
  "/callback",
  generalMiddleware.controllerWrapper(
    EmailController.callbackResponse,
    "Error Fetching feedbacks"
  )
);

export { module, router };
