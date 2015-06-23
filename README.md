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
- select `Mercury Release` Scheme in XCode
- Build > Archive
