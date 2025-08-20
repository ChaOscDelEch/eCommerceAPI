import { register, login, logout } from "#controllers";
import { Router } from "express";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/login', login);
authRouter.post('/logout', logout);

export default authRouter;