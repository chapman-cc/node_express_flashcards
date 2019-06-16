const express = require("express");
const router = express().router;

// * ----------
// * ROUTES
// * ----------

// * root
router.get("/", (req, res) => {
    const name = req.cookies.username;
    if (name) {
        res.render("index", { name });
    } else {
        res.redirect("/hello");
    }
});

// * /card
router.get("/card", (req, res) => {
    // res.locals.prompt = "Who is buried in Grant's Tomb?"
    res.render("card", {
        prompt: "Who is buried in Grant's Tomb?",
        hint: "Think about whose tomb it is."
    });
});

// * /hello
router.get("/hello", (req, res) => {
    const name = req.cookies.username;

    if (name) {
        res.redirect("/");
    } else {
        res.render("hello");
    }
});
router.post("/hello", (req, res) => {
    res.cookie("username", req.body.username);
    res.redirect("/");
});

// * /goodbye
router.post("/goodbye", (req, res) => {
    res.clearCookie("username");
    res.redirect("/hello");
});

module.exports = router;
