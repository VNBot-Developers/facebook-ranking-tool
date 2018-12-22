const ranking_tool = require("../");
let getRankGroup = ranking_tool({
    idGroup: '337319126769826',
    token: 'EAAA',
    option: {
        dayRank: 60,
        point: {
            point_per_post: 5,
            point_per_comment: 2,
            point_per_reaction: 1
        }
    }
});

getRankGroup.then(console.log).catch(console.log)