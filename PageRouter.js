var isAuthenticated = function (req, res, next) {
	console.log('authenticate');
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/');
}

exports.setup = function(router, passport){

	/* GET login page. */
	router.get('/', function(req, res) {
		res.render('login', { message: req.flash('message') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/'
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home');
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}





