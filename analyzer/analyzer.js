// dl is the devLayer namespace
var dl = {
  getLayout: function(name, success, error) {
    $.ajax({
      url: "/layouts/" + name,
      type: "GET",
      dataType: "text",
      success: success,
      error: error
    });
  },

  xmodToLayout: function(xmod) {
    var lines = xmod.split(/\n/);
    var layout = _.map(lines, function(line) {
      return new dl.buildLayoutKey(line);
    });

    return layout;
  },

  buildLayoutKey: function(xmodLine) {
    var elems = xmodLine.split(/\s+/);
    if (elems[1]) {
      this.keycode = elems[1],
      this.noMod = dl.convertXmodName(elems[3], dl.config.toSymbol),
      this.shift = dl.convertXmodName(elems[4], dl.config.toSymbol),
      this.altGr = dl.convertXmodName(elems[5], dl.config.toSymbol),
      this.altGrShift = dl.convertXmodName(elems[6], dl.config.toSymbol)
    }
  },

  convertXmodName: function(symbol, conversionDirection) {
    return conversionDirection[symbol] || symbol || "NoSymbol"
  },

  buildCharacters: function(layout) {
    var characters = {};
    _.each(dl.config.inputPriority, function(mod) {
      _.each(layout, function(physicalKey) {
        characters = dl.buildCharacterStrokes(physicalKey, mod, characters)
      });
    });
    return characters
  },

  buildCharacterStrokes: function(physicalKey, modLevel, characters) {
    var character = physicalKey[modLevel]
    if (!characters.hasOwnProperty(character)) {
      if (!dl.isEasierWay(physicalKey, modLevel)) {
        characters[character] = dl.strokesForCharacter(physicalKey, modLevel)
      }
    }
    return characters;
  },

  // Checks if there is an easier way to input the character with the key.
  // (e.g. input ";" without any mods even though altGr also works
  isEasierWay: function(physicalKey, modLevel) {
    modLevelIdx = dl.config.easyPriority.indexOf(modLevel);
    for (var ii = 0; ii < modLevelIdx; ii++) {
      if (physicalKey[dl.config.easyPriority[ii]] === physicalKey[modLevel]) {
        return true;
      }
    };
    return false;
  },

  // Records the strokes that are required to input a character.
  strokesForCharacter: function(physicalKey, modLevel) {
    var strokes = [physicalKey.keycode];

    if (modLevel === "altGr" || modLevel === "altGrShift") {
      strokes.push(dl.config.altGrKeycode);
    }

    if (modLevel === "shift" || modLevel === "altGrShift") {
      if (dl.config.keyboard[physicalKey.keycode].hand === "left") {
        strokes.push(dl.config.shiftRightKeycode);
      }
      else {
        strokes.push(dl.config.shiftLeftKeycode);
      }
    }

    return strokes;
  }

};