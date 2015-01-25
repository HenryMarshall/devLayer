var testData = {
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

  characters: {
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

QUnit.test("xmodToCharacters", function(assert) {
  var xmod = testData.xmodLines.join('\n');
  assert.propEqual(xm.xmodToCharacters(xmod), testData.characters);
});

QUnit.test("xmodToLayout", function(assert) {
  var xmod = testData.xmodLines.join('\n');
  assert.propEqual(xm.xmodToLayout(xmod), testData.layout);
});

QUnit.test("new layoutKey", function(assert) {
  assert.propEqual(
    new xm.buildLayoutKey(testData.xmodLines[0]),
    testData.layout[0]
  );
});

QUnit.test("convertXmodName", function(assert) {
  assert.equal(xm.convertXmodName("4", xm.config.toSymbol), "4", "'4' toSymbol");
  assert.equal(xm.convertXmodName("q", xm.config.toSymbol), "q", "'q' toSymbol");
  assert.equal(xm.convertXmodName("dollar", xm.config.toSymbol), "$", "'dollar' toSymbol");
  assert.equal(xm.convertXmodName("F4", xm.config.toSymbol), "F4", "'F4' toSymbol");
  assert.equal(xm.convertXmodName("", xm.config.toSymbol), "NoSymbol", "'' toSymbol");
});

QUnit.test("isEasierWay", function(assert) {
  function easier(physicalKey, mod, isTrue) {
    assert.equal(xm.isEasierWay(testData.layout[physicalKey], mod), isTrue);
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
  function strokes(physicalKey, mod, expectedChar) {
    assert.propEqual(
      xm.strokesForCharacter(testData.layout[physicalKey], mod),
      testData.characters[expectedChar]
    );
  }

  strokes(1, "noMod", "j");
  strokes(1, "shift", "J");
  strokes(1, "altGr", "(");
  strokes(1, "altGrShift", ")");
});

QUnit.test("buildCharacterStrokes", function(assert) {
  function testBuild(physicalKeyIdx, mod, isEasier) {
    var physicalKey = testData.layout[physicalKeyIdx],
        expect = {};

    if (!isEasier) {
      expect[physicalKey[mod]] = testData.characters[physicalKey[mod]];
    }

    assert.propEqual(
      xm.buildCharacterStrokes(physicalKey, mod, {}),
      expect
    );
  }

  testBuild(0, "noMod", false);
  testBuild(0, "shift", false);
  testBuild(0, "altGr", false);
  // Should ignore as their is an easier to type method.
  testBuild(0, "altGrShift", true);
});

QUnit.test("layoutToCharacters", function(assert) {
  assert.propEqual(xm.layoutToCharacters(testData.layout), testData.characters);
});
