"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
// import path from 'path';
// import fs from 'fs';
const newsEventsController_1 = require("../controllers/newsEventsController");
// Update multer configuration
const upload = (0, multer_1.default)();
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, '../uploads'));
//   },
//   filename: function (req, file, cb) {
//     const uniqueName = Date.now() + "-" + Math.round(Math.random() * 1e9)+ file.originalname.replace(/\s+/g, '-');
//     cb(null, uniqueName);
//   }
// });
// const upload = multer({ storage : storage });
const router = express_1.default.Router();
router.post('/add', upload.single("image"), newsEventsController_1.createEvent);
router.get('/list', newsEventsController_1.getAllEvents);
router.put('/update/:_id', upload.single("image"), newsEventsController_1.updateEvent);
router.delete('/delete/:_id', newsEventsController_1.deleteEvent);
exports.default = router;
//# sourceMappingURL=newsEventsRoute.js.map