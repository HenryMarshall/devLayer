var analyzer = {
  config: {
    corpus: "for (var i = foo.length - 1; i >= 0; i--) {\nif (foo[i] === \"foo\") {\nbar++;\n}\n}",
    homerow: {
      "leftPinkie": 38,
      "leftRing": 39,
      "leftMiddle": 40,
      "leftIndex": 41,
      "leftThumb": 65,
      "rightThumb": 108,
      "rightIndex": 44,
      "rightMiddle": 45,
      "rightRing": 46,
      "rightPinkie": 47
    },
    keyboard: {
      // qwerty: 1
      "10": { 
        "hand": "left",
        "finger": "leftPinkie",
        "x": 1,
        "y": 0
      }, 
      // qwerty: 2  
      "11": { 
        "hand": "left",
        "finger": "leftRing",
        "x": 2,
        "y": 0
      }, 
      // qwerty: 3  
      "12": { 
        "hand": "left",
        "finger": "leftMiddle",
        "x": 3,
        "y": 0
      }, 
      // qwerty: 4  
      "13": { 
        "hand": "left",
        "finger": "leftIndex",
        "x": 4,
        "y": 0
      }, 
      // qwerty: 5  
      "14": { 
        "hand": "left",
        "finger": "leftIndex",
        "x": 5,
        "y": 0
      }, 
      // qwerty: 6  
      "15": { 
        "hand": "right",
        "finger": "rightIndex",
        "x": 6,
        "y": 0
      }, 
      // qwerty: 7  
      "16": { 
        "hand": "right",
        "finger": "rightIndex",
        "x": 7,
        "y": 0
      }, 
      // qwerty: 8  
      "17": { 
        "hand": "right",
        "finger": "rightMiddle",
        "x": 8,
        "y": 0
      }, 
      // qwerty: 9  
      "18": { 
        "hand": "right",
        "finger": "rightRing",
        "x": 9,
        "y": 0
      }, 
      // qwerty: 0  
      "19": { 
        "hand": "right",
        "finger": "rightPinkie",
        "x": 10,
        "y": 0
      }, 
      // qwerty: minus  
      "20": { 
        "hand": "right",
        "finger": "rightPinkie",
        "x": 11,
        "y": 0
      }, 
      // qwerty: equal  
      "21": { 
        "hand": "right",
        "finger": "rightPinkie",
        "x": 12,
        "y": 0
      }, 
      // qwerty: BackSpace  
      "22": { 
        "hand": "right",
        "finger": "rightPinkie",
        "x": 13,
        "y": 0
      }, 
      // qwerty: Tab  
      "23": { 
        "hand": "left",
        "finger": "leftPinkie",
        "x": 0.5,
        "y": 1
      }, 
      // qwerty: q  
      "24": { 
        "hand": "left",
        "finger": "leftPinkie",
        "x": 1.5,
        "y": 1
      }, 
      // qwerty: w  
      "25": { 
        "hand": "left",
        "finger": "leftRing",
        "x": 2.5,
        "y": 1
      }, 
      // qwerty: e  
      "26": { 
        "hand": "left",
        "finger": "leftMiddle",
        "x": 3.5,
        "y": 1
      }, 
      // qwerty: r  
      "27": { 
        "hand": "left",
        "finger": "leftIndex",
        "x": 4.5,
        "y": 1
      }, 
      // qwerty: t  
      "28": { 
        "hand": "left",
        "finger": "leftIndex",
        "x": 5.5,
        "y": 1
      }, 
      // qwerty: y  
      "29": { 
        "hand": "right",
        "finger": "rightIndex",
        "x": 6.5,
        "y": 1
      }, 
      // qwerty: u  
      "30": { 
        "hand": "right",
        "finger": "rightIndex",
        "x": 7.5,
        "y": 1
      }, 
      // qwerty: i  
      "31": { 
        "hand": "right",
        "finger": "rightMiddle",
        "x": 8.5,
        "y": 1
      }, 
      // qwerty: o  
      "32": { 
        "hand": "right",
        "finger": "rightRing",
        "x": 9.5,
        "y": 1
      }, 
      // qwerty: p  
      "33": { 
        "hand": "right",
        "finger": "rightPinkie",
        "x": 10.5,
        "y": 1
      }, 
      // qwerty: bracketleft  
      "34": { 
        "hand": "right",
        "finger": "rightPinkie",
        "x": 11.5,
        "y": 1
      }, 
      // qwerty: bracketright  
      "35": { 
        "hand": "right",
        "finger": "rightPinkie",
        "x": 12.5,
        "y": 1
      }, 
      // qwerty: Return  
      "36": { 
        "hand": "right",
        "finger": "rightPinkie",
        "x": 12.75,
        "y": 2
      }, 
      // qwerty: Control_L  
      "37": { 
        "hand": "left",
        "finger": "leftPinkie",
        "x": 0,
        "y": 4
      }, 
      // qwerty: a  
      "38": { 
        "hand": "left",
        "finger": "leftPinkie",
        "x": 1.75,
        "y": 2
      }, 
      // qwerty: s  
      "39": { 
        "hand": "left",
        "finger": "leftRing",
        "x": 2.75,
        "y": 2
      }, 
      // qwerty: d  
      "40": { 
        "hand": "left",
        "finger": "leftMiddle",
        "x": 3.75,
        "y": 2
      }, 
      // qwerty: f  
      "41": { 
        "hand": "left",
        "finger": "leftIndex",
        "x": 4.75,
        "y": 2
      }, 
      // qwerty: g  
      "42": { 
        "hand": "left",
        "finger": "leftIndex",
        "x": 5.75,
        "y": 2
      }, 
      // qwerty: h  
      "43": { 
        "hand": "right",
        "finger": "rightIndex",
        "x": 6.75,
        "y": 2
      }, 
      // qwerty: j  
      "44": { 
        "hand": "right",
        "finger": "rightIndex",
        "x": 7.75,
        "y": 2
      }, 
      // qwerty: k  
      "45": { 
        "hand": "right",
        "finger": "rightMiddle",
        "x": 8.75,
        "y": 2
      }, 
      // qwerty: l  
      "46": { 
        "hand": "right",
        "finger": "rightRing",
        "x": 9.75,
        "y": 2
      }, 
      // qwerty: semicolon  
      "47": { 
        "hand": "right",
        "finger": "rightPinkie",
        "x": 10.75,
        "y": 2
      }, 
      // qwerty: apostrophe  
      "48": { 
        "hand": "right",
        "finger": "rightPinkie",
        "x": 11.75,
        "y": 2
      }, 
      // qwerty: grave  
      "49": { 
        "hand": "left",
        "finger": "leftPinkie",
        "x": 0,
        "y": 0
      }, 
      // qwerty: Shift_L  
      "50": { 
        "hand": "left",
        "finger": "leftPinkie",
        "x": 1.25,
        "y": 3
      }, 
      // qwerty: backslash  
      "51": { 
        "hand": "right",
        "finger": "rightPinkie",
        "x": 13.5,
        "y": 1
      }, 
      // qwerty: z  
      "52": { 
        "hand": "left",
        "finger": "leftPinkie",
        "x": 2.25,
        "y": 3
      }, 
      // qwerty: x  
      "53": { 
        "hand": "left",
        "finger": "leftRing",
        "x": 3.25,
        "y": 3
      }, 
      // qwerty: c  
      "54": { 
        "hand": "left",
        "finger": "leftMiddle",
        "x": 4.25,
        "y": 3
      }, 
      // qwerty: v  
      "55": { 
        "hand": "left",
        "finger": "leftIndex",
        "x": 5.25,
        "y": 3
      }, 
      // qwerty: b  
      "56": { 
        "hand": "left",
        "finger": "leftIndex",
        "x": 6.25,
        "y": 3
      }, 
      // qwerty: n  
      "57": { 
        "hand": "right",
        "finger": "rightIndex",
        "x": 7.25,
        "y": 3
      }, 
      // qwerty: m  
      "58": { 
        "hand": "right",
        "finger": "rightIndex",
        "x": 8.25,
        "y": 3
      }, 
      // qwerty: comma  
      "59": { 
        "hand": "right",
        "finger": "rightMiddle",
        "x": 9.25,
        "y": 3
      }, 
      // qwerty: period  
      "60": { 
        "hand": "right",
        "finger": "rightRing",
        "x": 10.25,
        "y": 3
      }, 
      // qwerty: slash  
      "61": { 
        "hand": "right",
        "finger": "rightPinkie",
        "x": 11.25,
        "y": 3
      }, 
      // qwerty: Shift_R  
      "62": { 
        "hand": "right",
        "finger": "rightPinkie",
        "x": 12.25,
        "y": 3
      }, 
      // qwerty: Alt_L  
      "64": { 
        "hand": "left",
        "finger": "leftThumb",
        "x": 2.5,
        "y": 4
      }, 
      // qwerty: space  
      "65": { 
        "hand": "left",
        "finger": "leftThumb",
        "x": 6.875,
        "y": 4
      }, 
      // qwerty: Caps_Lock  
      "66": { 
        "hand": "left",
        "finger": "leftPinkie",
        "x": 0.75,
        "y": 2
      }, 
      // qwerty: Alt_R
      "108": {
        "hand": "right",
        "finger": "rightThumb",
        "x": 10,
        "y": 4
      }
    },
    layerPriority: ["altGr", "noMod", "altGrShift", "shift"]
  },
  previousStroke: {
    finger: undefined,
    hand: undefined,
    keycode: undefined,
    shift: false,
    altGr: false
  },
  resultsBuffer: undefined,
  results: {},
  keymap: {},

  initialize: function() {
    var fs = require('fs');

    fs.readFile("./layouts.json", "utf-8", function(err, data) {

      if (err) throw err;

      // TODO: Replace with a JSON parser
      var layouts = eval('(' + data + ')');

      // We compile a keymap for every layout being tested.
      for (var layout in layouts) {
        // Check that layout isn't inherited from prototype.
        if (layouts.hasOwnProperty(layout)) {
          analyzer.keymap[layout] = analyzer.defineKeymapForLayout(layouts[layout]);
        }
      }
      console.log("Intialization complete; Begin Analyzing");
      analyzer.analyzeCorpus();
    });
  },
  
  defineKeymapForLayout: function(layout) {

    var layoutKeymap = {};

    // Used keypress is the one with the lowest layerPriority and keycode
    for (var ii = 0; ii < this.config.layerPriority.length; ii++) {
      var layer = this.config.layerPriority[ii];

      for (var jj = 0; jj < layout.length; jj++) {
        var key = layout[jj]
        var character = key[layer];

        // If there is no established way of entering this character; create one
        if (!layoutKeymap.hasOwnProperty(character)){

          layoutKeymap[character] = {
            keycode: key.keycode,
            altGr: layer === "altGr" || layer === "altGrShift",
            shift: layer === "shift" || layer === "altGrShift",
          };

          var physicalKey = this.config.keyboard[key.keycode]

          // Add key/value pairs of physicalKey to layoutKeymap
          for (var attr in physicalKey) {
            if (physicalKey.hasOwnProperty(attr)) {
              layoutKeymap[character][attr] = physicalKey[attr];
            }
          }
        }
      };

    };

    return layoutKeymap;
  },

  analyzeCorpus: function() {
    var corpusCharacters = this.config.corpus.split('');

    for (var layout in this.keymap) {
      this.results[layout] = new score();

      for (var ii = 0; ii < corpusCharacters.length; ii++) {
        var corpusCharacter = corpusCharacters[ii];

        // If corpusCharacter can legally be entered on the given layout
        if (this.keymap[layout].hasOwnProperty(corpusCharacter)) {
          this.resultsBuffer = new score();

          var currentKey = this.keymap[layout][corpusCharacter];
          this.registerStroke(currentKey);

          // Recursively increment results by buffer
          this.results[layout] = this.incrementResults(this.results[layout]);
        }
        else {
          console.log("Invalid character: ", corpusCharacter);
        }
      }
    }

    for (var layout in this.results) {
      console.log("this.results." + layout + ": ", this.results[layout]);
    }
  },

  incrementResults: function(obj1, obj2) {
    if (obj2 === undefined) {
      obj2 = this.resultsBuffer;
    }

    var resultObj = {};

    for (var key in obj1) {
      if (obj2.hasOwnProperty(key)) {
        // Sum values if number
        if (typeof obj1[key] === "number" && typeof obj2[key] === "number") {
          resultObj[key] = obj1[key] + obj2[key];
        }
        // Otherwise recursively call function
        else {
          resultObj[key] = this.incrementResults(obj1[key], obj2[key]);
        }
      }
      else {
        console.log("Unable to merge.", obj1, obj2);
      }
    }

    return resultObj;
  },

  registerStroke: function(currentKey) {
    var previousKeycode = this.previousStroke.keycode,
        currentKeycode = currentKey.keycode,
        currentFingerResults = this.resultsBuffer.finger[currentKey.finger];

    currentFingerResults.strokes++;
    this.resultsBuffer.row[currentKey.y]++;

    if (currentKey.finger === this.previousStroke.finger) {
      currentFingerResults.consecutive++;
      
      // Increment finger travel distance to new key.
      this.moveFingerBetween(previousKeycode, currentKeycode);
    }
    else {
      // Increment finger travel distance for the previous stroke's finger to
      // account for a return to the homerow.
      this.moveFingerBetween(previousKeycode);

      // Increment finger travel distance for new finger.
      this.moveFingerBetween(currentKeycode)
    }

    this.modifierKeys(currentKey);

    // Set previousStroke to reflect new stroke
    for (var attr in this.previousStroke) {
      this.previousStroke[attr] = currentKey[attr];
    }
  },

  modifierKeys: function(currentKey) {

    if (currentKey.altGr && !this.previousStroke.altGr) {
      this.resultsBuffer.finger.rightThumb++;
      this.resultsBuffer.row[4]++;
    }

    // As per best practices, this assumes that should a typist write "FJ" they
    // change from the right to the left shift. This is important to the 
    // moveFingerBetween calculation, but may be unrealistic.

    var previousHand = this.previousStroke.hand,
        previousFinger = this.previousStroke.finger,
        currentHand = currentKey.hand,
        currentFinger = currentKey.finger;

    if (currentKey.shift) {
      if (this.previousStroke.shift) {
        if (previousHand !== currentHand) {
          // Unshift previous stroke
          this.shiftStroke(previousHand, currentFinger, false);
          // Shift current stroke
          this.shiftStroke(currentHand, previousFinger, true);
        }
      }
      else {
        // Shift current stroke
        this.shiftStroke(currentHand, previousFinger, true);
      }
    }
    else if (this.previousStroke.shift) {
      // Unshift previous stroke
      this.shiftStroke(previousHand, currentFinger, false)
    }
  },

  shiftStroke: function(oppositeHand, sequentialFinger, incrementStrokes) {
    var shiftFinger,
        shiftKeycode;

    // oppositeHand strikes the character key and thus the opposite strikes the 
    // shift to complete the chord.
    if (oppositeHand === "left") {
      // 62 and 50 are xmodmap keycodes for the right/left shifts respectively.
      shiftKeycode = 62;
      shiftFinger = "rightPinkie";
    }
    else {
      shiftKeycode = 50;
      shiftFinger = "leftPinkie";
    }

    this.moveFingerBetween(shiftKeycode);

    // Consider the consecutive uses of the leftPinkie in the string "aL"
    if (sequentialFinger === shiftFinger) {
      this.resultsBuffer.finger[shiftFinger].consecutive++;
    }

    if (incrementStrokes) {
      this.resultsBuffer.finger[shiftFinger].strokes++;
      this.resultsBuffer.row[3]++;
    }
  },

  moveFingerBetween: function(keycode1, keycode2) {
    // The first time this is called previousStroke.keycode is undefined.
    if (keycode1 !== undefined) {

      var key1 = this.config.keyboard[keycode1],
          finger = key1.finger;

      // If keycode2 is undefined return finger to homerow
      if (keycode2 === undefined) {
        keycode2 = this.config.homerow[finger];
      }

      var key2 = this.config.keyboard[keycode2];

      var x1 = key1.x,
          y1 = key1.y,
          x2 = key2.x,
          y2 = key2.y;

      var distance = Math.sqrt(Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2));

      this.resultsBuffer.finger[finger].distance += distance;
    }
  },

// End analyzer namespace
};


// TODO: put finger constructor in namespace
function finger(strokes, distance, consecutive) {
  this.strokes = strokes,
  this.distance = distance,
  this.consecutive = consecutive
}

function score() {
  this.finger = {
    leftPinkie: new finger(0,0,0),
    leftRing: new finger(0,0,0),
    leftMiddle: new finger(0,0,0),
    leftIndex: new finger(0,0,0),
    leftThumb: new finger(0,0,0),
    rightPinkie: new finger(0,0,0),
    rightRing: new finger(0,0,0),
    rightMiddle: new finger(0,0,0),
    rightIndex: new finger(0,0,0),
    rightThumb: new finger(0,0,0)
  },
  // Rows are indexed from the top (number, tab, caps, shift, ctrl). This is an
  // object instead of an array to make recursive summing easier to implement.
  this.row = {
    0: 0,
    1: 0,
    2: 0,
    3: 0,
    4: 0
  }
}

analyzer.initialize();