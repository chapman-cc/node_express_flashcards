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
    next(err);
});

app.use((req, res, next) => {
    console.log("World");
    next();
});
// * ----------
// * SETTINGS
// * ----------

app.set("view engine", "pug");

// * ----------
// * PAGES
// * ----------

// * root
app.get("/", (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render("index", { name });
    } else {
        res.redirect("/hello");
    }
});

// * /card
app.get("/card", (req, res) => {
    // res.locals.prompt = "Who is buried in Grant's Tomb?"
    res.render("card", {
        prompt: "Who is buried in Grant's Tomb?",
        hint: "Think about whose tomb it is."
    });
});

// * /hello
app.get("/hello", (req, res) => {
    const name = req.cookies.username;

    if (name) {
        res.redirect("/");
    } else {
        res.render("hello");
    }
});
app.post("/hello", (req, res) => {
    res.cookie("username", req.body.username);
    res.redirect("/");
});

// * /goodbye
app.post("/goodbye", (req, res) => {
    res.clearCookie("username");
    res.redirect("/hello");
});

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
