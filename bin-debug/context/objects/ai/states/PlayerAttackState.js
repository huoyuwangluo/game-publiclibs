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
    var PlayerAttackState = (function (_super) {
        __extends(PlayerAttackState, _super);
        function PlayerAttackState() {
            return _super.call(this) || this;
        }
        PlayerAttackState.prototype.getUsableSkill = function () {
            var that = this;
            var result;
            for (var key in that._skillList) {
                var skillData = that._skillList[key];
                if (!that.checkCding(skillData) && that.checkDistance(skillData)) {
                    if (!result || this.getCd(skillData) > this.getCd(result)) {
                        result = skillData;
                    }
                }
            }
            return result;
        };
        return PlayerAttackState;
    }(s.AttackState));
    s.PlayerAttackState = PlayerAttackState;
    __reflect(PlayerAttackState.prototype, "s.PlayerAttackState");
})(s || (s = {}));
