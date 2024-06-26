import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));


const app = express();
const port = 3000;

let posts = [];

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

app.get('/', (req, res) => {
    res.render("index.ejs", {posts: posts});
});

app.get("/blogs", (req, res) => {
    res.render("blogs");
});

app.post('/submit', (req, res) => {
    const userInput = req.body.userInput;
    posts.push(userInput);
    res.redirect('/');
});
app.get("/edit", (req, res) => {
    res.render("edit");
});

app.post('/delete', (req, res) => {
    const index = req.body.index;
    posts.splice(index, 1);
    res.redirect('/');
});



app.listen(port, () => {
    console.log(`Server running at port ${port}`);
}); 