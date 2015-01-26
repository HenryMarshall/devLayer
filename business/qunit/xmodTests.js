xm.testData = {
  xmodLines: [
    "keycode  24 = q Q exclam exclam",
    "keycode  44 = j J parenleft parenright",
    "keycode  47 = semicolon colon semicolon colon"
  ],
  
  layout: [
    {
      "keycode": "24",
      "noMod": "q",
      "shift": "Q",
      "altGr": "!",
      "altGrShift": "!"
    },
    {
      "keycode": "44",
      "noMod": "j",
      "shift": "J",
      "altGr": "(",
      "altGrShift": ")"
    },
    {
      "keycode": "47",
      "noMod": ";",
      "shift": ":",
      "altGr": ";",
      "altGrShift": ":"
    }
  ],

  invalidLayoutKey: {
    altGr: "Print",
    altGrShift: "NoSymbol",
    keycode: "218",
    noMod: "Print",
    shift: "NoSymbol"
  },

  chords: {
    "q": ["24"],
    "Q": ["24", "62"],
    "!": ["24", "108"],
    "j": ["44"],
    "J": ["44", "50"],
    "(": ["44", "108"],
    ")": ["44", "108", "50"],
    ";": ["47"],
    ":": ["47", "50"]
  }
};

QUnit.test("getLayout", function(assert) {

  assert.expect(2);

  var doneExisting = assert.async(),
      doneDne = assert.async();

  xm.getLayout(
    "qwerty.txt", 
    function(data) {
      assert.ok(data, "Found existing layout");
      doneExisting();
    },
    function() {
      assert.ok(false, "Failed to find existing layout");
      doneExisting();
    }
  );

  xm.getLayout(
    "foo.bar",
    function(data) {
      assert.ok(false, "Found non-existant layout");
      doneDne();
    },
    function(data) {
      assert.ok(true, "Failed to find non-existant layout")
      doneDne();
    }
  )
});

QUnit.test("xmodToChords", function(assert) {
  var xmod = xm.testData.xmodLines.join('\n');
  assert.propEqual(xm.xmodToChords(xmod), xm.testData.chords);
});

QUnit.test("xmodToLayout", function(assert) {
  var xmod = xm.testData.xmodLines.join('\n');
  assert.propEqual(xm.xmodToLayout(xmod), xm.testData.layout);
});

QUnit.test("new layoutKey", function(assert) {
  assert.propEqual(
    new xm.buildLayoutKey(xm.testData.xmodLines[0]),
    xm.testData.layout[0]
  );
});

QUnit.test("convertXmodName", function(assert) {
  assert.equal(xm.convertXmodName("4"), "4", "'4' toSymbol");
  assert.equal(xm.convertXmodName("q"), "q", "'q' toSymbol");
  assert.equal(xm.convertXmodName("dollar"), "$", "'dollar' toSymbol");
  assert.equal(xm.convertXmodName("F4"), "F4", "'F4' toSymbol");
  assert.equal(xm.convertXmodName(""), "NoSymbol", "'' toSymbol");
});

QUnit.test("isEasierWay", function(assert) {
  function easier(layoutKey, mod, isTrue) {
    assert.equal(xm.isEasierWay(xm.testData.layout[layoutKey], mod), isTrue);
  }

  // q Q exclam exclam
  easier(0, "noMod", false);
  easier(0, "shift", false);
  easier(0, "altGr", false);
  easier(0, "altGrShift", true);

  // j J ( )
  easier(1, "noMod", false);
  easier(1, "shift", false);
  easier(1, "altGr", false);
  easier(1, "altGrShift", false);

  // ; : ; :
  easier(2, "noMod", false);
  easier(2, "shift", false);
  easier(2, "altGr", true);
  easier(2, "altGrShift", true);
});

QUnit.test("strokesForCharacter", function(assert) {
  function strokes(layoutKey, mod, expectedChar) {
    assert.propEqual(
      xm.strokesForCharacter(xm.testData.layout[layoutKey], mod),
      xm.testData.chords[expectedChar],
      "Valid layoutKey returns strokes."
    );
  }

  strokes(1, "noMod", "j");
  strokes(1, "shift", "J");
  strokes(1, "altGr", "(");
  strokes(1, "altGrShift", ")");

  assert.throws(
    function() {
      xm.strokesForCharacter(xm.testData.invalidLayoutKey, "noMod");
    },
    /layoutKey not found on keyboard/,
    "Invalid layoutKey throws error."
  );
});

QUnit.test("buildChordStrokes", function(assert) {
  function testBuild(layoutKeyIdx, mod, isEasier) {
    var layoutKey = xm.testData.layout[layoutKeyIdx],
        expect = {};

    if (!isEasier) {
      expect[layoutKey[mod]] = xm.testData.chords[layoutKey[mod]];
    }

    assert.propEqual(
      xm.buildChordStrokes(layoutKey, mod, {}),
      expect
    );
  }

  testBuild(0, "noMod", false);
  testBuild(0, "shift", false);
  testBuild(0, "altGr", false);
  // Should ignore as there is an easier to type method.
  testBuild(0, "altGrShift", true);
});

QUnit.test("layoutToChords", function(assert) {
  function testLayoutToChords(input, message) {
    assert.propEqual(
      xm.layoutToChords(input),
      xm.testData.chords,
      message
    );
  }

  testLayoutToChords(xm.testData.layout, "Valid input returns chords");

  var invalidLayout = _.clone(xm.testData.layout);
  invalidLayout.push(xm.testData.invalidLayoutKey);

  testLayoutToChords(
    invalidLayout,
    "Layout with unknown keys returns chords for known."
  );
});
