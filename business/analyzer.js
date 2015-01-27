var dl = {

  processCorpus: function(corpus, chords) {
    var score = new dl.Score(),
        corpusStrokes = dl.corpusToCorpusStrokes(corpus, chords);

    _.each(corpusStrokes, function(currentStrokes, ii) {
      var previousStrokes = corpusStrokes[ii - 1] || [],
          todo = dl.buildTodo(previousStrokes, currentStrokes);
      score = dl.incrementScore(todo, score);
    });

    return score;
  },

  buildTodo: function(previousStrokes, currentStrokes) {
    var todo = new dl.Todo(previousStrokes, currentStrokes);
    _.each(previousStrokes, function(previousStroke) {
      _.each(currentStrokes, function(currentStroke) {
        if (previousStroke.finger === currentStroke.finger) {
          if (!dl.isMaintainingMod(previousStroke, currentStroke)) {
            todo.previousToCurrent.push([previousStroke, currentStroke]);
          }
          todo.previousToHome = _.without(todo.previousToHome, previousStroke);
          todo.homeToCurrent = _.without(todo.homeToCurrent, currentStroke);
        }
      });
    });
    return todo;
  },

  Todo: function(previousStrokes, currentStrokes) {
    this.previousToHome = _.clone(previousStrokes);
    this.previousToCurrent = [];
    this.homeToCurrent = _.clone(currentStrokes);
  },

  isMaintainingMod: function(previousStroke, currentStroke) {
    physicalMods = [xm.config.keyboard[xm.config.altGrKeycode],
                    xm.config.keyboard[xm.config.shiftLeftKeycode],
                    xm.config.keyboard[xm.config.shiftRightKeycode]];

    return  previousStroke === currentStroke && 
            _.contains(physicalMods, currentStroke)
  },

  incrementScore: function(todo, score) {
    _.each(todo.previousToCurrent, function(physicalKeys) {
      // TODO: if holding a modifier, should not increment
      var fingerScore = score.fingers[physicalKeys[1].finger];
      fingerScore.distance += dl.distanceBetween(physicalKeys[0], physicalKeys[1]);
      ++fingerScore.strokes;
      ++score.rows[physicalKeys[1].y];
      ++fingerScore.consecutive;
    });

    _.each(todo.homeToCurrent, function(physicalKey) {
      var fingerScore = score.fingers[physicalKey.finger];
      fingerScore.distance += dl.distanceBetween(physicalKey);
      ++fingerScore.strokes;
      ++score.rows[physicalKey.y];
    });

    _.each(todo.previousToHome, function(physicalKey) {
      var fingerScore = score.fingers[physicalKey.finger];
      fingerScore.distance += dl.distanceBetween(physicalKey);
    });

    return score;
  },

  Score: function() {
    this.fingers = {
      leftPinkie: new dl.Finger(),
      leftRing: new dl.Finger(),
      leftMiddle: new dl.Finger(),
      leftIndex: new dl.Finger(),
      leftThumb: new dl.Finger(),
      rightPinkie: new dl.Finger(),
      rightRing: new dl.Finger(),
      rightMiddle: new dl.Finger(),
      rightIndex: new dl.Finger(),
      rightThumb: new dl.Finger()
    },
    // Rows are respectively: Number, Top, Home, Bottom, Space 
    this.rows = [0,0,0,0,0]
  },

  Finger: function(strokes, distance, consecutive) {
    this.strokes = strokes || 0,
    this.distance = distance || 0,
    this.consecutive = consecutive || 0
  },

  corpusToCorpusStrokes: function(corpus, chords) {
    var corpusChars = corpus.split(''),
        corpusStrokes = _.map(corpusChars, function(corpusChar) {
          try {
            return dl.keycodesToStrokes(corpusChar, chords);
          }
          catch(err) {
            // TODO: Add invalid char to list somewhere
            return [];
          }
        });
    return corpusStrokes;
  },

  keycodesToStrokes: function(corpusChar, chords) {
    var strokeKeycodes = chords[corpusChar];
    if (strokeKeycodes === undefined) {
      throw "corpusChar not in chords";
    }

    var strokes = _.map(strokeKeycodes, function(keycode) {
                    return xm.config.keyboard[keycode];
                  });
    return strokes;
  },

  distanceBetween: function(from, to) {
    // If no `to` is given, return finger to homerow
    to = to || xm.config.homerow[from.finger];

    if (to.finger !== from.finger) {
      throw "Different fingers used; cannot calculate distance"
    }
    else {
      return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
    }
  }
};