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

  xmodToCharacters: function(xmod) {
    var layout = xm.xmodToLayout(xmod),
        characters = xm.layoutToCharacters(layout);

    return characters;
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

  layoutToCharacters: function(layout) {
    var characters = {};
    _.each(xm.config.inputPriority, function(mod) {
      _.each(layout, function(physicalKey) {
        characters = xm.buildCharacterStrokes(physicalKey, mod, characters)
      });
    });
    return characters
  },

  buildCharacterStrokes: function(physicalKey, modLevel, characters) {
    var character = physicalKey[modLevel]
    if (!characters.hasOwnProperty(character)) {
      if (!xm.isEasierWay(physicalKey, modLevel)) {
        characters[character] = xm.strokesForCharacter(physicalKey, modLevel)
      }
    }
    return characters;
  },

  // Checks if there is an easier way to input the character with the key.
  // (e.g. input ";" without any mods even though altGr also works
  isEasierWay: function(physicalKey, modLevel) {
    modLevelIdx = xm.config.easyPriority.indexOf(modLevel);
    for (var ii = 0; ii < modLevelIdx; ii++) {
      if (physicalKey[xm.config.easyPriority[ii]] === physicalKey[modLevel]) {
        return true;
      }
    };
    return false;
  },

  // Records the strokes that are required to input a character.
  strokesForCharacter: function(physicalKey, modLevel) {
    var strokes = [physicalKey.keycode];

    if (modLevel === "altGr" || modLevel === "altGrShift") {
      strokes.push(xm.config.altGrKeycode);
    }

    if (modLevel === "shift" || modLevel === "altGrShift") {
      if (xm.config.keyboard[physicalKey.keycode].hand === "left") {
        strokes.push(xm.config.shiftRightKeycode);
      }
      else {
        strokes.push(xm.config.shiftLeftKeycode);
      }
    }

    return strokes;
  }

};