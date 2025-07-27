import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./database/db.js";
import userRoute from "./routes/user.route.js"
import courseRoute from "./routes/course.route.js";

dotenv.config({});

// call database connection here
connectDB();
const app = express();
const PORT =process.env.PORT || 3000;

// Default middleware
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"http://localhost:5173",
    credentials: true
}))
                                                                                                                               
// apis

app.use("/api/v1/user",userRoute)
app.use("/api/v1/course",courseRoute)

// test route
app.get("/home",(_,res) => {
    res.status(200).json({
        success: true,
        message : "hello i am coming from backend"
    })
})
// test route end

app.listen(PORT,()=>{
    console.log(`server listen at port ${PORT}`);
})


