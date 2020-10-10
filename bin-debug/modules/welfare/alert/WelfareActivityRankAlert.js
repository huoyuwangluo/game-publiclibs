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
var WelfareActivityRankAlert = (function (_super) {
    __extends(WelfareActivityRankAlert, _super);
    function WelfareActivityRankAlert() {
        var _this = _super.call(this) || this;
        _this._labNameArr = [_this.labName0, _this.labName1, _this.labName2];
        _this._headIconArr = [_this.imgHeadI0, _this.imgHeadI1, _this.imgHeadI2];
        _this._headQArr = [_this.imgHeadQ0, _this.imgHeadQ1, _this.imgHeadQ2];
        return _this;
    }
    WelfareActivityRankAlert.prototype.show = function (vo) {
        var _this = this;
        logger.log("活动排行类型===", vo.actType);
        //var temp: templates.actRank[] = Templates.getTemplatesByProperty(templates.Map.ACTRANK, "type", vo.actSetTemp.typeTable);
        GameModels.sgActivity.requestSGGetActivityRank(vo.actCfgId, utils.Handler.create(this, function () {
            var rankListVo = GameModels.sgActivity.actRankListVo;
            // var dataListArr: any = [];
            // for (var i = 0; i < mo.ModelSgActivity.jingjipaihangListMaxListCount; i++) {
            //     var dataList: any = { rankVo: null, rewardVo: null, rank: 0 };
            //     dataList.rankVo = rankListVo[i];
            //     dataList.rank = i + 1;
            //     if (dataList.rank == 1) {
            //         dataList.rewardVo = temp[0];
            //     }
            //     else if(dataList.rank == 2){
            //         dataList.rewardVo = temp[1];
            //     }
            //     else if(dataList.rank == 3){
            //         dataList.rewardVo = temp[2];
            //     }
            //     else if(dataList.rank>3&&dataList.rank <= 5){
            //         dataList.rewardVo = temp[3];
            //     }
            //     else if(dataList.rank>5&&dataList.rank <= 10){
            //         dataList.rewardVo = temp[4];
            //     }
            //      else if(dataList.rank>10&&dataList.rank <= 20){
            //         dataList.rewardVo = temp[5];
            //     }
            //     else{
            //          dataList.rewardVo = temp[6];
            //     }
            //     dataListArr.push(dataList);
            // }
            _this.shengZhiHide.visible = vo.actType == 305;
            if (!_this._listData) {
                _this._listData = new eui.ArrayCollection(rankListVo);
            }
            else {
                _this._listData.source = rankListVo;
            }
            _this.listRank.dataProvider = _this._listData;
            _this.labNo.visible = rankListVo.length <= 0;
            var str = GameModels.sgActivity.myRank > 0 ? "" + GameModels.sgActivity.myRank : Language.C_20YH;
            _this.labMyRank.text = rankListVo.length <= 0 ? Language.C_WSB : str;
            _this.labSelfName.text = GameModels.user.player.name;
            _this.imgSelfHead.source = ResPath.getPlayerIconSmall(GameModels.user.player.headIcon);
            _this.labSelfScore.text = "" + GameModels.sgActivity.myScore;
            for (var i = 0; i < 3; i++) {
                if (rankListVo[i]) {
                    _this._headIconArr[i].visible = true;
                    _this._headQArr[i].visible = true;
                    _this._labNameArr[i].text = rankListVo[i].playerName;
                    _this._headIconArr[i].source = ResPath.getPlayerIconSmall(rankListVo[i].headIcon);
                }
                else {
                    _this._headIconArr[i].visible = false;
                    _this._headQArr[i].visible = false;
                    _this._labNameArr[i].text = Language.C_XWYD;
                }
            }
        }));
        this.btnClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
    };
    WelfareActivityRankAlert.prototype.clickHandler = function (e) {
        switch (e.currentTarget) {
            case this.btnBack:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnClose:
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
        }
    };
    WelfareActivityRankAlert.prototype.hide = function () {
        this.clearList(this.listRank);
        this.btnClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        this.btnBack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandler, this);
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    return WelfareActivityRankAlert;
}(ui.WelfareActivityRankAlertSkin));
__reflect(WelfareActivityRankAlert.prototype, "WelfareActivityRankAlert", ["IAlert", "egret.DisplayObject"]);
