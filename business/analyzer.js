var dl = {
  corpusToCorpusStrokes: function(corpus, chars) {
    var corpusChars = corpus.split(''),
        corpusStrokes = _.map(corpusChars, function(corpusChar) {
          try {
            return dl.keycodesToStrokes(corpusChar, chars);
          }
          catch(err) {
            // TODO: Add invalid char to list somewhere
            return [];
          }
        });
    return corpusStrokes;
  },

  keycodesToStrokes: function(corpusChar, chars) {
    var strokeKeycodes = chars[corpusChar];
    if (strokeKeycodes === undefined) {
      throw "corpusChar not in chars";
    }

    var strokes = _.map(strokeKeycodes, function(keycode) {
                    return xm.config.keyboard[keycode];
                  });
    return strokes;
  },

  distanceBetween: function(fromKeycode, toKeycode) {
    var from = xm.config.keyboard[fromKeycode],
        to = xm.config.keyboard[toKeycode];

    if (to.finger !== from.finger) {
      throw "Different fingers used; cannot calculate distance"
    }
    else {
      return Math.sqrt(Math.pow(to.x - from.x, 2) + Math.pow(to.y - from.y, 2));
    }
  }
};