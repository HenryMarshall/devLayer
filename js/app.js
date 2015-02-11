var App = Ember.Application.create();

App.CanvasGraphComponent = Ember.Component.extend({
  tagName: 'canvas',
  width: 480,
  height: 240,
  incrementCount: 5,
  criteria: 'distance',
  results: {"qwerty":{"fingers":{"leftPinkie":{"strokes":96,"distance":120.57315562029788,"consecutive":4},"leftRing":{"strokes":19,"distance":17.539513490616397,"consecutive":2},"leftMiddle":{"strokes":73,"distance":109.96736998346465,"consecutive":7},"leftIndex":{"strokes":96,"distance":226.92552481855807,"consecutive":7},"leftThumb":{"strokes":4,"distance":0,"consecutive":3},"rightPinkie":{"strokes":99,"distance":261.8117054949552,"consecutive":45},"rightRing":{"strokes":95,"distance":214.9700453635905,"consecutive":10},"rightMiddle":{"strokes":33,"distance":46.7502831993219,"consecutive":1},"rightIndex":{"strokes":75,"distance":177.07273855336229,"consecutive":5},"rightThumb":{"strokes":0,"distance":0,"consecutive":0}},"rows":[64,207,146,169,4]},"qwertyDevLayer":{"fingers":{"leftPinkie":{"strokes":64,"distance":44.546844385304794,"consecutive":3},"leftRing":{"strokes":29,"distance":17.539513490616397,"consecutive":3},"leftMiddle":{"strokes":120,"distance":109.99298890111451,"consecutive":19},"leftIndex":{"strokes":99,"distance":211.25474179858338,"consecutive":7},"leftThumb":{"strokes":4,"distance":0,"consecutive":3},"rightPinkie":{"strokes":69,"distance":160.20578309933003,"consecutive":23},"rightRing":{"strokes":77,"distance":128.8959945457759,"consecutive":6},"rightMiddle":{"strokes":32,"distance":44.51421522182211,"consecutive":1},"rightIndex":{"strokes":75,"distance":177.07273855336229,"consecutive":5},"rightThumb":{"strokes":56,"distance":0,"consecutive":0}},"rows":[0,211,206,148,60]}},
  attributeBindings: ['width', 'height'],

  didInsertElement: function() {
    // Must set c here instead of in init in case elem not yet in DOM in init.
    this.set('c', this.get('element').getContext('2d'));
    this.empty();
    this.drawAxis();
    this.labelX();

    var maxNum = this.maxForCriteria(this.results, this.criteria),
        scale = this.findScale(maxNum, this.incrementCount);

    this.labelY(scale, this.incrementCount);
    this.drawBars(this.results, pr.config.layout, this.criteria, this.incrementCount * scale);
  },

  empty: function() {
    var c = this.get('c');
    c.fillStyle = 'white'
    c.fillRect(0,0, this.get('width'), this.get('height'));
  },

  drawAxis: function() {
    var c = this.get('c');
    c.fillStyle = "black";
    c.lineWidth = 2.0;
    c.beginPath();
    c.moveTo(60, 10);
    c.lineTo(60, this.height - 30);
    c.lineTo(this.width - 30, this.height - 30);
    c.stroke();
  },

  labelX: function() {
    var c = this.get('c');
    var fingers = ["L. Pinkie", "L. Ring", "L. Middle", "L. Index", "L. Thumb",
                  "R. Thumb", "R. Index", "R. Middle", "R. Ring", "R. Pinkie"];

    c.textAlign = "end"
    _.each(fingers, function(finger, idx) {
      c.fillText(finger, 55, idx * 20 + 22);
    });
  },

  // Find a scale for the x-axis with round numbers
  findScale: function(num, incrementCount) {
    var magnitude = Math.pow(10, Math.floor(num).toString().length - 2),
        scale = Math.ceil(num / incrementCount / magnitude) * magnitude;

    return scale;
  },

  labelY: function(scale, incrementCount) {
    // margin-left: 60; margin-right: 30
    var usableWidth = this.width - 90,
        widthPerIncrement = usableWidth / incrementCount,
        c = this.get('c');

    for (var ii = 0; ii < incrementCount + 1; ii++) {
      c.fillText(scale * ii, 65 + ii*widthPerIncrement, this.height - 10);
    };
  },

  maxForCriteria: function(results, criteria) {
    criteriaValues = [];
    _.each(results, function(layout) {
      _.each(layout.fingers, function(value, key) {
        criteriaValues.push(value[criteria]);
      })
    });
    return _.max(criteriaValues)
  },

  drawBars: function(results, layout, criteria, maxScale) {
    // Done here with arrays instead of iterating through object to ensure
    // bars are in the proper order.
    var layouts = [layout, layout+"DevLayer"],
        fingers = ["leftPinkie", "leftRing", "leftMiddle", "leftIndex",
                  "leftThumb", "rightThumb", "rightIndex", "rightMiddle", 
                  "rightRing", "rightPinkie"],
        usableWidth = this.width - 90,
        heightOfBar = 7,
        pixelsPerUnit = usableWidth / maxScale
        c = this.get('c');

    _.each(fingers, function(finger, ii) {
      _.each(layouts, function(layout, jj) {
        // Vanilla columns are black, DevLayer's are red
        c.fillStyle = layouts[0] === layout ? 'black' : 'red'
        c.fillRect(
          61,
          (ii * 20) + (jj * heightOfBar)+ 12,
          results[layout].fingers[finger][criteria] * pixelsPerUnit,
          heightOfBar
        );
      });
    });
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