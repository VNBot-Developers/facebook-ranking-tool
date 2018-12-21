const request = require('request-promise').defaults({ json: true });
const fetch = op => request(op).catch(() => Promise.resolve({ error: true }));
const Ranking = require("./rank");
module.exports = async function({ idGroup, token, option }) {
    const rank = new Ranking(option.point || { point_per_post: 1 });
    let getInfo = await fetch({
        url: `https://z-m-graph.facebook.com/v2.10/${idGroup}`,
        qs: {
            access_token: token
        }
    })

    if (getInfo.error) throw Error('IdGroup hoac token khong hop le');

    let { name, privacy } = getInfo;
    let dayRank = option.dayRank || 30;
    let since = new Date((new Date()).getTime() - dayRank * 24 * 60 * 60 * 1000);
    const defaultFeedOption = {
        url: `https://z-m-graph.facebook.com/v2.10/${idGroup}/feed`,
        qs: {
            fields: 'from',
            since: since.toISOString(),
            access_token: token,
            _: since.getTime()
        }
    }
    async function pagingFeed(nextpage) {
        let result = await fetch(nextpage);
        await result.data.forEach(async function(post) {

            let [reactions, comments] = await Promise.all([getReaction(post.id), getComment(post.id)]);
            reactions.forEach(function(reaction) {
                rank.reaction(reaction);
                rank.reactioned(post.from.id);
            });
            comments.forEach(function(comment) {
                rank.comment(comment);
                rank.commented(post.from.id)
            });
            rank.post(post.from.id);
        });
        if (result.paging && result.paging.next) return pagingFeed(result.paging.next);
    }
    async function pagingReaction(data = [], nextpage) {
        let result = await fetch(nextpage);
        data = data.concat(result.data.map(e => e.id))
        if (result.paging && result.paging.next) return pagingReaction(data, result.paging.next)
        else return data;

    }

    function getReaction(idPost) {
        const defaultReactionsOption = {
            url: `https://z-m-graph.facebook.com/v2.10/${idPost}/reactions`,
            qs: {
                limit: 500,
                access_token: token,
                _: since.getTime()
            }
        }
        return pagingReaction([], defaultReactionsOption);
    }

    async function pagingComment(data = [], nextpage) {
        let result = await fetch(nextpage);
        data = data.concat(result.data.map(e => e.from.id))
        if (result.paging && result.paging.next) return pagingComment(data, result.paging.next)
        else return data;

    }

    function getComment(idPost) {
        const defaultReactionsOption = {
            url: `https://z-m-graph.facebook.com/v2.10/${idPost}/comments`,
            qs: {
                limit: 500,
                fields: 'from',
                access_token: token,
                _: since.getTime()
            }
        }
        return pagingComment([], defaultReactionsOption);
    }

    await pagingFeed(defaultFeedOption)

    return { name, privacy, rank: rank.render() }
}
