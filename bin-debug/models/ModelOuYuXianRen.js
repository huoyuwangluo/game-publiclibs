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
    var ModelOuYuXianRen = (function (_super) {
        __extends(ModelOuYuXianRen, _super);
        function ModelOuYuXianRen() {
            return _super.call(this) || this;
        }
        ModelOuYuXianRen.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._OuYuXianRenVo = [];
            this._leftTime = 0;
            this.chooseGiftGetInfo();
        };
        ModelOuYuXianRen.prototype.initOuYuXianRen = function (data) {
            this._OuYuXianRenVo = [];
            for (var i = 0; i < data.length; i++) {
                var listVo = vo.fromPool(vo.OuYuXianRenVO, data[i]);
                this._OuYuXianRenVo.push(listVo);
            }
            if (!this.hashOuYuXianRen) {
                if (this._endHandler) {
                    this._endHandler.run();
                }
            }
            GameModels.state.updateState(GameRedState.OUYUXIANREN);
        };
        ModelOuYuXianRen.prototype.checkOuYuXianRenRedPoint = function () {
            var vo = GameModels.ouYuXianRen.getOuYuXianRenVoByStep(3);
            if (vo && vo.type <= 0 && GameModels.user.player.totalRecharge > 0) {
                return true;
            }
            for (var i = 0; i < this._OuYuXianRenVo.length; i++) {
                if (this._OuYuXianRenVo[i].type && this._OuYuXianRenVo[i].canGetLeftTime <= 0 && this._OuYuXianRenVo[i].giftStatus <= 0) {
                    return true;
                }
            }
            return false;
        };
        ModelOuYuXianRen.prototype.onEnd = function (caller, method) {
            var args = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                args[_i - 2] = arguments[_i];
            }
            this.offEnd();
            this._endHandler = utils.Handler.create(caller, method, args, false);
        };
        ModelOuYuXianRen.prototype.offEnd = function () {
            if (this._endHandler) {
                this._endHandler.recover();
                this._endHandler = null;
            }
        };
        Object.defineProperty(ModelOuYuXianRen.prototype, "hashOuYuXianRen", {
            get: function () {
                if (this._leftTime <= 0)
                    return false;
                for (var i = 0; i < this._OuYuXianRenVo.length; i++) {
                    if (this._OuYuXianRenVo[i].giftStatus == 0) {
                        return true;
                    }
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        ModelOuYuXianRen.prototype.getOuYuXianRenVoByType = function (type) {
            for (var i = 0; i < this._OuYuXianRenVo.length; i++) {
                if (this._OuYuXianRenVo[i].type == type) {
                    return this._OuYuXianRenVo[i];
                }
            }
            return null;
        };
        ModelOuYuXianRen.prototype.getOuYuXianRenVoByStep = function (step) {
            for (var i = 0; i < this._OuYuXianRenVo.length; i++) {
                if (this._OuYuXianRenVo[i].step == step) {
                    return this._OuYuXianRenVo[i];
                }
            }
            return null;
        };
        Object.defineProperty(ModelOuYuXianRen.prototype, "leftTime", {
            get: function () {
                return this._leftTime;
            },
            enumerable: true,
            configurable: true
        });
        /**获取当前数据状态 */
        ModelOuYuXianRen.prototype.chooseGiftGetInfo = function (successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_ChooseGift_GetInfo);
            this.request(n.MessageMap.C2G_CHOOSEGIFT_GETINFO, msg, utils.Handler.create(this, function (data) {
                _this._leftTime = data.LeftTime;
                _this.initOuYuXianRen(data.GiftDataList);
                if (successhandler)
                    successhandler.run();
            }));
        };
        /**选择礼包类型 */
        ModelOuYuXianRen.prototype.chooseGiftChoose = function (step, type, rewardIndex, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_ChooseGift_Choose);
            msg.Step = step;
            msg.Type = type;
            msg.RewardIndex = rewardIndex;
            this.request(n.MessageMap.C2G_CHOOSEGIFT_CHOOSE, msg, utils.Handler.create(this, function (data) {
                _this.initOuYuXianRen(data.GiftDataList);
                if (successhandler)
                    successhandler.run();
            }));
        };
        /**领取礼包奖励 */
        ModelOuYuXianRen.prototype.chooseGiftGetReward = function (step, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_ChooseGift_GetReward);
            msg.Step = step;
            this.request(n.MessageMap.C2G_CHOOSEGIFT_GETREWARD, msg, utils.Handler.create(this, function (data) {
                _this.initOuYuXianRen(data.GiftDataList);
                if (successhandler)
                    successhandler.run();
            }));
        };
        return ModelOuYuXianRen;
    }(mo.ModelBase));
    mo.ModelOuYuXianRen = ModelOuYuXianRen;
    __reflect(ModelOuYuXianRen.prototype, "mo.ModelOuYuXianRen");
})(mo || (mo = {}));
