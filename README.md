# Blu Martini React Native App

## To Start Project:

open `./ios/LostAvenue.xcodeproject`

Press `Start` button

Check out file `./app/devControlPanel.js` and modify file

---

## Known issues getting started

### Bundler not responding to changes

Probably booting in Release mode
Access `Product -> Scheme -> Edit Scheme` in xCode and edit the build configuration

### Reload shortcut not working

Fixed with bundler / Relase to Debug setting


---

## Reference Docs

### Navitagion Library
https://reactnavigation.org/

###
Build won't work because SVG Library causing link issues

This is a know bug. Follow directions here. This will happen every time react-native link is run
https://github.com/react-native-community/react-native-svg/issues/544
