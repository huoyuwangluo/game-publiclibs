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
var dialog;
(function (dialog) {
    var role;
    (function (role) {
        var chengzhuang;
        (function (chengzhuang) {
            var ChengZhuangSuitProperites = (function (_super) {
                __extends(ChengZhuangSuitProperites, _super);
                function ChengZhuangSuitProperites() {
                    var _this = _super.call(this) || this;
                    _this._labArr = [_this.labHP, _this.labAtt, _this.labDef, _this.labMdef, _this.lab1, _this.lab2];
                    return _this;
                }
                ChengZhuangSuitProperites.prototype.show = function (suitTemp) {
                    this.labSuitName.text = suitTemp.des;
                    var properites = suitTemp.properties.split(";");
                    for (var i = 0; i < this._labArr.length; i++) {
                        if (properites[i]) {
                            this._labArr[i].text = utils.htmlUtil.getAttributeFormat(properites[i], true);
                        }
                        else {
                            this._labArr[i].text = "";
                        }
                    }
                    this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                };
                ChengZhuangSuitProperites.prototype.onClose = function (evt) {
                    this.dispatchEventWith(egret.Event.CLOSE);
                };
                ChengZhuangSuitProperites.prototype.hide = function () {
                    this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
                    if (this.parent) {
                        this.parent.removeChild(this);
                    }
                };
                return ChengZhuangSuitProperites;
            }(ui.ChengZhuangSuitProperitesSkin));
            chengzhuang.ChengZhuangSuitProperites = ChengZhuangSuitProperites;
            __reflect(ChengZhuangSuitProperites.prototype, "dialog.role.chengzhuang.ChengZhuangSuitProperites", ["IAlert", "egret.DisplayObject"]);
        })(chengzhuang = role.chengzhuang || (role.chengzhuang = {}));
    })(role = dialog.role || (dialog.role = {}));
})(dialog || (dialog = {}));
