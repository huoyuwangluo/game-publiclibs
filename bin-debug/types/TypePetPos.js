var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypePetPos = (function () {
    function TypePetPos() {
    }
    TypePetPos.getPosNameBuyPos = function (pos) {
        var posName = "";
        switch (pos) {
            case 1:
                posName = Language.POS_HUWEI;
                break;
            case 2:
                posName = Language.POS_XIANFENG;
                break;
            case 3:
                posName = Language.POS_ZHONGJUN;
                break;
            case 4:
                posName = Language.POS_YUANJUN;
                break;
        }
        return posName;
    };
    TypePetPos.getPosNameColorBuyPos = function (pos) {
        var posNameColor = 0;
        switch (pos) {
            case 1:
                posNameColor = 0xdc6b66;
                break;
            case 2:
                posNameColor = 0xb6ba65;
                break;
            case 3:
                posNameColor = 0x7ebe6b;
                break;
            case 4:
                posNameColor = 0x86afd9;
                break;
        }
        return posNameColor;
    };
    //角色位置
    TypePetPos.POS_1 = 0;
    //1号武将位
    TypePetPos.POS_2 = 1;
    //2号武将位
    TypePetPos.POS_3 = 2;
    //3号武将位
    TypePetPos.POS_4 = 3;
    //4号武将位
    TypePetPos.POS_5 = 4;
    /**角色界面打开时的当前位置 */
    TypePetPos.role_currPos = 0;
    return TypePetPos;
}());
__reflect(TypePetPos.prototype, "TypePetPos");
