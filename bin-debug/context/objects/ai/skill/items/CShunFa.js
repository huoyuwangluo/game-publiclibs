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
    var CShunFa = (function (_super) {
        __extends(CShunFa, _super);
        function CShunFa() {
            return _super.call(this, s.TypeSkill.C_ShunFa) || this;
        }
        CShunFa.prototype.reset = function () {
            _super.prototype.reset.call(this);
            //utils.timer.clear(this, this.doHurt);
        };
        CShunFa.prototype.start = function () {
            _super.prototype.start.call(this);
            this.playTargetEffect();
            //utils.timer.once(300, this, this.doHurt);
        };
        CShunFa.prototype.playTargetEffect = function () {
            var that = this;
            var tX = that._target.x;
            var tY = that._target.y;
            var resIdArr = that._flyEffect.split(";");
            var frameRate = utils.MathUtil.floor(12 * this._body.attackSpeed);
            if (resIdArr[0] != "") {
                this.addBoom(resIdArr[0], true, tX, tY, frameRate);
            }
            if (resIdArr.length > 1) {
                this.addBoom(resIdArr[1], false, tX, tY, frameRate);
            }
        };
        return CShunFa;
    }(s.SkillShowBase));
    s.CShunFa = CShunFa;
    __reflect(CShunFa.prototype, "s.CShunFa");
})(s || (s = {}));
