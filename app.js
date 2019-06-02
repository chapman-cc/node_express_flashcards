const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
})

// app.get('/hello', (req, res) => {
//     res.send("<h1>Hello World</h1>");
// })

app.get('/card', (req, res) => {
    // res.locals.prompt = "Who is buried in Grant's Tomb?"
    res.render('card', {
        prompt: "Who is buried in Grant's Tomb?", 
        hint: "Think about whose tomb it is."
    });
})

app.listen(3000, () => {
    console.log("the application is running on localhost:3000");    
});