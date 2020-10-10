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
var mo;
(function (mo) {
    var ModelWelfare = (function (_super) {
        __extends(ModelWelfare, _super);
        function ModelWelfare() {
            return _super.call(this) || this;
        }
        ModelWelfare.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._tempsNum = 5;
            this._shakeNum = 1;
            this._faqStrs = Templates.getTemplatesByProperty(templates.Map.SYSRULE, "type", 101);
        };
        Object.defineProperty(ModelWelfare.prototype, "faqStrs", {
            get: function () {
                return this._faqStrs;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelWelfare.prototype, "shakeNum", {
            get: function () {
                return this._shakeNum;
            },
            enumerable: true,
            configurable: true
        });
        ModelWelfare.prototype.setKefuClick = function (bol) {
            var isClick = game.state.getItem(GameModels.user.player.uid, TypeSetting.IS_CLICK_VIP);
            if (bol != isClick) {
                game.state.setItem(GameModels.user.player.uid, TypeSetting.IS_CLICK_VIP, bol);
                // GameModels.state.updateState(GameRedState.WELFARE_VIPKEFU);
            }
        };
        /**获取服务器列表**/
        ModelWelfare.prototype.requestCodeReward = function (code, complete) {
            n.http.request((game.GameConfig.ssl ? 'https' : 'http') + "://" + game.GameConfig.ip + "/" + game.GameConfig.platform + "/card.php?gameAreaId=" + GameModels.login.serverList.selected.sid.toString() + "&card=" + code + "&roleName=" + GameModels.user.player.name, complete, egret.URLRequestMethod.GET);
        };
        return ModelWelfare;
    }(mo.ModelBase));
    mo.ModelWelfare = ModelWelfare;
    __reflect(ModelWelfare.prototype, "mo.ModelWelfare");
})(mo || (mo = {}));
