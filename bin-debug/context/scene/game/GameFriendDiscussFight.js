var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var s;
(function (s) {
    var GameFriendDiscussFight = (function (_super) {
        __extends(GameFriendDiscussFight, _super);
        function GameFriendDiscussFight(type) {
            if (type === void 0) { type = 0; }
            var _this = _super.call(this, type ? type : TypeGame.FRIEND_DISCUSS_WAR) || this;
            _this._countdownValue = 3;
            return _this;
        }
        GameFriendDiscussFight.prototype.enter = function () {
            _super.prototype.enter.call(this, 27001);
        };
        return GameFriendDiscussFight;
    }(s.GameSiginPlayerBoss));
    s.GameFriendDiscussFight = GameFriendDiscussFight;
    __reflect(GameFriendDiscussFight.prototype, "s.GameFriendDiscussFight");
})(s || (s = {}));
