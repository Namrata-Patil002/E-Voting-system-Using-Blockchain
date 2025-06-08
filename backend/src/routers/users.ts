import { Router } from "express";
import notVerifiedController from "../controllers/users/not-verified";
import verifyController from "../controllers/users/verify";
import deleteController from "../controllers/users/delete";
import verifyOTPController from "../controllers/users/verifyotp";

const router = Router();

router.get("/all", notVerifiedController);
router.post("/verify", verifyController);
router.delete("/delete/:id", deleteController);
router.post("/otp/verify",verifyOTPController)

export default router;
