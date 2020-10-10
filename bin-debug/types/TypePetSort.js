var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypePetSort = (function () {
    function TypePetSort() {
    }
    TypePetSort.GENGHUAN = 1; //更换
    TypePetSort.FENJIE = 2; //分解
    TypePetSort.ALLPET = 3; //所有武将
    return TypePetSort;
}());
__reflect(TypePetSort.prototype, "TypePetSort");
