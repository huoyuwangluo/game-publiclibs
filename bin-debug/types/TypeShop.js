var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeShop = (function () {
    function TypeShop() {
    }
    TypeShop.GUANXING_SHOP = 1; //观星商店
    TypeShop.FEATS_SHOP = 2; //功勋商店;
    TypeShop.UNION_SHOP = 4; //阵营商店
    TypeShop.VIP_SHOP = 9; //Vip商店
    TypeShop.MINGJIANG_SHOP = 3; //名将商城商店
    TypeShop.ZHENGSHOU_SHOP = 5; //征收商城商店
    TypeShop.TAOFA_SHOP = 6; //讨伐商城商店
    TypeShop.YUANZHENG_SHOP = 7; //远征商城商店
    TypeShop.SHENGWANG_SHOP = 8; //声望商城商店
    TypeShop.JUNGONG_SHOP = 10; //军功商城商店
    TypeShop.SHOUHUN_SHOP = 11; //兽魂商城商店
    return TypeShop;
}());
__reflect(TypeShop.prototype, "TypeShop");
