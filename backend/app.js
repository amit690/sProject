const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const expenseRoutes = require('./routes/expense');
const sequelize = require('./models/database');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(expenseRoutes);

sequelize.sync()
    .then(() => {
        console.log('Database synced');
        app.listen(4000, () => {
            console.log('Server is running on port 4000');
        });
    })
    .catch((error) => {
        console.log('Sync error', error);
    });
