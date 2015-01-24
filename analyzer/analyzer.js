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
  }

};