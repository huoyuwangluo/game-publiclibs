var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeCheck = (function () {
    function TypeCheck() {
    }
    TypeCheck.getCheckType = function (type) {
        if (!this._checkTypeList[type]) {
            return false;
        }
        return true;
    };
    TypeCheck.setCheckType = function (type, bol) {
        this._checkTypeList[type] = bol;
    };
    TypeCheck.updateCheckTypeListStr = function (v) {
        var isHash = false;
        var newStr = v.split("_");
        for (var i = 0; i < this._checkTypeListStr.length; i++) {
            var oldStr = this._checkTypeListStr[i].split("_");
            if (newStr[0] == oldStr[0]) {
                isHash = true;
                if (newStr[1] != oldStr[1]) {
                    this.setCheckType(parseInt(oldStr[0]), false);
                    this._checkTypeListStr[i] = oldStr[0] + "_" + newStr[1];
                }
            }
        }
        if (!isHash)
            this._checkTypeListStr.push(v);
    };
    TypeCheck.BUY = 1; //购买
    TypeCheck.ZHENHUAN_SHENDIAN = 2; //召唤神殿
    TypeCheck.ZONGSHENBUY = 3; //购买众神
    TypeCheck.HAOHUA_ZHUANGPAN = 4; //豪华转盘抽奖
    TypeCheck.HOLIDAY_BUG = 5; //节日活动购买
    TypeCheck.HONGYAN_SPEEDMASKLOVE = 6; //红颜加速
    TypeCheck.XIAYE_GENERAL_ORANGE = 7; //武将橙分解
    TypeCheck.PERSONAL_BOSS = 8; //个人boss
    TypeCheck.EVERY_BOSS = 9; //全民boss
    TypeCheck.HUIJUNBEIFA_BOSS = 10; //挥军北伐boss
    TypeCheck.PINGDINGSHUZHONG_BOSS = 11; //平定蜀中boss
    TypeCheck.ZHULUZHONGYUAN_BOSS = 12; //逐鹿中原boss
    TypeCheck.DONGWUZHENGBA_BOSS = 13; //东吴争霸boss
    TypeCheck.EXP_MATERIAL = 14;
    TypeCheck.ZHANGONG_MATERIAL = 15;
    TypeCheck.ZHANDUN_MATERIAL = 16;
    TypeCheck.HUANJIE_MATERIAL = 17;
    TypeCheck.MAIGU_MATERIAL = 18;
    TypeCheck.BUYLIBAO = 19; //武将橙分解
    TypeCheck.PETCOMMEND = 20; //武将合成
    TypeCheck.SHENGZHI_REFRESH = 21; //圣旨刷新
    TypeCheck.SHENGZHI_MONEYREFRESH = 22; //圣旨消费刷新
    TypeCheck.SMITHY_CD = 23; //神兵锻造秒cd
    TypeCheck.SHENGZHI_CD = 24; //圣旨秒cd
    TypeCheck.YUMAO_MATERIAL = 25; //羽毛副本
    TypeCheck.PETUP_XIYOUWUJIANG = 26; //升星含有稀有武将
    TypeCheck.QUICK_PETUP_XIYOUWUJIANG = 27; //快速升星含有稀有武将
    TypeCheck.SMITHY_BUYCOUNT = 28; //锻造买次数
    TypeCheck.SHOP_MYSTERY = 29; //神秘商城刷新
    TypeCheck.SMOKEPET_GAOJI_ONE = 30; //高级一连抽
    TypeCheck.QIANGZHENG = 31; //强征买次数
    TypeCheck.JUYIWUJIANG = 32; //聚义武将
    TypeCheck.QUICK_PETUP_SHENMOWUJIANG = 33; //快速升星含有神魔武将
    TypeCheck.QUICK_PETUP_UPWUJIANG = 34; //快速升星含有同上阵武将
    TypeCheck.SEVENDAY_BUY = 35; //七日目标购买福利礼包
    TypeCheck.INDEX_1 = 36; //观星
    TypeCheck.INDEX_2 = 37; //灵兽召唤
    TypeCheck.INDEX_3 = 38; //神之锻造
    TypeCheck.INDEX_4 = 39; //酒馆高级招募
    TypeCheck.YANWUSAODANG = 40; //演武扫荡
    TypeCheck._checkTypeList = [];
    TypeCheck._checkTypeListStr = [];
    return TypeCheck;
}());
__reflect(TypeCheck.prototype, "TypeCheck");
