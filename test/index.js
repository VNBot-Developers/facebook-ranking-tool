const ranking_tool = require("../");
let getRankGroup = ranking_tool({
    idGroup: '337319126769826',
    token: 'EAACW5Fg5N2IBAI68xLusQveAZArvtwGnX0xdKyFHS6SagO1cUC6SNtmGCD78P1diauIXbNN99mlUkAcZCwqXL9FNWYdrOCArsJqNCCIzkTsRYtPmNHXOOQc51ufZBOCzraMWXHiSc2XduAisHJUuJHZAJFIl6pZCrRNJYilQ5TsqJ8sX1h2pNM8fMhu9D6AcZD',
    option: {
        dayRank: 60,
        point: {
            point_per_post: 5,
            point_per_comment: 2,
            point_per_reaction: 1
        }
    }
});

getRankGroup.then(console.log)