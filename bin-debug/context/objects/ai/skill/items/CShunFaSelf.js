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
    var CShunFaSelf = (function (_super) {
        __extends(CShunFaSelf, _super);
        function CShunFaSelf() {
            return _super.call(this, s.TypeSkill.C_ShunFaSelf) || this;
        }
        CShunFaSelf.prototype.reset = function () {
            _super.prototype.reset.call(this);
            //utils.timer.clear(this, this.doHurt);
        };
        CShunFaSelf.prototype.start = function () {
            _super.prototype.start.call(this);
            this.playTargetEffect();
            //utils.timer.once(500, this, this.doHurt);
        };
        CShunFaSelf.prototype.playTargetEffect = function () {
            var that = this;
            var tX = this._body.x;
            var tY = this._body.y;
            var resIdArr = that._flyEffect.split(";");
            var frameRate = utils.MathUtil.floor(12 * this._body.attackSpeed);
            if (resIdArr[0] != "") {
                this.addBoom(resIdArr[0], true, tX, tY, frameRate);
            }
            if (resIdArr.length > 1) {
                this.addBoom(resIdArr[1], false, tX, tY, frameRate);
            }
        };
        return CShunFaSelf;
    }(s.SkillShowBase));
    s.CShunFaSelf = CShunFaSelf;
    __reflect(CShunFaSelf.prototype, "s.CShunFaSelf");
})(s || (s = {}));
