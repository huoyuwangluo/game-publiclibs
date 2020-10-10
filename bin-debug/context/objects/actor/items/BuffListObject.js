var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var s;
(function (s) {
    var BuffListObject = (function () {
        //protected _scene:Scene;
        function BuffListObject(body) {
            this._body = body;
        }
        BuffListObject.prototype.initialize = function () {
            this._body.vo.onBuffAdd(this, this.addBuff);
            this._body.vo.onBuffRemove(this, this.removeBuff);
            for (var type in this._body.vo.buffList) {
                var buffVO = this._body.vo.buffList[type];
                if (buffVO.template.effectPos > 0 && buffVO.template.effectPos < 10 && buffVO.template.effectId > 0) {
                    this._body.showBuffEffect(buffVO.template.effectPos, buffVO.template.effectId.toString());
                }
            }
            this.refreshShowBuffText();
        };
        BuffListObject.prototype.reset = function () {
            if (!this._body.vo)
                return;
            this._body.vo.offBuffAdd();
            this._body.vo.offBuffRemove();
        };
        BuffListObject.prototype.resetState = function () {
            if (this._body && this._body.vo) {
                this._body.vo.removeAllBuff();
            }
            //this.removeShied(false);
        };
        BuffListObject.prototype.addBuff = function (buffVO) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            if (!this._body.isNeedShowEffect())
                return;
            if (buffVO.template.effectPos > 0 && buffVO.template.effectPos < 10 && buffVO.template.effectId > 0) {
                this._body.showBuffEffect(buffVO.template.effectPos, buffVO.template.effectId.toString());
            }
            this.refreshShowBuffText();
        };
        BuffListObject.prototype.removeBuff = function (buffVO) {
            if (buffVO.template.effectPos > 0 && buffVO.template.effectPos < 10 && buffVO.template.effectId > 0) {
                this._body.hideBuffEffect(buffVO.template.effectPos, buffVO.template.effectId.toString());
            }
            this.refreshShowBuffText();
        };
        BuffListObject.prototype.refreshShowBuffText = function () {
            var txt = "";
            for (var type in this._body.vo.buffList) {
                var buffVO = this._body.vo.buffList[type];
                txt += type + ",";
            }
            this._body.showDebugBuffText(txt);
        };
        return BuffListObject;
    }());
    s.BuffListObject = BuffListObject;
    __reflect(BuffListObject.prototype, "s.BuffListObject");
})(s || (s = {}));
