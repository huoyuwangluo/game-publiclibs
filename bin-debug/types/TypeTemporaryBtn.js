var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeTemporaryBtn = (function () {
    function TypeTemporaryBtn() {
    }
    TypeTemporaryBtn.getObjByType = function (type) {
        for (var i = 0; i < this._btnList.length; i++) {
            if (type == this._btnList[i].type)
                return this._btnList[i];
        }
        return null;
    };
    TypeTemporaryBtn.getDataList = function () {
        var list = [];
        for (var i = 0; i < this._btnList.length; i++) {
            var actType = this._btnList[i].type;
            var activityType = this._btnList[i].tabIndex;
            if (actType == 1 || actType == 3 || actType == 5 || actType == 6) {
                if (actType == 6) {
                    if (GameModels.tavern.leftTime > 86400)
                        continue;
                }
                else {
                    var vo = GameModels.sgActivity.getSgActivityListVOByType(activityType);
                    if (vo) {
                        var time = GameModels.sgActivity.getLastDateSec(vo.actCfgId) / 1000;
                        if (time > 86400) {
                            continue;
                        }
                    }
                    else {
                        continue;
                    }
                }
            }
            else {
                if (actType == 4) {
                    var vo = GameModels.sgActivity.getSgActivityListVOByType(activityType);
                    if (!vo)
                        continue;
                }
            }
            list.push({ type: this._btnList[i].type, state: this._btnList[i].state, image: this._btnList[i].iconImage, function: this._btnList[i].function, needLv: this._btnList[i].needLv });
        }
        return list;
    };
    //主界面临时按钮
    TypeTemporaryBtn._btnList = [
        { type: 1, state: 0, iconImage: "uiMain_activityIcon_json.main_icon_zk", function: "sgDaily", tabIndex: game.sgActivityType.zk, needLv: 80 },
        { type: 2, state: 0, iconImage: "uiMain_activityIcon_json.main_icon_jxqy", function: "treasure", tabIndex: 1, needLv: 80 }
    ];
    return TypeTemporaryBtn;
}());
__reflect(TypeTemporaryBtn.prototype, "TypeTemporaryBtn");
