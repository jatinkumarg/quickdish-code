const express = require("express");
const app = express();
const session = require('express-session');
const bcrypt = require('bcryptjs');
const passport = require("passport");
const bodyParser = require('body-parser');
const path = require('path');

const { checkAuth } = require("./auth/auth");
checkAuth(passport);

const dotenv = require("dotenv");
dotenv.config();

// initialize Config
const Config = require("./services/Config");
const config = new Config();
config.initConfig(process.env);
const configData = config.getConfigData();
app.locals.configData = configData;

// initialize DB service
const DBService = require("./services/DBService");
const dbService = new DBService();
const dbConnectionResult = dbService.connectDB(configData?.MONGODB_URI);
if (!dbConnectionResult) {
    console.error('Error connecting to DB');
} else {
    console.log('Connected to DB');
}

// initialize MealDBAPI service
const MealDBAPIService = require("./services/MealDBAPIService");
const mealDBAPIService = new MealDBAPIService(configData.API_URL);
app.locals.mealDBAPIService = mealDBAPIService;

// initialize DataCache service
const DataCache = require("./services/DataCache");
const dataCache = new DataCache(configData.REDIS_PASSWORD, configData.REDIS_HOST, configData.REDIS_PORT);
app.locals.dataCache = dataCache;

// initialize keywordsObserver and SearchObserver service
const KeywordsObserver = require("./services/KeywordsObserver");
const SearchObserver = require("./services/SearchObserver");
const keywordsObserver = new KeywordsObserver();
const searchObserver = new SearchObserver();
searchObserver.attach(keywordsObserver);
app.locals.keywordsObserver = keywordsObserver;
app.locals.searchObserver = searchObserver;

// initialize VisitCountObserver and UserVisitsObserver service
const VisitCountObserver = require("./services/VisitCountObserver");
const UserVisitsObserver = require("./services/UserVisitsObserver");
const visitCountObserver = new VisitCountObserver();
const userVisitsObserver = new UserVisitsObserver();
userVisitsObserver.attach(visitCountObserver);
app.locals.visitCountObserver = visitCountObserver;
app.locals.userVisitsObserver = userVisitsObserver;

// initialize Logger, APILogger, DBLogger service
const Logger = require("./services/Logger");
const APILogger = require("./services/APILogger");
const DBLogger = require("./services/DBLogger");
const logger = new Logger();
const apiLogger = new APILogger();
const dbLogger = new DBLogger();
apiLogger.initLog(logger);
dbLogger.initLog(logger);
app.locals.apiLogger = apiLogger;
app.locals.dbLogger = dbLogger;

// setup middlewares
app.set("view engine", "ejs");
app.use('/', express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.json());


// session secret key
let key = configData?.KEY;
generateSecretKeyHash(key)
    .then((hash) => {
        key = hash
    })
    .catch((error) => {
        console.log('Error setting secret key:', error);
    });

app.use(session({
    secret: key,
    saveUninitialized: true,
    resave: true
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());
app.use("/", require("./routes/route"));
app.get('/', (req, res) => {
    res.redirect('/main');
});

// start server
const PORT = configData?.PORT || 4200;
app.listen(PORT, console.log("Server has started at port " + PORT));

// generate secret key hash
async function generateSecretKeyHash(secretKey) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(secretKey, salt);
        return hash;
    } catch (error) {
        console.log('Error generating secret key hash:', error);
        throw error;
    }
}
