import express, { Application ,Request, Response} from "express";
import morgan from 'morgan';
import helmat from 'helmet';
import { rateLimit } from "express-rate-limit";

const PORT = 3000;

//create instance from the server
const app: Application = express();
//middleware to parse incomming reqests
app.use(express.json());
//HTTP request logger middleware
app.use(morgan('common'));
//HTTP sequrity 
app.use(helmat());
// Apply the rate limitimng middleware off requests
app.use(
rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: "Too many requests from this IP , Plerase try again after an hour"
})
);

//Add routing for Path
app.get('/', (req:Request,res:Response)=> {
    res.json({
        message:"Hello World!",
    });
});
//POST Request
app.post('/', (req:Request,res:Response)=> {
    res.json({
        message:"Hello World from post",
        data: req.body,
    });
});

//start express server
app.listen(PORT, () => {
  console.log(`Server is starting at port :${PORT}`);
});

export default app;
