var App = Ember.Application.create();

$(document).ready(function() {
  pr.initialize()

  $('#test-it').click(function() {
    var scores = pr.testIt();
    var farther = pr.calcFarther(scores);
    
    console.log("farther: ",farther);
    // console.log("scores: ",scores);
  });

  $('#layouts').change(event, function() {
    pr.config.layout = $(this).find("input:checked").val();
    pr.initialize();
  });
});

// Presentation namespace
var pr = {
  "config": {
    "layout": "qwerty",
    "excludeClosing": false,
    "excludeAlphaNum": false
  },

  initialize: function(config) {
    // Lets you pass in an optional config for testing purposes.
    config = config || pr.config
    xm.getXmod(config.layout + "DevLayer", function(data) {
      var layout = xm.xmodToLayout(data, xm.config.toPresentation);
      pr.labelKeyboard(layout);
    });
  },

  labelKeyboard: function(layout) {
    var layoutObj = pr.layoutToLayoutObj(layout),
        $keyboard = $("#keyboard"),
        $parent = $keyboard.parent();
    // Detach and reattach keyboard to limit manipulating the DOM.
    $keyboard.detach()
    $keyboard.find(".key").each(function() {
      var keycode = $(this).attr("data-keycode");
      pr.labelKey(layoutObj, keycode, this);
    });
    $parent.append($keyboard);
  },

  labelKey: function(layoutObj, keycode, that) {
    var legends = "";
    _.each(layoutObj[keycode], function(character, modLevel) {
      if (pr.isCharacterPrinted(modLevel, character, layoutObj, keycode)) {
        legends += "<span class='" + modLevel + "'>" + character + "</span>"
      }
    });
    // Append all legends for a key at once for performance gain.
    $(that).empty().append(legends);
  },

  // This lets you reference each layoutKey by its keycode.
  layoutToLayoutObj: function(layout) {
    var layoutObj = {};
    _.each(layout, function(layoutKey) {
      layoutObj[layoutKey.keycode] = _.omit(layoutKey, "keycode");
    });
    return layoutObj
  },

  // Prevent duplicate legends from being printed on key.
  isCharacterPrinted: function(modLevel, character, layoutObj, keycode) {
    return ((modLevel !== "altGrShift" ||
              character !== layoutObj[keycode].altGr &&
              character !== layoutObj[keycode].shift) &&
            (modLevel !== "noMod" || 
              character !== layoutObj[keycode].shift &&
              character.toUpperCase() !== layoutObj[keycode].shift) &&
            (modLevel !== "altGr" || 
              character !== layoutObj[keycode].noMod) &&
            (character !== "NoSymbol")
            );
  },

  testIt: function() {
    var corpus = $("#corpus").val(),
        layouts = [pr.config.layout, pr.config.layout + "DevLayer"],
        scores = dl.scoresForXmods(corpus, layouts);
    return scores
  },

  calcFarther: function(scores) {
    var farther = {};
    _.each(scores, function(score, layout) {
      farther[layout] = _.reduce(score.fingers, function(memo, finger) {
                          return memo + finger.distance
                        }, 0)
    });
    return farther;
  }
}