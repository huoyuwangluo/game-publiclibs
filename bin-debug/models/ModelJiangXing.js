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
    var ModelJiangXing = (function (_super) {
        __extends(ModelJiangXing, _super);
        function ModelJiangXing() {
            var _this = _super.call(this) || this;
            _this._daojuItemList = [];
            _this._daojuItemList1 = [];
            return _this;
        }
        ModelJiangXing.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._tavernRecordListVO = [];
            this._type = 0;
            this._leftTime = 0;
            this._totalCount = 0;
            this._getRawardInfo = [];
            this.requestTavernInfo();
        };
        ModelJiangXing.prototype.initTavernData = function (data) {
            this._tavernRecordListVO = [];
            for (var i = 0; i < data.length; i++) {
                var tavernRecord = vo.fromPool(vo.TavernRecordListVO, data[i]);
                this._tavernRecordListVO.push(tavernRecord);
            }
        };
        Object.defineProperty(ModelJiangXing.prototype, "tavernRecordListVO", {
            get: function () {
                return this._tavernRecordListVO;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelJiangXing.prototype, "type", {
            get: function () {
                return this._type;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelJiangXing.prototype, "leftTime", {
            get: function () {
                return this._leftTime;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelJiangXing.prototype, "totalCount", {
            get: function () {
                return this._totalCount;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelJiangXing.prototype, "getRawardInfo", {
            get: function () {
                return this._getRawardInfo;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelJiangXing.prototype, "tavernTemplates", {
            get: function () {
                var tem = Templates.getTemplatesByProperty(templates.Map.TAVERN2, "type", this._type);
                if (tem) {
                    tem.sort(function (a, b) {
                        return a.pos - b.pos;
                    });
                }
                return tem;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelJiangXing.prototype, "tavernRawardTemplates", {
            get: function () {
                var tmps = [];
                var tmpArr = Templates.getTemplatesByProperty(templates.Map.ACTREWARD, "target", 2);
                var start = 0;
                for (var i = 0; i < tmpArr.length; i++) {
                    if (this.getRawardInfo.indexOf(tmpArr[i].id) == -1) {
                        start = i;
                        break;
                    }
                }
                var end = start + 3;
                if (end >= tmpArr.length) {
                    start = tmpArr.length - 3;
                    end = tmpArr.length;
                }
                for (; start < end; start++) {
                    tmps.push(tmpArr[start]);
                }
                return tmps;
            },
            enumerable: true,
            configurable: true
        });
        /**请求酒馆信息*/
        ModelJiangXing.prototype.requestTavernInfo = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Tavern2_GetPlayerTavernInfo);
            this.request(n.MessageMap.C2G_TAVERN2_GETPLAYERTAVERNINFO, msg, utils.Handler.create(this, function (data) {
                _this.initTavernData(data.AllRecordList);
                _this._type = data.Type;
                _this._leftTime = data.LeftTime;
                _this._totalCount = data.TotalTimes;
                _this._getRawardInfo = [];
                for (var i = 0; i < data.GetRawardInfo.length; i++) {
                    _this._getRawardInfo.push(data.GetRawardInfo[i]);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelJiangXing.prototype.requestTavernDoChouJiang = function (type, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Tavern2_DoChouJiang);
            msg.Type = type;
            this.request(n.MessageMap.C2G_TAVERN2_DOCHOUJIANG, msg, utils.Handler.create(this, function (data) {
                _this.initTavernData(data.AllRecordList);
                if (_this._daojuChouJiang) {
                    n.MessagePool.to(_this._daojuChouJiang);
                    _this._daojuChouJiang = null;
                }
                if (_this._daojuItemList) {
                    for (var _i = 0, _a = _this._daojuItemList; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._daojuItemList.length = 0;
                }
                _this._daojuChouJiang = data;
                _this._daojuChouJiang.autoRecover = false;
                _this._daojuItemList = _this._daojuChouJiang.ItemList;
                _this._totalCount = _this._totalCount + _this._daojuItemList.length;
                GameModels.state.updateState(GameRedState.TREASURE_GUANXING);
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelJiangXing.prototype, "daojuItemList", {
            get: function () {
                if (this._daojuItemList) {
                    this._daojuItemList.sort(function (a, b) {
                        var a1 = Templates.getTemplateById(templates.Map.ITEM, a.ItemId);
                        if (!a1) {
                            a1 = Templates.getTemplateById(templates.Map.EQUIP, a.ItemId);
                        }
                        var b1 = Templates.getTemplateById(templates.Map.ITEM, b.ItemId);
                        if (!b1) {
                            b1 = Templates.getTemplateById(templates.Map.EQUIP, b.ItemId);
                        }
                        return b1.quality - a1.quality;
                    });
                }
                return this._daojuItemList;
            },
            enumerable: true,
            configurable: true
        });
        /**请求酒馆领奖*/
        ModelJiangXing.prototype.requestTavernGetRaward = function (rewardId, complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Tavern2_GetTimesRaward);
            msg.RewardId = rewardId;
            this.request(n.MessageMap.C2G_TAVERN2_GETTIMESRAWARD, msg, utils.Handler.create(this, function (data) {
                _this._totalCount = data.TotalTimes;
                _this._getRawardInfo = [];
                for (var i = 0; i < data.GetRawardInfo.length; i++) {
                    _this._getRawardInfo.push(data.GetRawardInfo[i]);
                }
                if (complete)
                    complete.runWith(data);
            }));
        };
        ModelJiangXing.prototype.checkRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.treasure, 1))
                return false;
            if (GameModels.bag.getItemCountById(ConfigData.JINGXINGQIYUAN) >= 10)
                return true;
            return false;
        };
        ModelJiangXing.prototype.requestTavernDoChouJiang4 = function (complete) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Tavern4_DoChouJiang);
            this.request(n.MessageMap.C2G_TAVERN4_DOCHOUJIANG, msg, utils.Handler.create(this, function (data) {
                if (_this._daojuChouJiang1) {
                    n.MessagePool.to(_this._daojuChouJiang1);
                    _this._daojuChouJiang1 = null;
                }
                if (_this._daojuItemList1) {
                    for (var _i = 0, _a = _this._daojuItemList1; _i < _a.length; _i++) {
                        var item = _a[_i];
                        n.MessagePool.to(item);
                    }
                    _this._daojuItemList1.length = 0;
                }
                _this._daojuChouJiang1 = data;
                _this._daojuChouJiang1.autoRecover = false;
                _this._daojuItemList1 = [_this._daojuChouJiang1.Item];
                if (complete)
                    complete.runWith(data);
            }));
        };
        Object.defineProperty(ModelJiangXing.prototype, "daojuItemList1", {
            get: function () {
                return this._daojuItemList1;
            },
            enumerable: true,
            configurable: true
        });
        return ModelJiangXing;
    }(mo.ModelBase));
    mo.ModelJiangXing = ModelJiangXing;
    __reflect(ModelJiangXing.prototype, "mo.ModelJiangXing");
})(mo || (mo = {}));
