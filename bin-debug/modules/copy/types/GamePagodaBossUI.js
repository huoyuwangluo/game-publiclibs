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
var copy;
(function (copy) {
    var GamePagodaBossUI = (function (_super) {
        __extends(GamePagodaBossUI, _super);
        function GamePagodaBossUI() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(GamePagodaBossUI, "instance", {
            get: function () {
                if (!GamePagodaBossUI._instance) {
                    GamePagodaBossUI._instance = new GamePagodaBossUI();
                }
                return GamePagodaBossUI._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**打开爬塔显示 */
        GamePagodaBossUI.prototype.enter = function (copyVO, bossVO) {
            this._copyVO = copyVO;
            GameModels.copyPagoda.resetInspireTimes();
            this.ui.imghsChat.visible = copyVO.type == mo.ModelGamePagoda.COPY_SAVAGE_PAGODA;
            this.ui.imgszlyChat.visible = copyVO.type == mo.ModelGamePagoda.COPY_LOCK_DEMON;
            this.ui.imgwhChat.visible = copyVO.type == mo.ModelGamePagoda.COPY_WUHUN_PAGODA;
            if (copyVO.type == mo.ModelGamePagoda.COPY_WUHUN_PAGODA) {
                this.ui.btnInspire.visible = false;
            }
            else {
                this.ui.btnInspire.visible = true;
            }
            this.ui.labszlyCount.text = copyVO.step.toString();
            this.ui.labhsChatCount.text = copyVO.step.toString();
            this.ui.labwhChatCount.text = copyVO.step.toString();
            this.ui.btnInspire.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.showPagodaInspire, this);
            this.ui.showBossBlood(bossVO);
        };
        /**关闭爬塔显示 */
        GamePagodaBossUI.prototype.exit = function () {
            this._copyVO = null;
            this.ui.btnInspire.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.showPagodaInspire, this);
            mg.alertManager.closeALert(NoendInspireAlert);
            this.ui.hideBossBlood();
        };
        /**显示鼓舞弹窗 */
        GamePagodaBossUI.prototype.showPagodaInspire = function () {
            var inSpireMoshiType, inSpireScaleType, typeInspire;
            if (this._copyVO.template.type == mo.ModelGamePagoda.COPY_SAVAGE_PAGODA) {
                inSpireMoshiType = 250;
                inSpireScaleType = 251;
                typeInspire = TypeInspire.ANIMAL;
            }
            else if (this._copyVO.template.type == mo.ModelGamePagoda.COPY_LOCK_DEMON) {
                inSpireMoshiType = 260;
                inSpireScaleType = 261;
                typeInspire = TypeInspire.LOCKDEMON;
            }
            var inSpireMoshi = GameModels.dataSet.getDataSettingByType(inSpireMoshiType);
            var inSpireScale = GameModels.dataSet.getDataSettingByType(inSpireScaleType);
            var needMoshiNum = parseInt(inSpireMoshi.value.split("_")[1]);
            mg.alertManager.showAlert(NoendInspireAlert, true, true, typeInspire, needMoshiNum, 0, utils.Handler.create(this, function () {
                if (GameModels.copyPagoda.inspireTimes > 0) {
                    mg.alertManager.tip(Language.J_ZFCSYDDSX);
                    return;
                }
                if (needMoshiNum > GameModels.user.player.diamonds) {
                    mg.alertManager.tip(Language.J_MSBZ, 0xb6281a);
                    return;
                }
                GameModels.copyPagoda.requestEncourage(typeInspire, inSpireScale);
            }));
        };
        return GamePagodaBossUI;
    }(copy.GameUIBase));
    copy.GamePagodaBossUI = GamePagodaBossUI;
    __reflect(GamePagodaBossUI.prototype, "copy.GamePagodaBossUI");
})(copy || (copy = {}));
