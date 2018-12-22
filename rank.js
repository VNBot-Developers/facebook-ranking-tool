module.exports = class Ranking {
    constructor(point) {
        let { point_per_post, point_per_comment, point_per_commented, point_per_reaction, point_per_reactioned, point_per_share, point_per_shared } = point;

        this.point_per_post = point_per_post || 1;
        this.point_per_comment = point_per_comment || 1;
        this.point_per_reaction = point_per_reaction || 1;
        this.point_per_share = point_per_share || 1;
        this.point_per_commented = point_per_commented || this.point_per_comment;
        this.point_per_reactioned = point_per_reactioned || this.point_per_reaction;
        this.point_per_shared = point_per_shared || this.point_per_share;
        this.user = new Object();

    }
    initUser(userID) {
        if (!this.user[`${userID}`]) {
            this.user[`${userID}`] = new Object({
                userID,
                point: 0,
                post: 0,
                comment: 0,
                reaction: 0,
                share: 0,
                commented: 0,
                reactioned: 0,
                shared: 0
            });
        }
    }

    post(userID) {

        this.initUser(userID);
        this.user[`${userID}`].post++;
        this.user[`${userID}`].point += this.point_per_post;
    }

    reaction(userID) {
        this.initUser(userID);
        this.user[`${userID}`].reaction++;
        this.user[`${userID}`].point += this.point_per_reaction;
    }
    reactioned(userID) {
        this.initUser(userID);
        this.user[`${userID}`].reactioned++;
        this.user[`${userID}`].point += this.point_per_reactioned;
    }


    comment(userID) {
        this.initUser(userID);
        this.user[`${userID}`].comment++;
        this.user[`${userID}`].point += this.point_per_comment;
    }
    commented(userID) {
        this.initUser(userID);
        this.user[`${userID}`].commented++;
        this.user[`${userID}`].point += this.point_per_commented;
    }


    share(userID) {
        this.initUser(userID);
        this.user[`${userID}`].share++;
        this.user[`${userID}`].point += this.point_per_share;
    }
    shared(userID) {
        this.initUser(userID);
        this.user[`${userID}`].shared++;
        this.user[`${userID}`].point += this.point_per_shared;
    }


    render(stat) {
        if(stat == true) return this.user;
        return Object.values(this.user).sort((a, b) => b.point - a.point);
    }
}
