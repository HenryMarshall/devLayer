var dl = {

  keycodesToStrokes: function(corpusCharacter, characters) {
    var strokeKeycodes =  characters[corpusCharacter],
        strokes =  _.map(strokeKeycodes, function(keycode) {
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