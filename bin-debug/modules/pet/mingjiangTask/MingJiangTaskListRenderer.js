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
    var MingJiangTaskListRenderer = (function (_super) {
        __extends(MingJiangTaskListRenderer, _super);
        function MingJiangTaskListRenderer() {
            return _super.call(this) || this;
        }
        MingJiangTaskListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var voData = this.data;
                this.labName.text = voData.playerName;
                this.labTime.text = utils.DateUtil.formatDateInChinese(new Date(voData.finshTime * 1000), true);
            }
        };
        return MingJiangTaskListRenderer;
    }(ui.MingJiangTaskListRendererSkin));
    renderer.MingJiangTaskListRenderer = MingJiangTaskListRenderer;
    __reflect(MingJiangTaskListRenderer.prototype, "renderer.MingJiangTaskListRenderer");
})(renderer || (renderer = {}));
