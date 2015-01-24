var testData = {
  xmod: "keycode  13 = 4 dollar F4 F4\nkeycode  44 = j J parenleft parenright\nkeycode  47 = semicolon colon semicolon colon",
  
  layout: [
    {
      "keycode": "13",
      "noMod": "4",
      "shift": "$",
      "altGr": "F4",
      "altGrShift": "F4"
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

  keymap: {
    "4": ["13"],
    "F4": ["13", "108"],
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

  dl.getLayout(
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

  dl.getLayout(
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

QUnit.test("xmodToLayout", function(assert) {
  assert.propEqual(dl.xmodToLayout(testData.xmod), testData.layout);
});

QUnit.test("new layoutKey", function(assert) {
  assert.propEqual(
    new dl.buildLayoutKey("keycode  13 = 4 dollar F4 F4"),
    testData.layout[0]
  );
});

QUnit.test("convertXmodName", function(assert) {
  assert.equal(dl.convertXmodName("4", dl.config.toSymbol), "4", "'4' toSymbol");
  assert.equal(dl.convertXmodName("q", dl.config.toSymbol), "q", "'q' toSymbol");
  assert.equal(dl.convertXmodName("dollar", dl.config.toSymbol), "$", "'dollar' toSymbol");
  assert.equal(dl.convertXmodName("F4", dl.config.toSymbol), "F4", "'F4' toSymbol");
  assert.equal(dl.convertXmodName("", dl.config.toSymbol), "NoSymbol", "'' toSymbol");
});

QUnit.test("isEasierWay", function(assert) {
  assert.equal(dl.isEasierWay(testData.layout[0], "altGrShift"), true);
  assert.equal(dl.isEasierWay(testData.layout[0], "altGr"), false);
  assert.equal(dl.isEasierWay(testData.layout[0], "shift"), false);
  assert.equal(dl.isEasierWay(testData.layout[0], "noMod"), false);

  assert.equal(dl.isEasierWay(testData.layout[1], "altGrShift"), false);
  assert.equal(dl.isEasierWay(testData.layout[1], "altGr"), false);
  assert.equal(dl.isEasierWay(testData.layout[1], "shift"), false);
  assert.equal(dl.isEasierWay(testData.layout[1], "noMod"), false);

  assert.equal(dl.isEasierWay(testData.layout[2], "altGrShift"), true);
  assert.equal(dl.isEasierWay(testData.layout[2], "altGr"), true);
  assert.equal(dl.isEasierWay(testData.layout[2], "shift"), false);
  assert.equal(dl.isEasierWay(testData.layout[2], "noMod"), false);
});

QUnit.test("strokesForCharacter", function(assert) {
  assert.propEqual(dl.strokesForCharacter(testData.layout[1], "noMod"), testData.keymap["j"]);
  assert.propEqual(dl.strokesForCharacter(testData.layout[1], "shift"), testData.keymap["J"]);
  assert.propEqual(dl.strokesForCharacter(testData.layout[1], "altGr"), testData.keymap["("]);
  assert.propEqual(dl.strokesForCharacter(testData.layout[1], "altGrShift"), testData.keymap[")"]);
});