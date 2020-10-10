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
var vo;
(function (vo) {
    var SevenDayVo = (function (_super) {
        __extends(SevenDayVo, _super);
        function SevenDayVo() {
            return _super.call(this) || this;
        }
        SevenDayVo.prototype.initialize = function () {
            this._day = 0;
            this._taskList = [];
        };
        SevenDayVo.prototype.reset = function () {
            this._day = 0;
            this._taskList = [];
        };
        SevenDayVo.prototype.decode = function (data) {
            this._day = data.Day;
            for (var i = 0; i < data.TargetList.length; i++) {
                var taskVo = vo.fromPool(vo.SevenDayTaskVo, data.TargetList[i]);
                taskVo.decode(data.TargetList[i]);
                this._taskList.push(taskVo);
            }
        };
        Object.defineProperty(SevenDayVo.prototype, "day", {
            get: function () {
                return this._day;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(SevenDayVo.prototype, "taskList", {
            get: function () {
                return this._taskList;
            },
            enumerable: true,
            configurable: true
        });
        return SevenDayVo;
    }(vo.VOBase));
    vo.SevenDayVo = SevenDayVo;
    __reflect(SevenDayVo.prototype, "vo.SevenDayVo");
})(vo || (vo = {}));
