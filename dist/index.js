"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const express_rate_limit_1 = __importDefault(require("express-rate-limit"));
const error_middleware_1 = __importDefault(require("./middleware/error.middleware"));
const config_1 = __importDefault(require("./config"));
console.log(config_1.default);
const PORT = config_1.default.port || 3000;
//create instance from the server
const app = (0, express_1.default)();
//middleware to parse incomming reqests
app.use(express_1.default.json());
//HTTP request logger middleware
app.use((0, morgan_1.default)('common'));
//HTTP sequrity 
app.use((0, helmet_1.default)());
// Apply the rate limitimng middleware off requests
app.use((0, express_rate_limit_1.default)({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: "Too many requests from this IP , Plerase try again after an hour"
}));
//Add routing for Path
app.get('/', (req, res) => {
    throw new Error('Error exist');
    res.json({
        message: "Hello World!",
    });
});
//POST Request
app.post('/', (req, res) => {
    res.json({
        message: "Hello World from post",
        data: req.body,
    });
});
//test db
//  db.connect().then((client) => {
//      return client
//      .query('SELECT NOW()')
//      .then((res)=>{
//          client.release();
//          console.log(res.rows);
//      })
//      .catch(err =>{
//          client.release();
//          console.log(err.stack);
//      });
//  });
app.use(error_middleware_1.default);
app.use((_req, res) => {
    res.status(404).json({
        message: "you are lost , read the API doc to find the API",
    });
});
//start express server
app.listen(PORT, () => {
    console.log(`Server is starting at port :${PORT}`);
});
exports.default = app;
