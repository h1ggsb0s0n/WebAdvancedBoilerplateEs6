import accountController from "./controller/AccountController.js"
import express from "express";

import db from "./db.js"

const app = express();
const port = 3250;

const mongoose = db.database()

accountController.setup(app, port, mongoose)


