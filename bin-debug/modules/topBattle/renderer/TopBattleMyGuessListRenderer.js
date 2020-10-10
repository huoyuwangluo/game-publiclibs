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
    var TopBattleMyGuessListRenderer = (function (_super) {
        __extends(TopBattleMyGuessListRenderer, _super);
        function TopBattleMyGuessListRenderer() {
            return _super.call(this) || this;
        }
        TopBattleMyGuessListRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                var data1 = this.data;
                this.labStep.text = GameModels.topBattle.getFightName(data1.battleStep);
                this.labCount.text = Language.getExpression(Language.E_XZ12B, data1.betPlayerName, data1.betCount);
                if (data1.result == 0) {
                    this.labGet.text = Language.J_DDZ;
                    this.labGet.textColor = 0xD3D3D3;
                }
                else if (data1.result == 1) {
                    this.labGet.text = Language.getExpression(Language.E_SS1B, data1.betCount);
                    this.labGet.textColor = TypeColor.RED1;
                }
                else {
                    this.labGet.text = Language.getExpression(Language.E_HL1B, (data1.getBetCount - data1.betCount));
                    this.labGet.textColor = TypeColor.GREEN1;
                }
            }
        };
        return TopBattleMyGuessListRenderer;
    }(ui.TopBattleMyGuessListRendererSkin));
    renderer.TopBattleMyGuessListRenderer = TopBattleMyGuessListRenderer;
    __reflect(TopBattleMyGuessListRenderer.prototype, "renderer.TopBattleMyGuessListRenderer");
})(renderer || (renderer = {}));
