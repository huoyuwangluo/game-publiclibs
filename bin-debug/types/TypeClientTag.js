var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeClientTag = (function () {
    function TypeClientTag() {
    }
    //3001 -4000
    /**终身标记 1*/
    TypeClientTag.CLIENT_TYPE1_1 = 3001; //圣旨引导刷新
    TypeClientTag.CLIENT_TYPE1_2 = 3002; //开服第一天无双战场预告
    TypeClientTag.CLIENT_TYPE1_3 = 3003; //开服第二天无双战场预告
    TypeClientTag.CLIENT_TYPE1_4 = 3004; //远征开启的时候剧情对话
    TypeClientTag.CLIENT_TYPE1_5 = 3005; //兵法三路开启的时候剧情对话
    TypeClientTag.CLIENT_TYPE1_6 = 3006; //6星红将的赐婚引导
    TypeClientTag.CLIENT_TYPE1_7 = 3007; //跳关引导
    TypeClientTag.CLIENT_TYPE1_8 = 3008; //兵穿戴引导
    TypeClientTag.CLIENT_TYPE1_9 = 3009; //加速
    TypeClientTag.CLIENT_TYPE1_10 = 3010; //国战设置阵容
    TypeClientTag.CLIENT_TYPE1_11 = 3011; //天梯第一次胜利
    TypeClientTag.CLIENT_TYPE1_12 = 3012; //材料副本第一次胜利
    TypeClientTag.CLIENT_TYPE1_13 = 3013; //名将三选1弹出对话
    TypeClientTag.CLIENT_TYPE1_14 = 3014; //名将三选1完成一个对话
    TypeClientTag.CLIENT_TYPE1_15 = 3015; //军功达到800对话
    TypeClientTag.CLIENT_TYPE1_16 = 3016; //合成贾诩800对话
    TypeClientTag.CLIENT_TYPE1_ARR = [TypeClientTag.CLIENT_TYPE1_1, TypeClientTag.CLIENT_TYPE1_2, TypeClientTag.CLIENT_TYPE1_3,
        TypeClientTag.CLIENT_TYPE1_4, TypeClientTag.CLIENT_TYPE1_5, TypeClientTag.CLIENT_TYPE1_6, TypeClientTag.CLIENT_TYPE1_7,
        TypeClientTag.CLIENT_TYPE1_8, TypeClientTag.CLIENT_TYPE1_9, TypeClientTag.CLIENT_TYPE1_10, TypeClientTag.CLIENT_TYPE1_11,
        TypeClientTag.CLIENT_TYPE1_12, TypeClientTag.CLIENT_TYPE1_13, TypeClientTag.CLIENT_TYPE1_14, TypeClientTag.CLIENT_TYPE1_15,
        TypeClientTag.CLIENT_TYPE1_16];
    return TypeClientTag;
}());
__reflect(TypeClientTag.prototype, "TypeClientTag");
