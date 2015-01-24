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

  buildKeymapKey: function(physicalKey, modLevel, keymap) {
    var character = physicalKey[modLevel]
    if (keymap.hasOwnProperty(character)) {
      if (!isEasierWay(physicalKey, modLevel)) {
        keymap[character] = [physicalKey.keycode]
        keymap[character].push
      }
    }
    return keymap;
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

  strokesForCharacter: function(physicalKey, modLevel) {
    var strokes = [physicalKey.keycode],
        altGrKeycode = "108",
        shiftLeftKeycode = "50",
        shiftRightKeycode = "62";

    if (modLevel === "altGr" || modLevel === "altGrShift") {
      strokes.push(altGrKeycode)
    }

    if (modLevel === "shift" || modLevel === "altGrShift") {
      if (dl.config.keyboard[physicalKey.keycode].hand === "left") {
        strokes.push(shiftRightKeycode)
      }
      else {
        strokes.push(shiftLeftKeycode)
      }
    }

    return strokes;
  }

};