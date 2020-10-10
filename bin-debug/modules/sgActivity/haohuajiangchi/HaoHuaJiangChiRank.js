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
var dialog;
(function (dialog) {
    var activity;
    (function (activity) {
        var HaoHuaJiangChiRank = (function (_super) {
            __extends(HaoHuaJiangChiRank, _super);
            function HaoHuaJiangChiRank() {
                return _super.call(this) || this;
            }
            HaoHuaJiangChiRank.prototype.initialize = function () {
                _super.prototype.initialize.call(this);
                Mediator.getMediator(this).onAdd(this, this.enter);
                Mediator.getMediator(this).onRemove(this, this.exit);
            };
            HaoHuaJiangChiRank.prototype.enter = function (data) {
                var _this = this;
                this.updateTitle("rank");
                var vo = GameModels.sgActivity.getSgActivityListVOByType(game.sgActivityType.haohuajiangchi);
                if (vo) {
                    this.labTime.text = utils.DateUtil.formatDateInChinese(new Date(vo.endTime * 1000), false);
                    GameModels.sgActivity.requestSGGetActivityRank(vo.actCfgId, utils.Handler.create(this, function () {
                        var rankListVo = GameModels.sgActivity.actRankListVo;
                        var rewardListVo = vo.actRewardListVO;
                        var dataListArr = [];
                        for (var i = 0; i < mo.ModelSgActivity.jingjipaihangListMaxListCount; i++) {
                            var dataList = { rankVo: null, rewardVo: null, rank: 0 };
                            dataList.rankVo = rankListVo[i];
                            dataList.rewardVo = rewardListVo[i];
                            dataList.rank = i + 1;
                            dataListArr.push(dataList);
                        }
                        if (!_this._listData) {
                            _this._listData = new eui.ArrayCollection(dataListArr);
                        }
                        else {
                            _this._listData.source = dataListArr;
                        }
                        _this.list.dataProvider = _this._listData;
                        var str = GameModels.sgActivity.myRank > 0 ? "" + GameModels.sgActivity.myRank : Language.C_WSB;
                        _this.labMyRank.text = str;
                    }));
                }
            };
            HaoHuaJiangChiRank.prototype.exit = function () {
                this.clearList(this.list);
            };
            return HaoHuaJiangChiRank;
        }(ui.HaoHuaJiangChiRankSkin));
        activity.HaoHuaJiangChiRank = HaoHuaJiangChiRank;
        __reflect(HaoHuaJiangChiRank.prototype, "dialog.activity.HaoHuaJiangChiRank");
    })(activity = dialog.activity || (dialog.activity = {}));
})(dialog || (dialog = {}));
