const express = require("express");
const bodyParser = require('body-parser');
const morgan = require("morgan");
const productsRouter = require("./routers/products");
const usersRouter = require("./routers/users");
const commentsRouter = require("./routers/comments");
const {connection} = require("./database");
const orderRouter = require("./routers/orders");
const loginRouter = require("./routers/login");
const jwtCheck = require("./helpers/jwt");
const errorHandler = require("./helpers/error-handler");
const cors = require("cors");
const app = express();
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(cors());
app.use(jwtCheck);
app.use(errorHandler)

// Routers
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use('/api/comments', commentsRouter);
app.use('/api/users/login', loginRouter);
app.use('/api/orders', orderRouter);


// Server is runnig on port 3001
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Server is running on port http://localhost:${port}`));