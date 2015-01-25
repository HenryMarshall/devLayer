var dl = {

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