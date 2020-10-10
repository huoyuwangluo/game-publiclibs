var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TypeBuff = (function () {
    function TypeBuff() {
    }
    //与服务端一致的枚举，以下客户端需要处理的BUFF
    /**眩晕 */
    TypeBuff.BUFF_TYPE_3301 = 3301;
    /**增加或减少普攻CD【正负】*/
    TypeBuff.BUFF_TYPE_3303 = 3303;
    /**增加或减少技能CD【正负】 */
    TypeBuff.BUFF_TYPE_3304 = 3304;
    /**增加或减少移动速度【正负】 */
    TypeBuff.BUFF_TYPE_3305 = 3305;
    /**沉默【无法释放技能】 */
    TypeBuff.BUFF_TYPE_3306 = 3306;
    /**止足【无法移动】 */
    TypeBuff.BUFF_TYPE_3307 = 3307;
    /**冰封【眩晕另一种表现】 */
    TypeBuff.BUFF_TYPE_3308 = 3308;
    /**麻痹【眩晕另一种表现】 */
    TypeBuff.BUFF_TYPE_3309 = 3309;
    /**变身,换模型 */
    TypeBuff.BUFF_TYPE_9013 = 9013;
    return TypeBuff;
}());
__reflect(TypeBuff.prototype, "TypeBuff");
