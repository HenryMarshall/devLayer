var App = Ember.Application.create();

$(document).ready(function() {
  pr.initialize()

  $('#test-it').click(function() {
    var scores = pr.testIt();
    console.log("scores: ",scores);
  });
});

// Presentation namespace
var pr = {

  initialize: function(layoutName) {
    layoutName = layoutName ? layoutName + "DevLayer" : "qwertyDevLayer";
    xm.getXmod(layoutName, function(data) {
      var layout = xm.xmodToLayout(data, xm.config.toPresentation);
      pr.labelKeyboard(layout);
    });
  },

  labelKeyboard: function(layout) {
    var layoutObj = pr.layoutToLayoutObj(layout),
        $keyboard = $("#keyboard");

    $($keyboard).find(".key").each(function() {
      var keycode = $(this).attr("data-keycode");
      pr.labelKey(layoutObj, keycode, this);
    });
    return $keyboard;
  },

  labelKey: function(layoutObj, keycode, that) {
    _.each(layoutObj[keycode], function(character, modLevel) {
      if (pr.isCharacterPrinted(modLevel, character, layoutObj, keycode)) {
        $("<span />").addClass(modLevel).html(character).appendTo(that);
      }
    });
    return that;
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
        vanilla = $("#layout").find("input[name='layout']").val(),
        devLayer = vanilla + "DevLayer",
        layouts = [vanilla, devLayer],
        scores = dl.scoresForXmods(corpus, layouts);
    return scores
  }
}