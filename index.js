import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import KpiRoutes from "./routes/kpi.js";
import ProductRoutes from "./routes/product.js";
import TransactionRoutes from "./routes/transaction.js";

// import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";
import { kpis, products, transactions } from "./data/data.js";
import KPI from "./models/KPI.js";

//config
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

//routes
app.use("/kpi", KpiRoutes);
app.use("/product", ProductRoutes);
app.use("/transaction", TransactionRoutes);

// mongoose setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`server port ${PORT}`));
    // await mongoose.connection.db.dropDatabase();
    // Product.insertMany(products);
    // KPI.insertMany(kpis);
    // Transaction.insertMany(transactions);
  })
  .catch((err) => console.log(`${err} did not connect`));
