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
var renderer;
(function (renderer) {
    var zhouKaViewRenderer1 = (function (_super) {
        __extends(zhouKaViewRenderer1, _super);
        function zhouKaViewRenderer1() {
            var _this = _super.call(this) || this;
            _this._rwards = [_this.reward0, _this.reward1, _this.reward2, _this.reward3];
            return _this;
        }
        zhouKaViewRenderer1.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.imgBg.source = this.data;
                var tem = Templates.getTemplateById(templates.Map.WEEKCARD, 1);
                var rewards = (tem.rewards1 + ";" + tem.rewards2).split(";");
                var index = 0;
                for (var i = 0; i < 4; i++) {
                    var iconBox = this._rwards[i];
                    iconBox.labName.stroke = 1;
                    if (i < rewards.length && this.itemIndex == 0) {
                        iconBox.dataSource = rewards[i];
                        iconBox.labCount.text = "";
                        this.boxGroup.addChild(iconBox);
                    }
                    else {
                        if (iconBox.parent) {
                            iconBox.parent.removeChild(iconBox);
                        }
                    }
                }
            }
        };
        return zhouKaViewRenderer1;
    }(ui.zhouKaViewRenderer1Skin));
    renderer.zhouKaViewRenderer1 = zhouKaViewRenderer1;
    __reflect(zhouKaViewRenderer1.prototype, "renderer.zhouKaViewRenderer1");
})(renderer || (renderer = {}));
