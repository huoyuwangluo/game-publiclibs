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
var mo;
(function (mo) {
    var ModelHeCheng = (function (_super) {
        __extends(ModelHeCheng, _super);
        function ModelHeCheng() {
            return _super.call(this) || this;
        }
        ModelHeCheng.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this.getEquipInfo();
        };
        ModelHeCheng.prototype.getEquipInfo = function () {
            this._jiuXing = [];
            this._liuDao = [];
            this._talentBook = [];
            var equipArr = Templates.getList(templates.Map.EQUIP);
            for (var i = 0; i < equipArr.length; i++) {
                if (equipArr[i].type == TypeEquip.JIUQU_EQIUP) {
                    this._jiuXing.push(equipArr[i]);
                }
                else if (equipArr[i].type == TypeEquip.LIUDAO_EQIUP) {
                    this._liuDao.push(equipArr[i]);
                }
            }
            //天赋书合成
            var talentBook = Templates.getList(templates.Map.ITEMCOMPOSE);
            for (var j = 0; j < talentBook.length; j++) {
                this._talentBook.push(talentBook[j]);
            }
        };
        ModelHeCheng.prototype.getJiuXingEquipStep = function (type) {
            this._equipArrStep = [];
            this._equipStep = [];
            if (this._jiuXing && type == 1) {
                for (var i = 0; i < this._jiuXing.length; i++) {
                    if (this._equipArrStep.indexOf(this._jiuXing[i].step) == -1) {
                        this._equipArrStep.push(this._jiuXing[i].step);
                    }
                }
            }
            if (this._liuDao && type == 2) {
                for (var k = 0; k < this._liuDao.length; k++) {
                    if (this._equipArrStep.indexOf(this._liuDao[k].step) == -1) {
                        this._equipArrStep.push(this._liuDao[k].step);
                    }
                }
            }
            if (this._talentBook && type == 0) {
                for (var v = 0; v < this._talentBook.length; v++) {
                    if (this._equipArrStep.indexOf(this._talentBook[v].type) == -1) {
                        this._equipArrStep.push(this._talentBook[v].type);
                    }
                }
            }
            if (type == 3) {
                var elixirdata = [{ "name": Language.C_ZJSJD }, { "name": Language.C_WJSJD }];
                return elixirdata;
            }
            for (var j = 0; j < this._equipArrStep.length; j++) {
                var data = { "name": "", redpoint: false };
                if (type != 0) {
                    if (j == this._equipArrStep.length - 1) {
                        break;
                    }
                    var name = type == 1 ? Language.C_JXING : Language.C_LDAO;
                    data.name = name + this._equipArrStep[j] + Language.C_J;
                    var propIdArr = GameModels.hecheng.getItemsByTypeAndStep(type == 1 ? TypeEquip.JIUQU_EQIUP : TypeEquip.LIUDAO_EQIUP, this._equipArrStep[j], true);
                    for (var i = 0; i < propIdArr.length; i++) {
                        if (GameModels.bag.getEquipCountById(propIdArr[i]) >= 3) {
                            data.redpoint = true;
                        }
                    }
                    this._equipStep.push(data);
                }
                else {
                    data.name = this.changTalentName(this._equipArrStep[j]);
                    var allPropIdArr = [];
                    var propIdArr = GameModels.hecheng.getItemsByTypeAndStep(TypeItem.BINGFA_BOOK, (j + 2), false);
                    for (var i = 0; i < propIdArr.length; i++) {
                        var count = GameModels.bag.getBingFaCountById(propIdArr[i]);
                        for (var z = 0; z < count; z++) {
                            allPropIdArr.push(propIdArr[i]);
                        }
                    }
                    if (allPropIdArr.length >= 5)
                        data.redpoint = true;
                    this._equipStep.push(data);
                }
            }
            return this._equipStep;
        };
        ModelHeCheng.prototype.changTalentName = function (quality) {
            var talentName = "";
            switch (quality) {
                case 11:
                    talentName = Language.C_FANPINTFS;
                    break;
                case 12:
                    talentName = Language.C_JINGPTFS;
                    break;
                case 13:
                    talentName = Language.C_SHANGPTFS;
                    break;
                case 14:
                    talentName = Language.C_JIPTFS;
                    break;
                case 15:
                    talentName = Language.C_TIANPTFS;
                    break;
            }
            return talentName;
        };
        /**合成 */
        ModelHeCheng.prototype.itemCompose = function (id, itemids, successhandler) {
            var msg = n.MessagePool.from(n.C2G_Item_Compose);
            msg.Id = id;
            msg.ItemIds = itemids;
            this.request(n.MessageMap.C2G_ITEM_COMPOSE, msg, utils.Handler.create(this, function (data) {
                if (successhandler)
                    successhandler.runWith(data);
                GameModels.state.updateState(GameRedState.BAG_HECHENG);
            }));
        };
        /**合成 */
        ModelHeCheng.prototype.requesHeChengNewEquips = function (refId, handler) {
            var cmd = n.MessagePool.from(n.C2G_NewEquip_HeCheng);
            cmd.TargetRefId = refId;
            this.request(n.MessageMap.C2G_NEWEQUIP_HECHENG, cmd, utils.Handler.create(this, function (data) {
                if (data) {
                    if (handler)
                        handler.runWith(data);
                    GameModels.state.updateState(GameRedState.BAG_HECHENG);
                }
            }));
        };
        /**根据Type和Step获取物品集合 */
        ModelHeCheng.prototype.getItemsByTypeAndStep = function (type, step, isEqiup) {
            var results = [];
            var propIdArr = [];
            if (isEqiup) {
                for (var _i = 0, _a = GameModels.bag.equips.source; _i < _a.length; _i++) {
                    var vo_1 = _a[_i];
                    if (vo_1.type == type && vo_1.step == step) {
                        results.push(vo_1);
                    }
                }
            }
            else {
                for (var _b = 0, _c = GameModels.bag.bingFa.source; _b < _c.length; _b++) {
                    var co = _c[_b];
                    if (co.type == type && co.quality == step) {
                        results.push(co);
                    }
                }
            }
            for (var _d = 0, results_1 = results; _d < results_1.length; _d++) {
                var str = results_1[_d];
                if (propIdArr.indexOf(str.id) == -1) {
                    propIdArr.push(str.id);
                }
            }
            return propIdArr;
        };
        return ModelHeCheng;
    }(mo.ModelBase));
    mo.ModelHeCheng = ModelHeCheng;
    __reflect(ModelHeCheng.prototype, "mo.ModelHeCheng");
})(mo || (mo = {}));
