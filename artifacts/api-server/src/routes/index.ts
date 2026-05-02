import { Router, type IRouter } from "express";
import healthRouter from "./health";
import paymobRouter from "./paymob";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/paymob", paymobRouter);

export default router;
