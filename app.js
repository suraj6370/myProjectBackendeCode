const mongoose = require('mongoose');
const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const port = 3006
mongoose.connect('mongodb://localhost:27017/backendshop',
 {useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex:true
}).then(()=> {
    console.log("DB CONNECTED")
})

//Middlewares
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


const categoryRoutes = require("./routes/category");
const orderRoutes = require("./routes/order");
const subCategoryRoutes = require("./routes/subcategory");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");

app.use("/api", categoryRoutes);
app.use("/api", orderRoutes);
app.use("/api",subCategoryRoutes);
app.use("/api",productRoutes);
app.use("/api",authRoutes);

app.use('/uploads', express.static('uploads'));


app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
