"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes/routes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get('/home', (req, res) => {
    res.send("server says heloo!!");
    console.log("on home");
});
app.use('/api', routes_1.default);
app.listen(3000, () => {
    console.log("server is on port 3000");
});
