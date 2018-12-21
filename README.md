# FACEBOOK-RANKING-TOOL

A library to get ranking member in group.

Very easy to install and use.

## INSTALL
run this command:
```bash
npm install facebook-ranking-tool

```

## USE
Create a file `app.js`:
```js
const ranking_tool = require("../");
let getRankGroup = ranking_tool({
    idGroup: '<ID-GROUP>',
    token: '<YOUR_TOKEN || ADMIN_TOKEN>',
    option: {
        dayRank: 60,//how many day ago you want to check rank ?
        point: {
            point_per_post: 5,
            point_per_comment: 2,
            point_per_reaction: 1,
            point_per_commented:1,
            point_per_reactioned:1
        }
    }
});

getRankGroup.then(console.log)
```
And run this command:
```bash
node app.js
```
