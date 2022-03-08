import express from "express";
import helmet from "helmet";
//import cors from 'cors';
require("dotenv").config({ path: "/.env" });

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

const port = process.env.SERVER_HOST_PORT || 6300;

app.listen(6300, () => {
  console.log(`Server started on port ${port}`);
});

export {
    
}