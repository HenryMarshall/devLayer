*DevLayer*

DevLayer is a .xmodmap keyboard layout generator that puts frequently used programming keys closer to the homerow. Because it places these keys on the AltGr layer it is compatible with any layout that does *not* utilize this key (e.g., QWERTY, Dvorak, Colemak, Workman). 

If you *do* rely on the AltGr key to type foreign characters, DevLayer is *not* for you. It replaces these keys with various programming keys.


**Installation and Use**

You can get a version of DevLayer customized to your preferences from [the configurator](#). This is the preffered download method. Alternatively, you can download a handful of common defaults from the [github page](http://github.com/hbaughman/DevLayer). If you're not sure which file to use, you probably want `.qwertyDevLayer`.

You can enable the layout with the command `xmodmap ~/.qwertyDevLayer` (change qwerty to your layout if applicable). To get the layout to load on startup you can add it to your startup scripts in ~/.xinitrc thusly:

    if [ -s ~/.qwertyDevLayer ]; then
        xmodmap ~/.qwertyDevLayer
    fi

DevLayer is intended to be used by pressing the AltGr key with your right thumb and the corresponding character key. It is recommended that you print out a character map from the configurator and hang it near your keyboard while your learn the new layout.


**Why use DevLayer**

Much effort has gone into designing key layouts that minimize finger travel and improve comfort when touch typing in English (see the [Colemak](http://www.colemak.com/) or [Dvorak](http://en.wikipedia.org/wiki/Dvorak_Simplified_Keyboard) layouts). In contrast, virtually effort has been spent optimizing keyboards for various programming languages.

In fact, some of the most frequently used keys, including `/?;:'"[]{}\|-_+=0)`, backspace, and enter, are pressed by a single finger. In the following javascript snippet, fully 31% of characters are typed with your overloaded right pinkie on a traditional keyboard:

    for (var i = foo.length - 1; i >= 0; i--) {
      if (foo[i] === "foo") { 
        bar++;
      }
    }

DevLayer improves load balancing tremendously and vastly reduces consecutive keypresses with the same finger. It does this by using the right alt (AltGr) like a second shift modifier. For example, you may type `=` by pressing `AltGr + l` (on a QWERTY keyboard).

DevLayer further puts common letter sequences into convenient finger rolls which makes  `(){}` as easy to type as `asdf`.

The best part of DevLayer is that it's a no commitment change which coexists with whatever layout you are currently using. This means you can slowly transition to your new key map without losing any of your existing speed. Further, this means you can switch off when pair-programming without having to fiddle with keyboard settings. If you want to jump in head-first and force the change check out the "hardcore" xmodmap files which disable the traditional key inputs (e.g., `Shift + 8` for `*`).

Check out [the configurator](#) to test it with your own code snippets and see the reduction in finger travel and consecutive finger use yourself. You can also make tweaks to the layout, like remapping your CapsLock key to Backspace, Control, or Escape before downloading.


**Implementation**

Physical keys are internally referred to by their Xmodmap keycodes in decimal notation. 

A list of these keycodes and the currently associated letters can be obtained by running `xmodmap -pke`. [Here is an image](http://screenshots.debian.net/screenshots/x/xkeycaps/325_large.png) of the keycodes written on their respective keycaps (albeit in hex notation).


**FIXME**

* Resolve magic number in key-width sass mixin.


**TODO**

* Include a map of DevLayer on the github page.


**Long-Term Objectives**

* Port to Windows and [Mac (.keylayout xml)](https://superuser.com/questions/665494/how-to-make-a-custom-keyboard-layout-in-macos)