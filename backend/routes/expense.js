const express = require('express');

const expenseControler =require('../controlers/exppense');

const router = express.Router();

router.post('/expense', expenseControler.postexpense);

router.get('/expense', expenseControler.getexpense);

router.put('/expense', expenseControler.putexpense);

router.delete('/expense', expenseControler.deleteexpense);

module.exports = router;