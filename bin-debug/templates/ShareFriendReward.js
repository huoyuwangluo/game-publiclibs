var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var templates;
(function (templates) {
    var ShareFriendReward = (function () {
        function ShareFriendReward() {
        }
        Object.defineProperty(ShareFriendReward.prototype, "id", {
            get: function () {
                return this._data[0];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(ShareFriendReward.prototype, "name", {
            get: function () {
                return this._data[1];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(ShareFriendReward.prototype, "type", {
            get: function () {
                return this._data[2];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(ShareFriendReward.prototype, "params1", {
            get: function () {
                return this._data[3];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(ShareFriendReward.prototype, "params2", {
            get: function () {
                return this._data[4];
            },
            enumerable: true,
            configurable: true
        });
        ;
        Object.defineProperty(ShareFriendReward.prototype, "rewards", {
            get: function () {
                return this._data[5];
            },
            enumerable: true,
            configurable: true
        });
        ;
        ShareFriendReward.prototype.decode = function (data) {
            this._data = data;
        };
        return ShareFriendReward;
    }());
    templates.ShareFriendReward = ShareFriendReward;
    __reflect(ShareFriendReward.prototype, "templates.ShareFriendReward");
})(templates || (templates = {}));
