// xm is the xmod namespace
var xm = {
  getLayout: function(name, success, error) {
    $.ajax({
      url: "/layouts/" + name,
      type: "GET",
      dataType: "text",
      success: success,
      error: error
    });
  },

  xmodToChords: function(xmod) {
    var layout = xm.xmodToLayout(xmod),
        chords = xm.layoutToChords(layout);

    return chords;
  },

  xmodToLayout: function(xmod) {
    var lines = xmod.split(/\n/);
    var layout = _.map(lines, function(line) {
      return new xm.buildLayoutKey(line);
    });

    return layout;
  },

  buildLayoutKey: function(xmodLine) {
    var elems = xmodLine.split(/\s+/);
    if (elems[1]) {
      this.keycode = elems[1],
      this.noMod = xm.convertXmodName(elems[3]),
      this.shift = xm.convertXmodName(elems[4]),
      this.altGr = xm.convertXmodName(elems[5]),
      this.altGrShift = xm.convertXmodName(elems[6])
    }
  },

  convertXmodName: function(symbol) {
    return xm.config.toSymbol[symbol] || symbol || "NoSymbol"
  },

  layoutToChords: function(layout) {
    var chords = {};
    _.each(xm.config.inputPriority, function(mod) {
      _.each(layout, function(layoutKey) {
        chords = xm.buildChordStrokes(layoutKey, mod, chords)
      });
    });
    return chords
  },

  buildChordStrokes: function(layoutKey, modLevel, chords) {
    var chord = layoutKey[modLevel]
    if (!chords.hasOwnProperty(chord)) {
      if (!xm.isEasierWay(layoutKey, modLevel)) {

        chords[chord] = xm.strokesForCharacter(layoutKey, modLevel)
      }
    }
    return chords;
  },

  // Checks if there is an easier way to input the character with the key.
  // (e.g. input ";" without any mods even though altGr also works
  isEasierWay: function(layoutKey, modLevel) {
    modLevelIdx = xm.config.easyPriority.indexOf(modLevel);
    for (var ii = 0; ii < modLevelIdx; ii++) {
      if (layoutKey[xm.config.easyPriority[ii]] === layoutKey[modLevel]) {
        return true;
      }
    };
    return false;
  },

  // Records the strokes that are required to input a character.
  strokesForCharacter: function(layoutKey, modLevel) {

    if (!xm.config.keyboard.hasOwnProperty(layoutKey.keycode)) {
      throw "layoutKey not found on keyboard."
    }

    var strokes = [layoutKey.keycode];

    if (modLevel === "altGr" || modLevel === "altGrShift") {
      strokes.push(xm.config.altGrKeycode);
    }

    if (modLevel === "shift" || modLevel === "altGrShift") {
      if (xm.config.keyboard[layoutKey.keycode].hand === "left") {
        strokes.push(xm.config.shiftRightKeycode);
      }
      else {
        strokes.push(xm.config.shiftLeftKeycode);
      }
    }

    return strokes;
  }

};