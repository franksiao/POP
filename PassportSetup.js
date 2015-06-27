var LocalStrategy   = require('passport-local').Strategy;

var bcrypt = require('bcrypt-nodejs');

module.exports = function(passport, pool) {
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		pool.getConnection(function(err, connection) {
			if (err) {
				console.log('Error getting connection from pool');
				done(err);
			} else {
				var q = connection.query("SELECT * FROM opt.users WHERE id = ? ",[id], function(err, rows) {
					connection.release();
					if (err) {
						console.log('Error making query:', err);
					}
					done(err, rows[0]);
				});
				console.log(q.sql);
			}
		});
	});

	passport.use(
		'login',
		new LocalStrategy({
			passReqToCallback : true
		},
		function(req, username, password, done) {
			console.log('start');
			pool.getConnection(function(err, connection) {
				if (err) {
					console.log('Error getting connection from pool');
					done(err);
				} else {
					var q = connection.query("SELECT * FROM opt.users WHERE username = ?", [username], function(err, rows) {
						connection.release();
						if (err) {
							return done(err);
						}
						if (!rows.length) {
							return done(null, false, req.flash('message', 'User Not found.'));
						}

						// if the user is found but the password is wrong
						if (!bcrypt.compareSync(password, rows[0].password)) {
							return done(null, false, req.flash('message', 'Invalid Password'));
						}
						// all is well, return successful user
						if (req.body.remember) {
							console.log('increasing maxage');
							req.session.cookie.maxAge = 1000 * 60 * 60 * 24;
						}
						return done(null, rows[0]);
					});
					console.log(q.sql);
				}
			});
		})
	);
};