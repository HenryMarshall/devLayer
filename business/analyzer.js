var dl = {
  processCorpusStrokes: function(corpusStrokes) {
    var score = new dl.Score();

    _.each(corpusStrokes, function(currentStrokes, ii) {
      var previousStrokes = corpusStrokes[ii-1] || [],
          homeboundStrokes = _.clone(previousStrokes);

      _.each(currentStrokes, function(currentStroke) {
        var fingerReused = false,
            currentFingerScore = score.fingers[currentStroke.finger];

        _.each(previousStrokes, function(previousStroke) {
          if (currentStroke.finger === previousStroke.finger) {
            currentFingerScore.distance += 
              dl.distanceBetween(previousStroke, currentStroke)
            ++currentFingerScore.consecutive
            // TODO: remove previousStroke from homeboundStrokes
            fingerReused = true;
          }
        });

        _.each(homeboundStrokes, function(homeboundStroke) {
          var homeboundHome = xm.config.keyboard[xm.config.homerow[homeboundStroke.finger]];

          score.fingers[homeboundStroke.finger].distance +=
            dl.distanceBetween(homeboundStroke, homeboundHome)
        });

        if (!fingerReused) {
          var home = xm.config.keyboard[xm.config.homerow[currentStroke.finger]];
          currentFingerScore.distance +=
            dl.distanceBetween(home, currentStroke)
        }

        ++score.fingers[currentStroke.finger].strokes
      });
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
    this.row = [0,0,0,0,0]
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
    if (to.finger !== from.finger) {
      throw "Different fingers used; cannot calculate distance"
    }
    else {
      return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
    }
  }
};