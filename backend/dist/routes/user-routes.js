import { Router } from 'express';
import { getAllUsers, userlogin, userlogout, userSignup, verifyUser } from '../controllers/user-controllers.js';
import { loginValidator, signupValidator, validate } from '../utils/validators.js';
import { verifyToken } from '../utils/token-manager.js';
const userRoutes = Router();
userRoutes.get("/", getAllUsers);
userRoutes.post("/signup", validate(signupValidator), userSignup);
userRoutes.post("/login", validate(loginValidator), userlogin);
userRoutes.get("/auth-status", verifyToken, verifyUser);
userRoutes.get("/logout", verifyToken, userlogout);
export default userRoutes;
//# sourceMappingURL=user-routes.js.map