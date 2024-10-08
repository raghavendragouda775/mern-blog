import express from "express";
import { signup } from "../controllers/auth.controller.js";
import { login } from "../controllers/auth.controller.js";
import { google } from "../controllers/auth.controller.js";


const route=express.Router();

route.post("/signup",signup);
route.post("/signin",login);
route.post('/google',google)
export default route;