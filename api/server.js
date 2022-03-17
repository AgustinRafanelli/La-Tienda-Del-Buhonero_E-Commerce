const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./config/db');
const routes = require('./routes');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const passportConfig = require('./config/passport');

const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cookieParser());

app.use(
  session({
    secret: 'user',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(passportConfig.localStrategyInstance);

passport.serializeUser(passportConfig.serializeUserCb);

passport.deserializeUser(passportConfig.deserializeUserCb);

app.use('/api', routes);

app.use('/api', (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

const PORT = 3001;

db.sync({ force: false }).then(() =>
  app.listen(PORT, () => console.log(`Listening port ${PORT}`))
);