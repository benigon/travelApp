var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});


router.get('/trips', function(req, res) {
	var MongoClient = mongodb.MongoClient;
	var url = 'mongodb://localhost:27017/travelApp';

	MongoClient.connect(url, function(err, db) {
		if (err) {
			console.log("Unable to connect to the server", err);
		} else {
			console.log("Connetion established");
			var collection = db.collection('trip');

			collection.find({}).toArray(function(err, result){
				if (err) {
					res.send(err);
				} else if (result.length) {
					res.render('trip_list', {"tripList": result});
				} else {
					res.send("No documents found");
				}
 	  		});
			db.close();
		}
	});
});

router.get('/newtrip', function(req, res) {
	res.render('new_trip', {title: 'Add trip'});
});

router.post('/addtrip', function(req, res) {
	 var MongoClient = mongodb.MongoClient;
	 var url = 'mongodb://localhost:27017/travelApp';

	 MongoClient.connect(url, function(err, db) {
	 	if (err) {
	 		console.log("Unable to connect to server", err);
	 	} else {
	 		console.log("Connected to server");
	 		var collection = db.collection("trip");
	 		var trip1 = {title: req.body.title, initDate: req.body.initDate, endDate: req.body.endDate};

	 		collection.insert([trip1], function(err, result) {
	 			if (err) {
	 				console.log(err);
	 			} else {
	 				res.redirect(303, "trips");
	 			}
	 			db.close();
	 		});
	 	}
	 });
});

router.get('/headers', function(req, res) {
	res.set('Content-Type', 'text/plain');
	var s = '';
	for (var name in req.headers)
		s += name + ": " + req.headers[name] + '\n';
	res.send(s);
})

router.use(function(req, res, next){
	res.status(404).render('error', {"message": "Page not found", "error": {"status": 404}});
});


module.exports = router;
