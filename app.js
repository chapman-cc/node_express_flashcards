// * ----------
// * REQUIRE
// * ----------

const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

// * ----------
// * USE
// * ----------

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use((req, res, next) => {
    console.log("Hello");
    const err = new Error("Oh no");
    err.status = 500;
    next();
});

app.use((req, res, next) => {
    console.log("World");
    next();
});
// * ----------
// * SETTINGS
// * ----------

app.set("view engine", "pug");

const routes = require("./routes");

app.use(routes);

app.use((req, res, next) => {
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});
// * ----------
// * ERROR HANDLER
// * ----------

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render("error");
    next();
});

// * ----------
// * LISTENER
// * ----------

app.listen(3000, () => {
    console.log("the application is running on localhost:3000");
});
