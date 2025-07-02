import mongoose from "mongoose";
import app from "./app.js";

mongoose.connect('mongodb://localhost:27017/react-posts')
    .then(() => {
        console.log('database connected')
        app.listen(3000, () => {
            console.log('Server is running on port 3000')
        })
    })
    .catch((e) => {
        console.error('Database connection error:', e);
    })