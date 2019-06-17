const express = require("express");
const router = express.Router();
const { data } = require("../data/flashcardData.json");
const { cards } = data;

router.get("/", (req, res) => {
    const numberOfCards = cards.length;
    const flashcardId = MATH.floor(Math.random() * numberOfCards);
    res.redirect(`/cards/${flashcardId}?side=question`);
});

router.get("/:id", (req, res) => {
    const side = req.query.side;
    const id = req.params.id;
    if (!side) {
        res.redirect(`/cards/${id}?side=question`);
    }
    const name = req.cookies.username;

    const text = cards[id][side];
    const hint = cards[id].hint;

    const templateData = { id, text };
    if (side === "question") {
        templateData.hint = hint;
        templateData.sideToShow = "answer";
        templateData.sideToShowDisplay = "Answer";
    } else if (side === "answer") {
        templateData.sideToShow = "question";
        templateData.sideToShowDisplay = "Question";
    }

    res.render("card", templateData);
});

module.exports = router;
