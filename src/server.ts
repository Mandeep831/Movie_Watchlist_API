import app from "./app";
import dotenv from "dotenv";
import morgan from "morgan";

app.use(morgan("dev"));
dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});