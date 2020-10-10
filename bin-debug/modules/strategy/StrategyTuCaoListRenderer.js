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
    var StrategyTuCaoListRenderer = (function (_super) {
        __extends(StrategyTuCaoListRenderer, _super);
        function StrategyTuCaoListRenderer() {
            return _super.call(this) || this;
        }
        StrategyTuCaoListRenderer.prototype.dataChanged = function () {
            if (this.data) {
                var msg = this.data;
                this.myTime.text = "";
                this.otherTime.text = "";
                this.myQuality.visible = false;
                this.myHead.visible = false;
                this.myGroup.visible = false;
                this.otherGroup.visible = false;
                this.otherHead.visible = false;
                if (msg.type == 2) {
                    this.myQuality.visible = true;
                    this.myHead.visible = true;
                    this.myGroup.visible = true;
                    this.myHead.source = ResPath.getPlayerIconSmall(GameModels.user.player.headIcon);
                    this.myselfChat.text = msg.Msg;
                    this.myTime.text = utils.DateUtil.formatDateFromSeconds(msg.Time);
                    this.myselfChat.validateNow();
                }
                else {
                    this.otherGroup.visible = true;
                    this.otherHead.visible = true;
                    this.otherTime.text = utils.DateUtil.formatDateFromSeconds(msg.Time);
                    this.otherChat.text = msg.Msg;
                }
            }
        };
        return StrategyTuCaoListRenderer;
    }(ui.StrategyTuCaoListRendererSkin));
    renderer.StrategyTuCaoListRenderer = StrategyTuCaoListRenderer;
    __reflect(StrategyTuCaoListRenderer.prototype, "renderer.StrategyTuCaoListRenderer");
})(renderer || (renderer = {}));
