# React Native
- Cross platform, native apps for android and ios without webview
- uses JS
- ability to use npm modules
## Hybryd mobile development
- android: v8 / IOS: javaScript core
- RN bridge runs on top of each engine
- Expo SDK
- **To fix watchers error (Manjaro) runnig RN on expo:**
```shell
echo fs.inotify.max_user_watches=524288 | sudo tee /etc/sysctl.d/40-max-user-watches.conf && sudo sysctl --system
```
# React Native components
- React components, state, props, JSX
- Uses native components instead of web components to build the view
# React native navigation
- Navigators: stack, tab, drawer
- npm install react-navigation --save
- Stack navigation: transition between screens and going back
- Drawer: provides contruction of a side drawer
- Tab: bottom tab navigation suport
# Icon Fonts and buttons
- set of symbols
- React native elemnts icons
# json server
- simulate get rest server
- json-server --host 192.168.0.127 --watch db.json -p 3001 -d 2000
# Redux
- Flex architechture
- single state for the application, single source of truth
- state is read only, changes only made by actions
- changes made by recucers (functions)
- redux thunk: middleware to write action creators
- Fetch: interface, promise based to fetch resources from server
# Forms and modals
- **Forms:** data entry through "form-like" elements:
 - TextInput
 - input from react-native-elements
 - switch, slider and picker
- **Modals:** open from a host component, track the visibility in the state of host component
# Animations
- Animated API
- value, valuexy and interpolate methods
- Animated. Image, View, Text ScrollView
- React-native-animatable: precompose animations using Animated API
 # Gestures
 - interating with the app by manipulating UI element on the screen
 - **PanResponder:** Reconciles several touches to recognize touches, and multi touch


