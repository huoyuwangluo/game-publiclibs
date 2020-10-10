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
    var ModelPetGroup = (function (_super) {
        __extends(ModelPetGroup, _super);
        function ModelPetGroup() {
            return _super.call(this) || this;
        }
        ModelPetGroup.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._petGroupArr = [];
            this._isOpenPetGroupView = false;
            this.requestPetGroupInfo();
        };
        ModelPetGroup.prototype.initPetGroupInfo = function (data) {
            this._petGroupArr = [];
            for (var i = 0; i < data.length; i++) {
                var petGroup = vo.fromPool(vo.PetGroupVo);
                petGroup.decode(data[i]);
                this._petGroupArr.push(petGroup);
            }
        };
        ModelPetGroup.prototype.updataPetGroupInfo = function (data) {
            if (this._petGroupArr) {
                for (var i = 0; i < this._petGroupArr.length; i++) {
                    if (this._petGroupArr[i].id == data.GroupId) {
                        this._petGroupArr[i].doneCount = data.DoneCount;
                        this._petGroupArr[i].status = data.Status;
                        if (data.PlayerName) {
                            this._petGroupArr[i].playerName = data.PlayerName;
                            this._petGroupArr[i].playerId = data.PlayerId;
                        }
                        else {
                            this._petGroupArr[i].playerName = "";
                        }
                        this.dispatchEventWith(ModelPetGroup.PETGROUP_CHANGE, false, this._petGroupArr[i]);
                        break;
                    }
                }
            }
        };
        ModelPetGroup.prototype.updataHandlerPetGroupInfo = function () {
            this.requestPetGroupInfo();
        };
        //请求武将组合信息
        ModelPetGroup.prototype.requestPetGroupInfo = function (handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_GeneralGroup_GetInfo);
            this.request(n.MessageMap.C2G_GENERALGROUP_GETINFO, msg, utils.Handler.create(this, function (data) {
                _this.initPetGroupInfo(data.GroupList);
                GameModels.state.updateState(GameRedState.WANJIANGGUIXIN);
                if (handler) {
                    handler.runWith(data);
                }
            }));
        };
        //请求注册武将组合
        ModelPetGroup.prototype.requestRegisterPetGroup = function (id, handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_GeneralGroup_Register);
            msg.GroupId = id;
            this.request(n.MessageMap.C2G_GENERALGROUP_REGISTER, msg, utils.Handler.create(this, function (data) {
                if (data) {
                    _this.updataPetGroupInfo(data.GroupInfo);
                }
                GameModels.state.updateState(GameRedState.WANJIANGGUIXIN);
                if (handler) {
                    handler.runWith(data);
                }
            }));
        };
        //请求解除武将组合
        ModelPetGroup.prototype.requestUnRegisterPetGroup = function (id, handler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_GeneralGroup_Unregister);
            msg.GroupId = id;
            this.request(n.MessageMap.C2G_GENERALGROUP_UNREGISTER, msg, utils.Handler.create(this, function (data) {
                if (data) {
                    _this.updataPetGroupInfo(data.GroupInfo);
                }
                GameModels.state.updateState(GameRedState.WANJIANGGUIXIN);
                if (handler) {
                    handler.runWith(data);
                }
            }));
        };
        //获取组合的效忠名单
        ModelPetGroup.prototype.requestetRegisterPlayerList = function (id, handler) {
            var msg = n.MessagePool.from(n.C2G_GenrealGroup_GetRegisterPlayerList);
            msg.GroupId = id;
            this.request(n.MessageMap.C2G_GENREALGROUP_GETREGISTERPLAYERLIST, msg, utils.Handler.create(this, function (data) {
                if (handler) {
                    handler.runWith(data);
                }
            }));
        };
        /**获取武将信息 */
        ModelPetGroup.prototype.getPetGroupArr = function (type) {
            return this._petGroupArr;
        };
        ModelPetGroup.prototype.getPetGroupBuyCountry = function (country) {
            var groupArr = [];
            if (this._petGroupArr) {
                for (var i = 0; i < this._petGroupArr.length; i++) {
                    if (this._petGroupArr[i].country == country) {
                        groupArr.push(this._petGroupArr[i]);
                    }
                }
            }
            return groupArr;
        };
        ModelPetGroup.prototype.getPetGroupRedPointBuyCountry = function (country) {
            var groupArr = [];
            if (this._petGroupArr) {
                for (var i = 0; i < this._petGroupArr.length; i++) {
                    var counmes = this._petGroupArr[i].consumes.split("_");
                    var needItem = Templates.getTemplateById(templates.Map.ITEM, counmes[0]);
                    var needCount = parseInt(counmes[1]);
                    var bagCount = GameModels.bag.getItemCountById(counmes[0]);
                    ;
                    if (country == 0) {
                        var count = this.getMyRegisterZYPetGroupCount();
                        if (count < 5 && this._petGroupArr[i].country == country && this._petGroupArr[i].status == 1 && this._petGroupArr[i].playerName == "" && bagCount >= needCount) {
                            return true;
                        }
                    }
                    else {
                        if (this._petGroupArr[i].country == country && this._petGroupArr[i].status == 1 && bagCount >= needCount) {
                            return true;
                        }
                    }
                }
            }
            return false;
        };
        ModelPetGroup.prototype.getMyRegisterPetGroup = function () {
            var groupArr = [];
            if (this._petGroupArr) {
                for (var i = 0; i < this._petGroupArr.length; i++) {
                    if (this._petGroupArr[i].country == 0) {
                        if (this._petGroupArr[i].playerName == GameModels.user.player.name) {
                            groupArr.push(this._petGroupArr[i]);
                        }
                    }
                    else {
                        if (this._petGroupArr[i].status == 2) {
                            groupArr.push(this._petGroupArr[i]);
                        }
                    }
                }
            }
            return groupArr;
        };
        /**获取我已赏赐的忠义之士的武将组数量 */
        ModelPetGroup.prototype.getMyRegisterZYPetGroupCount = function () {
            var count = 0;
            for (var i = 0; i < this._petGroupArr.length; i++) {
                if (this._petGroupArr[i].country == 0 && this._petGroupArr[i].playerName == GameModels.user.player.name) {
                    count++;
                }
            }
            return count;
        };
        Object.defineProperty(ModelPetGroup.prototype, "isOpenPetGroupView", {
            get: function () {
                return this._isOpenPetGroupView;
            },
            set: function (v) {
                this._isOpenPetGroupView = v;
                GameModels.state.updateState(GameRedState.WANJIANGGUIXIN);
            },
            enumerable: true,
            configurable: true
        });
        ModelPetGroup.prototype.checkPetGroupRedPoint = function () {
            if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.shengZhiMain, 2))
                return false;
            if (!this._isOpenPetGroupView)
                return true;
            for (var _i = 0, _a = this._petGroupArr; _i < _a.length; _i++) {
                var pet = _a[_i];
                var counmes = pet.consumes.split("_");
                var needItem = Templates.getTemplateById(templates.Map.ITEM, counmes[0]);
                var needCount = parseInt(counmes[1]);
                var bagCount = GameModels.bag.getItemCountById(counmes[0]);
                ;
                if (pet.country == 0) {
                    var count = this.getMyRegisterZYPetGroupCount();
                    if (count < 5 && pet.status == 1 && bagCount >= needCount)
                        return true;
                }
                else {
                    if (pet.status == 1 && bagCount >= needCount) {
                        return true;
                    }
                }
            }
            return false;
        };
        ModelPetGroup.PETGROUP_CHANGE = "PETGROUP_CHANGE";
        return ModelPetGroup;
    }(mo.ModelBase));
    mo.ModelPetGroup = ModelPetGroup;
    __reflect(ModelPetGroup.prototype, "mo.ModelPetGroup");
})(mo || (mo = {}));
