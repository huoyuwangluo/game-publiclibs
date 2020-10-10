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
    var StrategyMiDianListRenderer = (function (_super) {
        __extends(StrategyMiDianListRenderer, _super);
        function StrategyMiDianListRenderer() {
            return _super.call(this) || this;
        }
        StrategyMiDianListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var temp = this.data;
            if (temp) {
                this.imgQ.source = "qualityBg_json.img_head_1_png";
                this.head.source = "taskicon_json." + temp.icon;
                this.labName.text = temp.name;
                this.labContent.textFlow = utils.TextFlowMaker.generateTextFlow(temp.des);
                this.labContent.addEventListener(egret.TextEvent.LINK, this.onLinkHandler, this);
            }
        };
        StrategyMiDianListRenderer.prototype.onLinkHandler = function (evt) {
            var arr = evt.text.split('_');
            var type = arr[0];
            var value = arr[1];
            if (type == vo.ChatVO.LINK_TYPE_OPENUI)
                mg.uiManager.showByName(parseInt(arr[1]));
        };
        return StrategyMiDianListRenderer;
    }(ui.StrategyMiDianListRendererSkin));
    renderer.StrategyMiDianListRenderer = StrategyMiDianListRenderer;
    __reflect(StrategyMiDianListRenderer.prototype, "renderer.StrategyMiDianListRenderer");
})(renderer || (renderer = {}));
