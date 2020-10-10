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
    var ModelHongYan = (function (_super) {
        __extends(ModelHongYan, _super);
        function ModelHongYan() {
            return _super.call(this) || this;
        }
        ModelHongYan.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._baoJiStatue = 0;
            this._hongyanVo = [];
            this.initHongYan();
            this.requestHongYanGetInfo();
        };
        ModelHongYan.prototype.initHongYan = function () {
            this._hongyanVo = [];
            var tems = Templates.getList(templates.Map.HONGYAN);
            for (var i = 0; i < tems.length; i++) {
                var listVo = vo.fromPool(vo.HongYanVO, tems[i]);
                this._hongyanVo.push(listVo);
            }
        };
        ModelHongYan.prototype.updataHongYan = function (data) {
            if (!this._hongyanVo)
                return;
            if (data instanceof n.ProtoHongYan) {
                for (var i = 0; i < this._hongyanVo.length; i++) {
                    if (this._hongyanVo[i].confId == data.CfgId) {
                        this._hongyanVo[i].exp = data.Exp;
                        this._hongyanVo[i].level = data.Level;
                        this._hongyanVo[i].marryPetId = data.MarryPetId;
                        this._hongyanVo[i].star = data.Star;
                        break;
                    }
                }
            }
            else {
                for (var i = 0; i < this._hongyanVo.length; i++) {
                    for (var j = 0; j < data.length; j++) {
                        if (this._hongyanVo[i].confId == data[j].CfgId) {
                            this._hongyanVo[i].exp = data[j].Exp;
                            this._hongyanVo[i].level = data[j].Level;
                            this._hongyanVo[i].marryPetId = data[j].MarryPetId;
                            this._hongyanVo[i].star = data[j].Star;
                        }
                    }
                }
            }
            GameModels.state.updateState(GameRedState.BAOWU_HONGYAN);
            this.getHongYanFightValue();
        };
        ModelHongYan.prototype.getHongYanByConfId = function (id) {
            for (var i = 0; i < this._hongyanVo.length; i++) {
                if (this._hongyanVo[i].confId == id) {
                    return this._hongyanVo[i];
                }
            }
        };
        Object.defineProperty(ModelHongYan.prototype, "hongyanVo", {
            get: function () {
                if (this._hongyanVo) {
                    var marryVo = this.getMarryHongYan();
                    marryVo.sort(function (a, b) {
                        if (a.isHashRedPoint != b.isHashRedPoint) {
                            return a.isHashRedPoint - b.isHashRedPoint;
                        }
                        else {
                            return a.confId - b.confId;
                        }
                    });
                    var noMarryVo = this.getNoMarryHongYan();
                    noMarryVo.sort(function (a, b) {
                        if (a.isHashRedPoint != b.isHashRedPoint) {
                            return a.isHashRedPoint - b.isHashRedPoint;
                        }
                        else {
                            if (a.level <= 0 && b.level <= 0) {
                                return a.confId - b.confId;
                            }
                            else if (a.level > 0 && b.level > 0) {
                                return a.confId - b.confId;
                            }
                            else {
                                if (a.level > 0) {
                                    return -1;
                                }
                                else {
                                    return 1;
                                }
                            }
                        }
                    });
                }
                return marryVo.concat(noMarryVo);
            },
            enumerable: true,
            configurable: true
        });
        ModelHongYan.prototype.getMarryHongYan = function () {
            var voArr = [];
            for (var _i = 0, _a = this._hongyanVo; _i < _a.length; _i++) {
                var hongYan = _a[_i];
                if (hongYan.marryPetId) {
                    voArr.push(hongYan);
                }
            }
            return voArr;
        };
        ModelHongYan.prototype.getNoMarryHongYan = function () {
            var voArr = [];
            for (var _i = 0, _a = this._hongyanVo; _i < _a.length; _i++) {
                var hongYan = _a[_i];
                if (!hongYan.marryPetId) {
                    voArr.push(hongYan);
                }
            }
            return voArr;
        };
        Object.defineProperty(ModelHongYan.prototype, "baoJiStatue", {
            get: function () {
                return this._baoJiStatue;
            },
            enumerable: true,
            configurable: true
        });
        /**请求寻红颜信息*/
        ModelHongYan.prototype.requestHongYanGetInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HongYan_GetInfo);
            this.request(n.MessageMap.C2G_HONGYAN_GETINFO, msg, utils.Handler.create(this, function (data) {
                _this.updataHongYan(data.List);
                GameModels.state.updateState(GameRedState.BAOWU_HONGYAN);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**请求激活红颜*/
        ModelHongYan.prototype.requestHongYanActive = function (confId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HongYan_Active);
            msg.CfgId = confId;
            this.request(n.MessageMap.C2G_HONGYAN_ACTIVE, msg, utils.Handler.create(this, function (data) {
                _this.updataHongYan(data.NewHongYan);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**请求红颜升级*/
        ModelHongYan.prototype.requestHongYanUpgrade = function (confId, complete, onerr) {
            var _this = this;
            this._baoJiStatue = 0;
            var msg = n.MessagePool.from(n.C2G_HongYan_Upgrade);
            msg.CfgId = confId;
            this.request(n.MessageMap.C2G_HONGYAN_UPGRADE, msg, utils.Handler.create(this, function (data) {
                _this._baoJiStatue = data.BaoJiStatue;
                _this.updataHongYan(data.NewHongYan);
                if (complete)
                    complete.runWith(data);
            }));
            n.net.onError(n.MessageMap.C2G_HONGYAN_UPGRADE, utils.Handler.create(this, function (data) {
                if (onerr)
                    onerr.runWith(data);
            }));
        };
        /**请求结婚*/
        ModelHongYan.prototype.requestHongYanMarry = function (confId, petId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HongYan_Marry);
            msg.CfgId = confId;
            msg.MarryPetId = petId;
            this.request(n.MessageMap.C2G_HONGYAN_MARRY, msg, utils.Handler.create(this, function (data) {
                _this.updataHongYan(data.HongYan);
                _this.dispatchEventWith(mo.ModelHongYan.HONGYAN_CHANGE);
                _this.dispatchEventWith(mo.ModelHongYan.HONGYAN_MERRY);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**请求离婚*/
        ModelHongYan.prototype.requestHongYanBreakMarriage = function (confId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HongYan_BreakMarriage);
            msg.CfgId = confId;
            this.request(n.MessageMap.C2G_HONGYAN_BREAKMARRIAGE, msg, utils.Handler.create(this, function (data) {
                _this.updataHongYan(data.HongYan);
                if (complete)
                    complete.runWith(data);
            }));
        };
        /**请求升星*/
        ModelHongYan.prototype.requestHongYanBreakStar = function (confId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_HongYan_BreakStar);
            msg.CfgId = confId;
            this.request(n.MessageMap.C2G_HONGYAN_BREAKSTAR, msg, utils.Handler.create(this, function (data) {
                _this.updataHongYan(data.HongYan);
                _this.dispatchEventWith(mo.ModelHongYan.HONGYAN_CHANGE);
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelHongYan.prototype.getHongYanFightValue = function () {
            var _this = this;
            GameModels.common.requestFightNum(this, TypeFunction.HONGYAN_TOTAL, function (fightNum) {
                _this._fightValue = fightNum;
            });
        };
        Object.defineProperty(ModelHongYan.prototype, "fightValue", {
            get: function () {
                return this._fightValue;
            },
            enumerable: true,
            configurable: true
        });
        ModelHongYan.prototype.checkAllHongYanRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.baowu, 0))
                return false;
            if (this._hongyanVo) {
                for (var i = 0; i < this._hongyanVo.length; i++) {
                    if (this._hongyanVo[i].isHashRedPoint == 1)
                        return true;
                }
            }
            return false;
        };
        ModelHongYan.HONGYAN_CHANGE = "HONGYAN_CHANGE";
        ModelHongYan.HONGYAN_MERRY = "HONGYAN_MERRY";
        return ModelHongYan;
    }(mo.ModelBase));
    mo.ModelHongYan = ModelHongYan;
    __reflect(ModelHongYan.prototype, "mo.ModelHongYan");
})(mo || (mo = {}));
