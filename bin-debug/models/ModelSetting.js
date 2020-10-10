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
    var ModelSetting = (function (_super) {
        __extends(ModelSetting, _super);
        function ModelSetting() {
            return _super.call(this) || this;
        }
        ModelSetting.prototype.initialize = function () {
            var boolean = game.state.getItem(GameModels.user.player.uid, TypeSetting.SOUND_ENABLED);
            if (boolean == null) {
                game.state.setItem(GameModels.user.player.uid, TypeSetting.SOUND_ENABLED, true);
                boolean = true;
            }
            game.state.setState(TypeSetting.SOUND_ENABLED, boolean);
            var boolean1 = game.state.getItem(GameModels.user.player.uid, TypeSetting.OPEN_RECHAGE);
            if (boolean1 == null) {
                game.state.setItem(GameModels.user.player.uid, TypeSetting.OPEN_RECHAGE, true);
            }
            else {
                game.state.setItem(GameModels.user.player.uid, TypeSetting.OPEN_RECHAGE, boolean1);
            }
        };
        ModelSetting.prototype.checkAutoXP = function () {
            if (GameModels.user.player.level < 60)
                return false;
            var firstXpSetting = !!game.state.getItem(GameModels.user.player.uid, 'firstXpSetting');
            var firstMergeSetting = !!game.state.getItem(GameModels.user.player.uid, 'firstMergeSetting');
            if (firstXpSetting == true && firstMergeSetting == true) {
                return false;
            }
            else {
                return true;
            }
        };
        Object.defineProperty(ModelSetting.prototype, "eliteScaleFactor", {
            /**精英怪设置 */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSetting.prototype, "eliteLifeFactor", {
            /**精英怪设置 */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSetting.prototype, "eliteAttackFactor", {
            /**精英怪设置 */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSetting.prototype, "eliteRefreshMax", {
            /**精英怪设置 */
            get: function () {
                return 0;
            },
            enumerable: true,
            configurable: true
        });
        return ModelSetting;
    }(mo.ModelBase));
    mo.ModelSetting = ModelSetting;
    __reflect(ModelSetting.prototype, "mo.ModelSetting");
})(mo || (mo = {}));
