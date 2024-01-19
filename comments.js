
// Create web server
var express = require('express');
var app = express();

// Use body-parser
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

// Use mongoose
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/comments');

// Create schema
var commentSchema = mongoose.Schema({
  name: String,
  comment: String
});

// Create model
var Comment = mongoose.model('Comment', commentSchema);

// Serve static files
app.use(express.static('public'));

// Get comments
app.get('/api/comments', function(req, res) {
  Comment.find(function(err, comments) {
    if (err) {
      return console.error(err);
    }
    res.json(comments);
  });
});

// Post comment
app.post('/api/comments', jsonParser, function(req, res) {
  var comment = new Comment({
    name: req.body.name,
    comment: req.body.comment
  });

  comment.save(function(err, comment) {
    if (err) {
      return console.error(err);
    }
    res.sendStatus(201);
  });
});

// Delete comment
app.delete('/api/comments/:id', function(req, res) {
  Comment.remove({_id: req.params.id}, function(err) {
    if (err) {
      return console.error(err);
    }
    res.sendStatus(200);
  });
});

// Start server
app.listen(3000, function() {
  console.log('Server running on port 3000');
});


