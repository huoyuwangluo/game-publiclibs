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
    var ModelSmokePet = (function (_super) {
        __extends(ModelSmokePet, _super);
        function ModelSmokePet() {
            return _super.call(this) || this;
        }
        ModelSmokePet.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._leftType1FreeCnt = this._leftType2FreeCnt = this._score = 0;
            this._petList = [];
            this.getSmokePetInfo();
        };
        ModelSmokePet.prototype.changeShiLi = function () {
            this.dispatchEventWith(mo.ModelSmokePet.SMOKEPET_SHILI_CHANGE);
        };
        Object.defineProperty(ModelSmokePet.prototype, "leftType1FreeCnt", {
            get: function () {
                return this._leftType1FreeCnt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmokePet.prototype, "leftType2FreeCnt", {
            get: function () {
                return this._leftType2FreeCnt;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmokePet.prototype, "score", {
            get: function () {
                return this._score;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmokePet.prototype, "type", {
            get: function () {
                return this._type;
            },
            set: function (v) {
                this._type = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelSmokePet.prototype, "count", {
            get: function () {
                return this._count;
            },
            set: function (v) {
                this._count = v;
            },
            enumerable: true,
            configurable: true
        });
        /**获得招募信息 */
        ModelSmokePet.prototype.getSmokePetInfo = function (successhandler) {
            var msg = n.MessagePool.from(n.C2G_Tavern3_GetPlayerTavernInfo);
            this.request(n.MessageMap.C2G_TAVERN3_GETPLAYERTAVERNINFO, msg, utils.Handler.create(this, function (data) {
                this._leftType1FreeCnt = data.LeftType1FreeCnt;
                this._leftType2FreeCnt = data.LeftType2FreeCnt;
                this._score = data.Score;
                GameModels.state.updateState(GameRedState.TREASURE_SMOKEPET);
                // GameModels.state.updateState(GameRedState.MAIN_SMOKEPET);
                if (successhandler)
                    successhandler.run();
            }));
        };
        Object.defineProperty(ModelSmokePet.prototype, "petList", {
            get: function () {
                return this._petList;
            },
            enumerable: true,
            configurable: true
        });
        /**招募 抽奖类型，1：普通，2：高级，3：势力,国家，1魏，2蜀，3吴，4群*/
        ModelSmokePet.prototype.smokePetChoujiang = function (type, times, successhandler) {
            var index = game.state.getItem(GameModels.user.player.uid, TypeSetting.SMOKEPET_ID);
            var msg = n.MessagePool.from(n.C2G_Tavern3_DoChouJiang);
            msg.Type = type;
            msg.Times = times;
            msg.Country = index;
            this.request(n.MessageMap.C2G_TAVERN3_DOCHOUJIANG, msg, utils.Handler.create(this, function (data) {
                this._leftType1FreeCnt = data.LeftType1FreeCnt;
                this._leftType2FreeCnt = data.LeftType2FreeCnt;
                this._score = data.Score;
                this._petList = data.PetList.concat();
                this.dispatchEventWith(mo.ModelSmokePet.SMOKEPET_UPDATE);
                GameModels.state.updateState(GameRedState.TREASURE_SMOKEPET);
                // GameModels.state.updateState(GameRedState.MAIN_SMOKEPET);
                if (successhandler)
                    successhandler.run();
            }));
        };
        /**获得招募信息 */
        ModelSmokePet.prototype.getJiFenReward = function (successhandler) {
            var msg = n.MessagePool.from(n.C2G_Tavern3_GetJiFenRaward);
            this.request(n.MessageMap.C2G_TAVERN3_GETJIFENRAWARD, msg, utils.Handler.create(this, function (data) {
                this._score = data.Score;
                this.dispatchEventWith(mo.ModelSmokePet.SMOKEPET_UPDATE);
                if (successhandler)
                    successhandler.run();
            }));
        };
        ModelSmokePet.prototype.checkSmokePetRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.treasure, 0))
                return false;
            if ((GameModels.funcs.hashFunIsOpen(2004) && this.leftType1FreeCnt > 0) || (GameModels.funcs.hashFunIsOpen(2005) && this.leftType2FreeCnt > 0))
                return true;
            if (GameModels.bag.getItemCountById(ConfigData.PUTON_ZHAOMU) >= 10 && GameModels.funcs.hashFunIsOpen(2004))
                return true;
            if (GameModels.bag.getItemCountById(ConfigData.GAOJI_ZHAOMU) >= 10 && GameModels.funcs.hashFunIsOpen(2005))
                return true;
            if (GameModels.bag.getItemCountById(ConfigData.SHILI_ZHAOMU) >= 10 && GameModels.funcs.hashFunIsOpen(2006))
                return true;
            return false;
        };
        ModelSmokePet.SMOKEPET_SHILI_CHANGE = "SMOKEPET_SHILI_CHANGE";
        ModelSmokePet.SMOKEPET_UPDATE = "SMOKEPET_UPDATE";
        return ModelSmokePet;
    }(mo.ModelBase));
    mo.ModelSmokePet = ModelSmokePet;
    __reflect(ModelSmokePet.prototype, "mo.ModelSmokePet");
})(mo || (mo = {}));
