var testData = {
  xmod: "keycode  13 = 4 dollar F4 F4\nkeycode  24 = q Q exclam exclam",
  layout: [
    {
      "keycode": "13",
      "noMod": "4",
      "shift": "$",
      "altGr": "F4",
      "altGrShift": "F4"
    },
    {
      "keycode": "24",
      "noMod": "q",
      "shift": "Q",
      "altGr": "!",
      "altGrShift": "!"
    }
  ]
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
  assert.equal(dl.convertXmodName("F4", dl.config.toSymbol), "F4", "'F4' toSymbol")
  assert.equal(dl.convertXmodName("", dl.config.toSymbol), "NoSymbol", "'' toSymbol")
})
