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
    var ZChongFen = (function (_super) {
        __extends(ZChongFen, _super);
        //private _effect: AnimationSprite;
        //private _moveRender: EaseRender;
        //private _endNode: PF.Node;
        /**斩魂*/
        function ZChongFen() {
            //super(TypeSkill.Z_ZH);
            //this._moveRender = new EaseRender();
            return _super.call(this) || this;
            //this._type = TypeSkill.Z_ZH;
            //this._fullDirect = true;
        }
        return ZChongFen;
    }(s.CShunFaResDirect));
    s.ZChongFen = ZChongFen;
    __reflect(ZChongFen.prototype, "s.ZChongFen");
})(s || (s = {}));
