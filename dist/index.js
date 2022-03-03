"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const PORT = 3000;
//create instance from the server
const app = (0, express_1.default)();
//start express server
app.listen(PORT, () => {
    console.log(`Server is starting at port :${PORT}`);
});
exports.default = app;
