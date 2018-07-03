echo "rm -rf ios/build"
rm -rf ios/build

echo "rm -rf android/build"
rm -rf android/build

echo "watchman watch-del-all"
watchman watch-del-all

echo "rm -rf $TMPDIR/react-*"
rm -rf $TMPDIR/react-*

echo "rm -rf $TMPDIR/metro-*"
rm -rf $TMPDIR/metro-*

echo "brew update"
brew update

echo "brew upgrade"
brew upgrade

echo "rm -rf node_modules"
rm -rf node_modules

echo "yarn cache clean"
yarn cache clean

echo "yarn install"
yarn install

echo "react-native link"
react-native link
