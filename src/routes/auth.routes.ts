import { authcontroller } from "../controllers/auth.controller";
import { Express } from "express";
const router = require('express').Router();

router.post('/register', authcontroller.register);
router.post('/login', authcontroller.login);

export default router;