var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeTempBtn = (function () {
    function TypeTempBtn() {
    }
    TypeTempBtn.addBtnArr = function (num) {
        if (TypeTempBtn.currBtnArr.indexOf(num) == -1) {
            TypeTempBtn.currBtnArr.push(num);
        }
    };
    TypeTempBtn.removeBtnArr = function (num) {
        for (var i = TypeTempBtn.currBtnArr.length - 1; i >= 0; i--) {
            if (TypeTempBtn.currBtnArr[i] == num) {
                TypeTempBtn.currBtnArr.splice(i, 1);
            }
        }
    };
    TypeTempBtn.LEGION_REDBAG = 1; //阵营红包
    TypeTempBtn.NOTIFY_GIFT_1 = 2; //显示推送礼包
    TypeTempBtn.NOTIFY_GIFT_2 = 3; //绝版推送礼包
    TypeTempBtn.currBtnArr = [];
    return TypeTempBtn;
}());
__reflect(TypeTempBtn.prototype, "TypeTempBtn");
