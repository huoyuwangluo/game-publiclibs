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
var main;
(function (main) {
    var MainFirstPassView = (function (_super) {
        __extends(MainFirstPassView, _super);
        function MainFirstPassView(layer) {
            var _this = _super.call(this) || this;
            _this._layer = layer;
            return _this;
        }
        MainFirstPassView.prototype.add = function (rewardStr) {
            this.reward.dataSource = (rewardStr.split(";")[0]);
            this.reward1.dataSource = (rewardStr.split(";")[1]);
            //不遮挡聊天框
            this._layer.addChildAt(this, 1);
            this.x = 0;
            this.y = mg.stageManager.stageHeight * .5 - 400;
        };
        MainFirstPassView.prototype.remove = function () {
            if (this.parent)
                this._layer.removeChild(this);
        };
        return MainFirstPassView;
    }(ui.FirstPassSkin));
    main.MainFirstPassView = MainFirstPassView;
    __reflect(MainFirstPassView.prototype, "main.MainFirstPassView");
})(main || (main = {}));
