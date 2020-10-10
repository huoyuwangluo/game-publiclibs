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
    var ModelRedPoint = (function (_super) {
        __extends(ModelRedPoint, _super);
        //public static MODEL_REDPOINT_CHANNGE: string = "MODEL_REDPOINT_CHANNGE";
        function ModelRedPoint() {
            return _super.call(this) || this;
        }
        ModelRedPoint.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._redPointkVo = [];
            this.requestRedPointInfo();
            this.onRoute(n.MessageMap.G2C_GETALLREDPOINTLIST, utils.Handler.create(this, this.updateRedPointInfo, null, false));
        };
        ModelRedPoint.prototype.initRedPointInfo = function (data) {
            this._redPointkVo = [];
            for (var i = 0; i < data.length; i++) {
                var redPointVO = vo.fromPool(vo.RedPointVO, data[i]);
                this._redPointkVo.push(redPointVO);
            }
        };
        ModelRedPoint.prototype.updateRedPointInfo = function (data) {
            if (this._redPointkVo) {
                for (var i = 0; i < this._redPointkVo.length; i++) {
                    for (var j = 0; j < data.List.length; j++) {
                        if (this._redPointkVo[i].type == data.List[j].Type) {
                            this._redPointkVo[i].state = data.List[j].State;
                            this._redPointkVo[i].param = data.List[j].Param;
                        }
                    }
                }
            }
            GameModels.state.updateState(GameRedState.SHENGZHI);
            GameModels.state.updateState(GameRedState.ATKCITY);
            GameModels.state.updateState(GameRedState.MONTHCARD);
            GameModels.state.updateState(GameRedState.TUJIAN_TUJIAN);
            GameModels.state.updateState(GameRedState.UNION_RICHANG_TASK_ZHANLING);
            GameModels.state.updateState(GameRedState.MAIN_ZHANLING);
            GameModels.state.updateState(GameRedState.MAIN_SEVENDAY);
            //this.dispatchEventWith(mo.ModelRedPoint.MODEL_REDPOINT_CHANNGE);
        };
        Object.defineProperty(ModelRedPoint.prototype, "redPointkVo", {
            get: function () {
                return this._redPointkVo;
            },
            enumerable: true,
            configurable: true
        });
        ModelRedPoint.prototype.getRedPointVoByType = function (type) {
            for (var i = 0; i < this._redPointkVo.length; i++) {
                if (this._redPointkVo[i].type == type) {
                    return this._redPointkVo[i];
                }
            }
            return null;
        };
        ModelRedPoint.prototype.getRedPointParamByType = function (type) {
            if (!this._redPointkVo)
                return 0;
            for (var i = 0; i < this._redPointkVo.length; i++) {
                if (this._redPointkVo[i].type == type) {
                    return this._redPointkVo[i].param;
                }
            }
            return 0;
        };
        ModelRedPoint.prototype.getRedPointStateVoByType = function (type) {
            if (!this._redPointkVo)
                return 0;
            for (var i = 0; i < this._redPointkVo.length; i++) {
                if (this._redPointkVo[i].type == type) {
                    return this._redPointkVo[i].state;
                }
            }
            return 0;
        };
        ModelRedPoint.prototype.checkShengZhiRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.shengZhiMain, 0))
                return false;
            if (GameModels.user && GameModels.user.player.liangcao >= 4000)
                return true;
            var count = this.getRedPointStateVoByType(TypeRedPoint.SHENGZHI);
            if (count > 0) {
                return true;
            }
            return false;
        };
        ModelRedPoint.prototype.checkMonthCardRedPoint = function () {
            // if (!mg.uiManager.checkFuncOpen("monthCard")) return false;
            var count = this.getRedPointStateVoByType(TypeRedPoint.MONTHCARD);
            if (count > 0) {
                return true;
            }
            return false;
        };
        ModelRedPoint.prototype.checkZhanLingRedPoint = function () {
            if (!GameModels.user.player.legionId)
                return false;
            var count = this.getRedPointStateVoByType(TypeRedPoint.ZHANLING);
            if (count > 0) {
                return true;
            }
            return false;
        };
        ModelRedPoint.prototype.checkSevenDayRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.sevenDayTask, 0))
                return false;
            var count = this.getRedPointStateVoByType(TypeRedPoint.SEVENDAYTASK);
            if (count > 0) {
                return true;
            }
            return false;
        };
        /**请求红点信息*/
        ModelRedPoint.prototype.requestRedPointInfo = function () {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_GetAllRedPointList);
            this.request(n.MessageMap.C2G_GETALLREDPOINTLIST, msg, utils.Handler.create(this, function (data) {
                _this.initRedPointInfo(data.List);
                GameModels.state.updateState(GameRedState.SHENGZHI);
                GameModels.state.updateState(GameRedState.ATKCITY);
                GameModels.state.updateState(GameRedState.MONTHCARD);
                GameModels.state.updateState(GameRedState.TUJIAN_TUJIAN);
                GameModels.state.updateState(GameRedState.UNION_RICHANG_TASK_ZHANLING);
                GameModels.state.updateState(GameRedState.MAIN_ZHANLING);
                GameModels.state.updateState(GameRedState.MAIN_SEVENDAY);
                //this.dispatchEventWith(mo.ModelRedPoint.MODEL_REDPOINT_CHANNGE);
            }));
        };
        return ModelRedPoint;
    }(mo.ModelBase));
    mo.ModelRedPoint = ModelRedPoint;
    __reflect(ModelRedPoint.prototype, "mo.ModelRedPoint");
})(mo || (mo = {}));
