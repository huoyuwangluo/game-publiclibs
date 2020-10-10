var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeFunction = (function () {
    function TypeFunction() {
    }
    //武将位置
    TypeFunction.PetRoom_0 = 10;
    TypeFunction.PetRoom_1 = 11;
    TypeFunction.PetRoom_2 = 12;
    TypeFunction.PetRoom_3 = 13;
    TypeFunction.PetRoom_4 = 14;
    // //普通装备
    // public static PetEquip_0: number = 20;
    // public static PetEquip_1: number = 21;
    // public static PetEquip_2: number = 22;
    // public static PetEquip_3: number = 23;
    // public static PetEquip_4: number = 24;
    //武将资质
    TypeFunction.PetZZ_0 = 30;
    TypeFunction.PetZZ_1 = 31;
    TypeFunction.PetZZ_2 = 32;
    TypeFunction.PetZZ_3 = 33;
    TypeFunction.PetZZ_4 = 34;
    //羽翼
    TypeFunction.Wing_0 = 40;
    TypeFunction.Wing_1 = 41;
    TypeFunction.Wing_2 = 42;
    TypeFunction.Wing_3 = 43;
    TypeFunction.Wing_4 = 44;
    //灭世神装（原神骨）
    TypeFunction.MieShiShenZhuang_0 = 50;
    TypeFunction.MieShiShenZhuang_1 = 51;
    TypeFunction.MieShiShenZhuang_2 = 52;
    TypeFunction.MieShiShenZhuang_3 = 53;
    TypeFunction.MieShiShenZhuang_4 = 54;
    TypeFunction.MieShiShenZhuang_TATOL = 1011; //灭世神装总战力
    //星辰装备
    TypeFunction.StarEquip_0 = 60;
    TypeFunction.StarEquip_1 = 61;
    TypeFunction.StarEquip_2 = 62;
    TypeFunction.StarEquip_3 = 63;
    TypeFunction.StarEquip_4 = 64;
    //星辰图谱
    TypeFunction.StarEquipForge_0 = 70;
    TypeFunction.StarEquipForge_1 = 71;
    TypeFunction.StarEquipForge_2 = 72;
    TypeFunction.StarEquipForge_3 = 73;
    TypeFunction.StarEquipForge_4 = 74;
    //神魂
    TypeFunction.ShenHun_Pet_0 = 80; //神魂0
    TypeFunction.ShenHun_Pet_1 = 81; //神魂1
    TypeFunction.ShenHun_Pet_2 = 82; //神魂2
    TypeFunction.ShenHun_Pet_3 = 83; //神魂3
    TypeFunction.ShenHun_Pet_4 = 84; //神魂4
    //远古装备（原红装）
    TypeFunction.GodEquip_1 = 90;
    TypeFunction.GodEquip_2 = 91;
    TypeFunction.GodEquip_3 = 92;
    TypeFunction.GodEquip_4 = 93;
    TypeFunction.GodEquip_5 = 94;
    TypeFunction.GodEquip_6 = 95;
    TypeFunction.GodEquip_7 = 96;
    TypeFunction.GodEquip_8 = 97;
    TypeFunction.GodEquip = 98;
    //命魂
    TypeFunction.LifeSoul_0 = 100;
    TypeFunction.LifeSoul_1 = 101;
    TypeFunction.LifeSoul_2 = 102;
    TypeFunction.LifeSoul_3 = 103;
    TypeFunction.LifeSoul_4 = 104;
    //驯龙
    TypeFunction.XunLong_0 = 110;
    TypeFunction.XunLong_1 = 111;
    TypeFunction.XunLong_2 = 112;
    TypeFunction.XunLong_3 = 113;
    TypeFunction.XunLong_4 = 114;
    //精炼（原附魔）
    TypeFunction.JingLian_0 = 120;
    TypeFunction.JingLian_1 = 121;
    TypeFunction.JingLian_2 = 122;
    TypeFunction.JingLian_3 = 123;
    TypeFunction.JingLian_4 = 124;
    //无双技能
    TypeFunction.WuShuang_1 = 130;
    TypeFunction.WuShuang_2 = 131;
    TypeFunction.WuShuang_3 = 132;
    TypeFunction.WuShuang_4 = 133;
    TypeFunction.WuShuang_5 = 134;
    //技能
    TypeFunction.NormalSkill_0 = 140;
    TypeFunction.NormalSkill_1 = 141;
    TypeFunction.NormalSkill_2 = 142;
    TypeFunction.NormalSkill_3 = 143;
    TypeFunction.NormalSkill_4 = 144;
    //四象之灵（原契约）
    TypeFunction.SiXiangZhiLing_0 = 150;
    TypeFunction.SiXiangZhiLing_1 = 151;
    TypeFunction.SiXiangZhiLing_2 = 152;
    TypeFunction.SiXiangZhiLing_3 = 153;
    TypeFunction.SiXiangZhiLing_4 = 154;
    //战弓
    TypeFunction.ZhanGong_0 = 160;
    TypeFunction.ZhanGong_1 = 161;
    TypeFunction.ZhanGong_2 = 162;
    TypeFunction.ZhanGong_3 = 163;
    TypeFunction.ZhanGong_4 = 164;
    //战盾
    TypeFunction.ZhanDun_0 = 170;
    TypeFunction.ZhanDun_1 = 171;
    TypeFunction.ZhanDun_2 = 172;
    TypeFunction.ZhanDun_3 = 173;
    TypeFunction.ZhanDun_4 = 174;
    //九曲
    TypeFunction.JiuQu_0 = 180;
    TypeFunction.JiuQu_1 = 181;
    TypeFunction.JiuQu_2 = 182;
    TypeFunction.JiuQu_3 = 183;
    TypeFunction.JiuQu_4 = 184;
    //六道
    TypeFunction.LiuDao_0 = 190;
    TypeFunction.LiuDao_1 = 191;
    TypeFunction.LiuDao_2 = 192;
    TypeFunction.LiuDao_3 = 193;
    TypeFunction.LiuDao_4 = 194;
    //仙童
    TypeFunction.XIANTONG_1 = 201;
    TypeFunction.XIANTONG_2 = 202;
    TypeFunction.XIANTONG_3 = 203;
    TypeFunction.XIANTONG_4 = 204;
    TypeFunction.XIANTONG_5 = 205;
    TypeFunction.XIANTONG_6 = 206;
    //将星、
    // public static JIANGXING_WEI: number = 211;
    // public static JIANGXING_SHU: number = 212;
    // public static JIANGXING_WU: number = 213;
    // public static JIANGXING_QUN: number = 214;
    TypeFunction.JIANGXING = 1009;
    //橙装
    TypeFunction.CHENGZHUANG_1 = 20;
    TypeFunction.CHENGZHUANG_2 = 21;
    TypeFunction.CHENGZHUANG_3 = 22;
    TypeFunction.CHENGZHUANG_4 = 23;
    TypeFunction.CHENGZHUANG_5 = 24;
    TypeFunction.ZhanQi = 1000; //战骑
    TypeFunction.ZhanQi_ZZ = 1001; //战骑资质丹
    TypeFunction.ZhanQi_FSD = 1002; //战骑飞升丹
    TypeFunction.FaQi = 1003; //法器（原幻武）保证原来的逻辑不变
    TypeFunction.ShiZhuangChengHao = 1004; //时装称号 保证原来的逻辑不变
    TypeFunction.ShenBin = 1005; //神兵
    TypeFunction.TuMoShengQi = 1006; //屠魔圣器（原神器）
    TypeFunction.ZhanHun = 1007; //斗魄
    TypeFunction.QiShi = 1008; //骑士 保证原来的逻辑不变
    TypeFunction.HONGYAN_TOTAL = 1010; //红颜总战力
    return TypeFunction;
}());
__reflect(TypeFunction.prototype, "TypeFunction");
