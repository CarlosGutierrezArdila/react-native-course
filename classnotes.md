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
- json-server --host 192.168.0.17 --watch db.json -p 3001 -d 2000
# Redux
- Flex architechture
- single state for the application, single source of truth
- state is read only, changes only made by actions
- changes made by recucers (functions)
- redux thunk: middleware to write action creators
- Fetch: interface, promise based to fetch resources from server




