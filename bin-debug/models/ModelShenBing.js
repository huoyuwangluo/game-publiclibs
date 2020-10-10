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
    var ModelShenBing = (function (_super) {
        __extends(ModelShenBing, _super);
        function ModelShenBing() {
            return _super.call(this) || this;
        }
        ModelShenBing.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.requestShenBingInfo();
        };
        ModelShenBing.prototype.initHandBookInfo = function (data) {
            this._shenbingVO = [];
            for (var i = 0; i < data.length; i++) {
                var shenbingVO = vo.fromPool(vo.ShenBingVO);
                shenbingVO.decode(data[i]);
                this._shenbingVO.push(shenbingVO);
            }
            this._shenbingVO.sort(function (a, b) {
                return a.template.pos - b.template.pos;
            });
        };
        ModelShenBing.prototype.updataHandBookInfo = function (data) {
            if (this._shenbingVO) {
                for (var i = 0; i < this._shenbingVO.length; i++) {
                    if (this._shenbingVO[i].refId == data.RefId) {
                        this._shenbingVO[i].level = data.Level;
                        this._shenbingVO[i].decode(data);
                        break;
                    }
                }
            }
        };
        ModelShenBing.prototype.getShenBingVoByRefid = function (Refid) {
            if (this._shenbingVO) {
                for (var i = 0; i < this._shenbingVO.length; i++) {
                    if (this._shenbingVO[i].refId == Refid) {
                        return this._shenbingVO[i];
                    }
                }
            }
        };
        ModelShenBing.prototype.getShenBingVoByStep = function (step) {
            var shenbingVo = [];
            if (this._shenbingVO) {
                for (var i = 0; i < this._shenbingVO.length; i++) {
                    if (this._shenbingVO[i].step == step) {
                        shenbingVo.push(this._shenbingVO[i]);
                    }
                }
            }
            return shenbingVo;
        };
        ModelShenBing.prototype.getShenBingTmpBuyId = function (id) {
            if (id <= 0)
                return;
            var stepAndIndexArr = [];
            var step = 0;
            var shenBingArr = [];
            for (var i = 0; i < this._shenbingVO.length; i++) {
                if (this._shenbingVO[i].refId == id) {
                    step = this._shenbingVO[i].step;
                }
            }
            for (var j = 0; j < this._shenbingVO.length; j++) {
                if (this._shenbingVO[j].step == step) {
                    shenBingArr.push(this._shenbingVO[j]);
                }
            }
            for (var z = 0; z < shenBingArr.length; z++) {
                if (shenBingArr[z].refId == id) {
                    stepAndIndexArr.push(shenBingArr[z].step, z);
                }
            }
            return stepAndIndexArr;
        };
        ModelShenBing.prototype.getHashRedPointBuyStep = function () {
            if (this._shenbingVO) {
                for (var i = 0; i < this._shenbingVO.length; i++) {
                    if (this._shenbingVO[i].isHashRedPoint == 1) {
                        return this._shenbingVO[i];
                    }
                }
            }
            return null;
        };
        //请求神兵信息
        ModelShenBing.prototype.requestShenBingInfo = function (complete) {
            var _this = this;
            this.request(n.MessageMap.C2G_SHENBING_INFO, n.MessagePool.from(n.C2G_ShenBing_Info), utils.Handler.create(this, function (data) {
                _this.initHandBookInfo(data.Infos);
                GameModels.state.updateState(GameRedState.BAOWU_SHENBIN);
                if (complete)
                    complete.runWith(data);
            }));
        };
        //请求升级神兵
        ModelShenBing.prototype.requestUpShenBing = function (refId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_ShenBing_Upgrade);
            msg.RefId = refId;
            this.request(n.MessageMap.C2G_SHENBING_UPGRADE, msg, utils.Handler.create(this, function (data) {
                _this.updataHandBookInfo(data.info);
                _this.dispatchEventWith(ModelShenBing.SHENBING_TALENT);
                GameModels.state.updateState(GameRedState.BAOWU_SHENBIN);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**神兵的红点 */
        ModelShenBing.prototype.checkShenBinRedBuyStep = function (step) {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.baowu, 3))
                return false;
            if (!this._shenbingVO)
                return false;
            for (var i = 0; i < this._shenbingVO.length; i++) {
                if (this._shenbingVO[i] && this._shenbingVO[i].level < 10 && this._shenbingVO[i].step == step) {
                    var consume = "";
                    if (this._shenbingVO[i].level > 0) {
                        var num = this._shenbingVO[i].getGrowBase(this._shenbingVO[i].level);
                        if (num > 0) {
                            var strArr = this._shenbingVO[i].template.baseCon.split("_");
                            consume = strArr[0] + "_" + num * parseInt(strArr[1]);
                        }
                        else {
                            consume = this._shenbingVO[i].getGrowUpConsume(this._shenbingVO[i].level);
                        }
                    }
                    else {
                        consume = this._shenbingVO[i].activateConsume;
                    }
                    var strcount = parseInt(consume.split("_")[1]);
                    var bagcount = GameModels.bag.getItemCountById(consume.split("_")[0]);
                    if (bagcount >= strcount && this._shenbingVO[i].level < 10) {
                        return true;
                    }
                }
            }
            return false;
        };
        /**神兵的红点 */
        ModelShenBing.prototype.checkShenBinRed = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.baowu, 3))
                return false;
            if (!this._shenbingVO)
                return false;
            for (var i = 0; i < this._shenbingVO.length; i++) {
                if (this._shenbingVO[i] && this._shenbingVO[i].level < 10) {
                    var consume = "";
                    if (this._shenbingVO[i].level > 0) {
                        var num = this._shenbingVO[i].getGrowBase(this._shenbingVO[i].level);
                        if (num > 0) {
                            var strArr = this._shenbingVO[i].template.baseCon.split("_");
                            consume = strArr[0] + "_" + num * parseInt(strArr[1]);
                        }
                        else {
                            consume = this._shenbingVO[i].getGrowUpConsume(this._shenbingVO[i].level);
                        }
                    }
                    else {
                        consume = this._shenbingVO[i].activateConsume;
                    }
                    var strcount = parseInt(consume.split("_")[1]);
                    var bagcount = GameModels.bag.getItemCountById(consume.split("_")[0]);
                    if (bagcount >= strcount && this._shenbingVO[i].level < 10) {
                        return true;
                    }
                }
            }
            return false;
        };
        ModelShenBing.SHENBING_TALENT = "SHENBING_TALENT";
        return ModelShenBing;
    }(mo.ModelBase));
    mo.ModelShenBing = ModelShenBing;
    __reflect(ModelShenBing.prototype, "mo.ModelShenBing");
})(mo || (mo = {}));
