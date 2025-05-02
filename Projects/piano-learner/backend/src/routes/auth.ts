import { Router } from "express";
import {loginUser, registerUser} from "../controller/authController"

//API Endpunkte definieren login register

//Router erstellen
const router = Router();

//register Endpunkt
router.post('/register', registerUser);

//login Endplunkt
router.post('/login', loginUser);


//damit ich ihn in andere Dateien verwenden kann
export default router;