# Mercury
send bizcard via SMS, powered by JSON Resume and react-native


## development
- require XCode
- npm install react-native -g
- clone repo
- npm install
- open Mercury.xcodeproj in XCode & run

## production
- checkout `release` branch
- rebase to master
- run `react-native bundle --minify` from project root
- set active Scheme to `Mercury Release > iOS Device`in XCode
- Build > Archive
