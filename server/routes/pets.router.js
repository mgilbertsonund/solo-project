const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// This route *should* return the logged in users pets
router.get('/', (req, res) => {
    console.log('/pet GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    // req.isAuthenticated() returns true or false
    if(req.isAuthenticated()) {
        // The user is logged in!
        let queryText = `SELECT * FROM "pets" WHERE "user_id" = $1;`;
        // DO NOT USE req.params or req.body for the logged in user id!!!
        pool.query(queryText, [req.user.id]).then((result) => {
            res.send(result.rows);
        }).catch((error) => {
            console.log(error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

// This route *should* add a pet for the logged in user
router.post('/', (req, res) => {
    console.log('/pet POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    if(req.isAuthenticated()) {
        let queryText = `INSERT INTO "pets" ("user_id", "name") VALUES ($1, $2);`;
        pool.query(queryText, [req.user.id, req.body.name]).then(results => {
            res.sendStatus(201);
        }).catch(error => {
            console.log('Error in POST /pets', error);
            res.sendStatus(500);
        });
    } else {
        res.sendStatus(403);
    }
});

module.exports = router;