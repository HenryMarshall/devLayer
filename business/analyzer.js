var dl = {
  buildCurrentStroke: function(character, characters) {
    var strokeKeycodes =  characters[character],
        currentStrokes =  _.map(strokeKeycodes, function(keycode) {
                            return xm.config.keyboard[keycode];
                          });
    return currentStrokes;
  }
};