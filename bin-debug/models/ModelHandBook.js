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
    var ModelHandBook = (function (_super) {
        __extends(ModelHandBook, _super);
        function ModelHandBook() {
            return _super.call(this) || this;
        }
        ModelHandBook.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.requestHandbookInfo();
            this._gotStepAward = [];
        };
        ModelHandBook.prototype.initHandBookInfo = function (data) {
            this._handBookVO = [];
            for (var i = 0; i < data.length; i++) {
                var handBookVO = vo.fromPool(vo.HandBookIndexVO);
                handBookVO.decode(data[i]);
                this._handBookVO.push(handBookVO);
            }
        };
        ModelHandBook.prototype.getHandBookVoByBookType = function (type) {
            var handBookArr = [];
            if (this._handBookVO) {
                for (var i = 0; i < this._handBookVO.length; i++) {
                    if (this._handBookVO[i].type == type) {
                        handBookArr.push(this._handBookVO[i]);
                    }
                }
            }
            handBookArr.sort(function (a, b) {
                return a.generalTemps.quality - b.generalTemps.quality;
            });
            var dataArr = [];
            var data = [];
            for (var j = 0; j < handBookArr.length; j++) {
                if (data.length < 4) {
                    data.push(handBookArr[j]);
                }
                else {
                    dataArr.push(data);
                    data = [];
                    data.push(handBookArr[j]);
                }
            }
            if (data.length > 0) {
                dataArr.push(data);
            }
            return dataArr;
        };
        Object.defineProperty(ModelHandBook.prototype, "handBookResId", {
            get: function () {
                this._handBookResId = [];
                for (var j = 1; j < 5; j++) {
                    var data = { "resId": "", "isRed": false };
                    data.resId = "tujian_json." + "tj00" + j;
                    data.isRed = false;
                    this._handBookResId.push(data);
                }
                return this._handBookResId;
            },
            enumerable: true,
            configurable: true
        });
        /**获得已解封的将星数量 */
        ModelHandBook.prototype.getSealCount = function () {
            var num = 0;
            if (!this._handBookVO)
                return 0;
            for (var i = 0; i < this._handBookVO.length; i++) {
                if (this._handBookVO[i].status >= 1) {
                    num++;
                }
            }
            return num;
        };
        /**获得所有将星数量 */
        ModelHandBook.prototype.getAllTuJianCount = function () {
            return this._handBookVO.length;
        };
        Object.defineProperty(ModelHandBook.prototype, "handbookVo", {
            get: function () {
                return this._handBookVO;
            },
            enumerable: true,
            configurable: true
        });
        ModelHandBook.prototype.getActiviteGeneral = function () {
            var petArr = [];
            for (var i = 0; i < this._handBookVO.length; i++) {
                if (this._handBookVO[i].status >= 1) {
                    petArr.push(this._handBookVO[i]);
                }
            }
            return petArr;
        };
        ModelHandBook.prototype.getActiviteGeneralBuyId = function (id) {
            for (var i = 0; i < this._handBookVO.length; i++) {
                if (this._handBookVO[i].general == id && this._handBookVO[i].status >= 1) {
                    return true;
                }
            }
            return false;
        };
        ModelHandBook.prototype.getActiviteRedGeneral = function (index) {
            var petArr = this.getActiviteGeneral();
            var petTempArr = [];
            for (var i = 0; i < petArr.length; i++) {
                if (petArr[i].generalTemps.star >= 5 && GameModels.pet.isHashFourSkill(petArr[i].generalTemps.id)) {
                    if (index == 0) {
                        petTempArr.push(petArr[i].generalTemps.id);
                    }
                    else {
                        if (petArr[i].generalTemps.country == index) {
                            petTempArr.push(petArr[i].generalTemps.id);
                        }
                    }
                }
            }
            return petTempArr;
        };
        Object.defineProperty(ModelHandBook.prototype, "gotStepAward", {
            get: function () {
                return this._gotStepAward;
            },
            enumerable: true,
            configurable: true
        });
        ModelHandBook.prototype.updataStepAward = function (step) {
            if (this._gotStepAward.indexOf(step) == -1) {
                this._gotStepAward.push(step);
            }
        };
        //请求图鉴信息
        ModelHandBook.prototype.requestHandbookInfo = function (complete) {
            var _this = this;
            this.request(n.MessageMap.C2G_HANDBOOK_GETINFO, n.MessagePool.from(n.C2G_Handbook_GetInfo), utils.Handler.create(this, function (data) {
                _this._gotStepAward.length = 0;
                _this.initHandBookInfo(data.SuitData);
                for (var i = 0; i < data.GotStepReward.length; i++) {
                    var num = data.GotStepReward[i];
                    _this._gotStepAward.push(num);
                }
                GameModels.state.updateState(GameRedState.TUJIAN_TUJIAN_MOSHEN);
                if (complete)
                    complete.runWith(data);
            }));
        };
        //请求领取图鉴阶段性奖励
        ModelHandBook.prototype.requestMoShenStepAward = function (step, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Handbook_GetStepReward);
            msg.Step = step;
            this.request(n.MessageMap.C2G_HANDBOOK_GETSTEPREWARD, msg, utils.Handler.create(this, function (data) {
                _this.updataStepAward(data.Step);
                GameModels.state.updateState(GameRedState.TUJIAN_TUJIAN_MOSHEN);
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelHandBook.prototype.checkMoShenRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.tujian, 0))
                return false;
            var deteTemps = GameModels.dataSet.getDataSettingById(550001);
            var str = deteTemps.value;
            var steptempArr = [];
            var strArr = str.split("#");
            for (var i = 0; i < strArr.length; i++) {
                var stepIndex = parseInt(strArr[i].split("|")[0]);
                if (steptempArr.indexOf(stepIndex) == -1) {
                    steptempArr.push(stepIndex);
                }
            }
            var step = 0;
            var lastStep = 0;
            var stepArr = this.gotStepAward;
            if (stepArr.length > 0) {
                lastStep = stepArr[stepArr.length - 1];
                for (var k = 0; k < steptempArr.length; k++) {
                    if (stepArr.indexOf(steptempArr[k]) == -1) {
                        step = k;
                        break;
                    }
                }
            }
            if (!step && stepArr.length == steptempArr.length) {
                return false;
            }
            else {
                var stepTemps = strArr[step];
                var count = this.getSealCount();
                var needCount = parseInt(stepTemps.split("|")[0]);
                var minCount = count - lastStep;
                if (minCount <= 0) {
                    minCount = 0;
                }
                else {
                    if (minCount >= needCount - lastStep) {
                        minCount = needCount - lastStep;
                    }
                }
                var maxCount = needCount - lastStep;
                var isCan = count >= needCount;
                return isCan;
            }
        };
        return ModelHandBook;
    }(mo.ModelBase));
    mo.ModelHandBook = ModelHandBook;
    __reflect(ModelHandBook.prototype, "mo.ModelHandBook");
})(mo || (mo = {}));
