//COSMIC DIVIDE - EXPRESS SERVER
//AUTHOR: SebGIT66

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import db from './database.mjs';

//SETUP
const app = express();
const PORT = 5000;
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

//API ROUTES
//GET all habitats
app.get('/api/habitats', (req, res) => {
    const habitats = db.prepare('SELECT * FROM habitats').all();
    res.json(habitats);
});

//GET flora by habitat
app.get('/api/flora', (req, res) => {
    const { habitat_id } = req.query;
    if (habitat_id) {
        const flora = db.prepare('SELECT * FROM flora WHERE habitat_id = ?').all(habitat_id);
        res.json(flora);
    } else {
        const flora = db.prepare('SELECT * FROM flora').all();
        res.json(flora);
    }
});

//GET fauna by habitat
app.get('/api/fauna', (req, res) => {
    const { habitat_id } = req.query;
    if (habitat_id) {
        const fauna = db.prepare('SELECT * FROM fauna WHERE habitat_id = ?').all(habitat_id);
        res.json(fauna);
    } else {
        const fauna = db.prepare('SELECT * FROM fauna').all();
        res.json(fauna);
    }
});

//GET attractions by habitat
app.get('/api/attractions', (req, res) => {
    const { habitat_id } = req.query;
    if (habitat_id) {
        const attractions = db.prepare('SELECT * FROM attractions WHERE habitat_id = ?').all(habitat_id);
        res.json(attractions);
    } else {
        const attractions = db.prepare('SELECT * FROM attractions').all();
        res.json(attractions);
    }
});

//POST contact form
app.post('/api/contact', (req, res) => {
    const { name, email, subject, message} = req.body;
    
    if (!name || !email || !subject || ! message) {
        return res.status(400).json({error: 'All fields are required'});
    }

    const stmt = db.prepare('INSERT INTO contacts (name, email, subject, message) VALUES (?, ?, ?, ?)');

    stmt.run(name, email, subject, message);
    res.json({success: true, message: 'Message sent successfully'});
});


// ADMIN PANEL
app.get('/admin', (req, res) => {
    const key = req.query.key;

    if (key !== 'cosmic2026') {
        return res.status(403).send(`
            <h1 style="font-family:monospace; color:red; text-align:center; margin-top:20vh">
                403 — ACCESS DENIED
            </h1>
        `);
    }

    const contacts = db.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
    const flora = db.prepare('SELECT * FROM flora ORDER BY habitat_id').all();
    const fauna = db.prepare('SELECT * FROM fauna ORDER BY habitat_id').all();
    const attractions = db.prepare('SELECT * FROM attractions ORDER BY habitat_id').all();

    const stats = {
        contacts: db.prepare('SELECT COUNT(*) as count FROM contacts').get().count,
        flora: db.prepare('SELECT COUNT(*) as count FROM flora').get().count,
        fauna: db.prepare('SELECT COUNT(*) as count FROM fauna').get().count,
        attractions: db.prepare('SELECT COUNT(*) as count FROM attractions').get().count
    };

    res.render('admin', { contacts, flora, fauna, attractions, stats });
});

//Site Map
app.get('/sitemap', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'sitemap.html'));
});