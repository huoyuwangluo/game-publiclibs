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
    var LadderVO = (function (_super) {
        __extends(LadderVO, _super);
        function LadderVO() {
            return _super.call(this) || this;
        }
        LadderVO.prototype.initialize = function (data) {
            if (data instanceof n.ProtoLadderReward) {
                this._template = Templates.getTemplateById(templates.Map.LADDER, data.DuanWeiId);
                this.updateData(data);
            }
            else if (data instanceof templates.ladder) {
                this._template = data;
                this._duanWeiId = data.id;
            }
            this._upRewardItems = this.getPrizeItems(this._template.upRewards);
            this._failRewardItems = this.getPrizeItems(this._template.failRewards);
            this._winRewardItems = this.getPrizeItems(this._template.rewards);
        };
        LadderVO.prototype.toPoolAndNull = function (items) {
            vo.toPoolList(items);
            items = null;
        };
        LadderVO.prototype.updateData = function (data) {
            this._duanWeiId = data.DuanWeiId;
            this._canRecevied = data.CanRecevied == 0 ? false : true;
            this._isRecevied = data.IsRecevied == 0 ? false : true;
        };
        LadderVO.prototype.reset = function () {
            this._template = null;
            this._isRecevied = false;
            this._canRecevied = false;
            this.toPoolAndNull(this._upRewardItems);
            this.toPoolAndNull(this._failRewardItems);
            this.toPoolAndNull(this._winRewardItems);
            this._duanWeiId = 0;
        };
        LadderVO.prototype.getPrizeItems = function (str) {
            var itemVo = [];
            var items = str.split(";");
            for (var i = 0; i < items.length; i++) {
                var data = items[i].split("_");
                if (Math.floor(parseInt(data[0]) / 100000) == 1) {
                    itemVo.push(vo.fromPool(vo.EquipVO, parseInt(data[0])));
                }
                else {
                    itemVo.push(vo.fromPool(vo.ItemVO, parseInt(data[0])));
                }
                itemVo[i].count = parseInt(data[1]);
            }
            return itemVo;
        };
        Object.defineProperty(LadderVO.prototype, "template", {
            get: function () {
                return this._template;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderVO.prototype, "isRecevied", {
            get: function () {
                return this._isRecevied;
            },
            set: function (value) {
                this._isRecevied = value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderVO.prototype, "upRewarditems", {
            get: function () {
                return this._upRewardItems;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderVO.prototype, "canRecevied", {
            get: function () {
                return this._canRecevied;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderVO.prototype, "duanWeiId", {
            get: function () {
                return this._duanWeiId;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderVO.prototype, "winRewardItems", {
            get: function () {
                return this._winRewardItems;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(LadderVO.prototype, "failRewardItems", {
            get: function () {
                return this._failRewardItems;
            },
            enumerable: true,
            configurable: true
        });
        return LadderVO;
    }(vo.VOBase));
    vo.LadderVO = LadderVO;
    __reflect(LadderVO.prototype, "vo.LadderVO");
})(vo || (vo = {}));
