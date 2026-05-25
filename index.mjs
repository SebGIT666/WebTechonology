//COSMIC DIVIDE - EXPRESS SERVER
//AUTHOR: SebGIT66

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

//SETUP
const app = express();
const PORT = 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//Middlewere
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true}));
app.use(express.json());

//EJS setup
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

//Home page
app.get('/', (req, res) => {
    res.render('index');
});

//START SERVER

app.listen(PORT, () => {
    console.log(`Cosmic Divide running on http://localhost:${PORT}`);
});