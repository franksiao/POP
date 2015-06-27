var express = require("express");
var bodyParser = require("body-parser");
var expressValidator = require('express-validator');
var RSVP = require('rsvp');
var morgan = require('morgan');
var config = require('./config.json');
var flash = require('connect-flash');

var app = express();
var PortfolioApi = require('./api/PortfolioApi.js');
var ContractApi = require('./api/ContractApi.js');
var FileUploadApi = require('./api/FileUploadApi.js');
var ConstraintApi = require('./api/ConstraintApi.js');
var GeographyApi = require('./api/GeographyApi.js');
var PageRouter = require('./PageRouter.js');
var ConnectionManager = require('./ConnectionManager.js');

var passport = require('passport');
var SetupPassport = require('./PassportSetup.js');
var expressSession = require('express-session');
var fileStore = require('session-file-store')(expressSession);
var cookieParser = require('cookie-parser');

var ApiUtils = require('./api/ApiUtils');

function initialize() {
	RSVP.on('error', function(reason) {
		console.error(reason);
	});
	// view engine setup
	app.set('views', './pages');
	app.set('view engine', 'jade');

	setupRoutes();
	startServer();
};

function setupRoutes() {
	
	app.use(bodyParser.urlencoded({ extended: true }));
	app.use(bodyParser.json());
	app.use(cookieParser())
	app.use(expressValidator({
		customValidators: ApiUtils.CustomValidators
	}));
	app.use(morgan('dev'));
	app.use(express.static(__dirname + '/public'));
	app.use(flash());
	app.use(expressSession({
		store: new fileStore(),
		secret: 'BamBamBigelow',
		resave: true,
		saveUninitialized: false,
		rolling: true,
		cookie: {
			maxAge: 1000 * 60 * 60
		}
	}));

	var router = express.Router();
	var pool = ConnectionManager.getPool();
	
	app.use('/', router);


	ConnectionManager.setup(router);
	FileUploadApi.setup(router);
	PortfolioApi.setup(router, pool);
	ContractApi.setup(router);
	GeographyApi.setup(router);
	ConstraintApi.setup(router);

	router.use(passport.initialize());
	router.use(passport.session());
	SetupPassport(passport, pool);
	PageRouter.setup(router, passport);
}

function startServer() {
	app.set('port', (process.env.PORT || 8888));
	app.listen(app.get('port'), function() {
		console.log("Node app is running at localhost:" + app.get('port'));
	});
}

initialize();
