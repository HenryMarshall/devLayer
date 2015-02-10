var App = Ember.Application.create();

App.ApplicationController = Ember.ObjectController.extend({
  init: function() {
    this.set('results', {});
  }
});

App.CanvasConsecutiveComponent = Ember.Component.extend({
  tagName: 'canvas',
  width: 480,
  height: 240,
  results: {"qwerty":{"fingers":{"leftPinkie":{"strokes":96,"distance":120.57315562029788,"consecutive":4},"leftRing":{"strokes":19,"distance":17.539513490616397,"consecutive":2},"leftMiddle":{"strokes":73,"distance":109.96736998346465,"consecutive":7},"leftIndex":{"strokes":96,"distance":226.92552481855807,"consecutive":7},"leftThumb":{"strokes":4,"distance":0,"consecutive":3},"rightPinkie":{"strokes":99,"distance":261.8117054949552,"consecutive":45},"rightRing":{"strokes":95,"distance":214.9700453635905,"consecutive":10},"rightMiddle":{"strokes":33,"distance":46.7502831993219,"consecutive":1},"rightIndex":{"strokes":75,"distance":177.07273855336229,"consecutive":5},"rightThumb":{"strokes":0,"distance":0,"consecutive":0}},"rows":[64,207,146,169,4]},"qwertyDevLayer":{"fingers":{"leftPinkie":{"strokes":64,"distance":44.546844385304794,"consecutive":3},"leftRing":{"strokes":29,"distance":17.539513490616397,"consecutive":3},"leftMiddle":{"strokes":120,"distance":109.99298890111451,"consecutive":19},"leftIndex":{"strokes":99,"distance":211.25474179858338,"consecutive":7},"leftThumb":{"strokes":4,"distance":0,"consecutive":3},"rightPinkie":{"strokes":69,"distance":160.20578309933003,"consecutive":23},"rightRing":{"strokes":77,"distance":128.8959945457759,"consecutive":6},"rightMiddle":{"strokes":32,"distance":44.51421522182211,"consecutive":1},"rightIndex":{"strokes":75,"distance":177.07273855336229,"consecutive":5},"rightThumb":{"strokes":56,"distance":0,"consecutive":0}},"rows":[0,211,206,148,60]}},
  attributeBindings: ['width', 'height'],

  didInsertElement: function() {
    // Must set c here instead of in init in case elem not yet in DOM in init.
    this.set('c', this.get('element').getContext('2d'));
    this.empty();
  },

  empty: function() {
    var c = this.get('c');
    c.fillStyle = 'white'
    c.fillRect(0,0, this.get('width'), this.get('height'));
  }
});

$(document).ready(function() {
  pr.initialize()

  $('#test-it').click(function() {
    var scores = pr.testIt();
    var percentFarther = pr.calcFarther(scores, pr.config);

    console.log("scores: ",scores);
    console.log("farther: ",percentFarther);

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

  calcFarther: function(scores, config) {
    var farther = {};
    _.each(scores, function(score, layout) {
      farther[layout] = _.reduce(score.fingers, function(memo, finger) {
                          return memo + finger.distance;
                        }, 0)
    });
    var devLayerFullName = config.layout + "DevLayer";
    var percentFarther = (farther[config.layout] - farther[devLayerFullName])
                         / farther[devLayerFullName] * 100;
    return percentFarther;
  }
}