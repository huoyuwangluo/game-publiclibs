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
var components;
(function (components) {
    var RoleHeadList = (function (_super) {
        __extends(RoleHeadList, _super);
        function RoleHeadList() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        RoleHeadList.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._selectIndex = 0;
            this._roles = [this.role0, this.role1, this.role2, this.role3, this.role4];
        };
        RoleHeadList.prototype.init = function (selectIndex, call, changeHandler) {
            if (selectIndex === void 0) { selectIndex = 0; }
            if (call === void 0) { call = null; }
            if (changeHandler === void 0) { changeHandler = null; }
            this._caller = call;
            this.selectIndex = selectIndex ? selectIndex : 0;
            this.changeHandler = changeHandler;
            this.initDisplay();
            //TODO 监听等级变化
            GameModels.pet.addEventListener(mo.ModelPet.PET_CHANGE_LOCK, this.updataLvAndHead, this);
            GameModels.pet.addEventListener(mo.ModelPet.FORMAT_CHANGE, this.updataLvAndHead, this);
            GameModels.upStar.addEventListener(mo.ModelUpStar.PET_CHANGE, this.updataLvAndHead, this);
            GameModels.pet.addEventListener(mo.ModelPet.PET_CHANGE_LEVEL, this.updataLvAndHead, this);
        };
        RoleHeadList.prototype.reset = function () {
            this._changeHandler = null;
            this._caller = null;
            this._selectIndex = 0;
            for (var i = 0; i < this._roles.length; i++) {
                this._roles[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
                this._roles[i].unRegisterWarn();
            }
            GameModels.pet.removeEventListener(mo.ModelPet.PET_CHANGE_LOCK, this.updataLvAndHead, this);
            GameModels.pet.removeEventListener(mo.ModelPet.FORMAT_CHANGE, this.updataLvAndHead, this);
            GameModels.upStar.removeEventListener(mo.ModelUpStar.PET_CHANGE, this.updataLvAndHead, this);
            GameModels.pet.removeEventListener(mo.ModelPet.PET_CHANGE_LEVEL, this.updataLvAndHead, this);
        };
        RoleHeadList.prototype.getHeadByIndex = function (pos) {
            return this._roles[pos];
        };
        /**
         * 注册头像红点 GameRedState.type
         */
        RoleHeadList.prototype.registerWarns = function (type0, type1, type2, type3, type4) {
            var _redStateTypeList = [type0, type1, type2, type3, type4];
            for (var i = 0; i < this._roles.length; i++) {
                this._roles[i].registerWarn(_redStateTypeList[i]);
            }
        };
        RoleHeadList.prototype.updataLvAndHead = function () {
            //this._roles[0].setHeadInfo(GameModels.user.player.headIcon, GameModels.user.player.level);
            for (var i = 0; i < this._roles.length; i++) {
                var isUnLock = GameModels.pet.isPosUnLock(i);
                var hasPet = GameModels.pet.hasPetPos(i);
                if (!isUnLock) {
                    this._roles[i].setGeneralHeadInfo("common_json.img_lock_png", 0, true);
                    continue;
                }
                if (!hasPet) {
                    this._roles[i].setGeneralHeadInfo("common_json.img_add_png", 0, true);
                    continue;
                }
                var vo = GameModels.pet.getFormatUpVOByPos(i);
                if (vo) {
                    this._roles[i].setGeneralHeadInfo(parseInt(vo.headIcon), vo.lv, false, vo);
                }
            }
        };
        RoleHeadList.prototype.initDisplay = function () {
            this.updataLvAndHead();
            for (var i = 0; i < this._roles.length; i++) {
                this._roles[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickHandler, this);
            }
        };
        RoleHeadList.prototype.onClickHandler = function (e) {
            common.CommonBtnUpDataState.instance.clearTime();
            var index = 0;
            if (e.target instanceof components.HeadInfo) {
                mg.soundManager.playSound('ButtonClick_1');
                index = this._roles.indexOf(e.target);
                if (index >= 0 && index != this._selectIndex) {
                    this.selectIndex = index;
                    if (index == 0) {
                        if (this._changeHandler && this._caller)
                            this._changeHandler.call(this._caller, this._selectIndex);
                        return;
                    }
                    var isUnLock = GameModels.pet.isPosUnLock(index);
                    var hasPet = GameModels.pet.hasPetPos(index);
                    if (!isUnLock) {
                        mg.alertManager.tip(Language.J_ZXRWKQ);
                        return;
                    }
                    if (!hasPet) {
                        if (GameModels.pet.formatDownVOList.length <= 0) {
                            mg.alertManager.tip(Language.J_MYKRMHS);
                        }
                        else {
                            if (mg.uiManager.isOpen(dialog.role.RoleMainDialog)) {
                                mg.uiManager.show(dialog.list.PetListDialog, index);
                            }
                            else {
                                mg.uiManager.show(dialog.role.RoleMainDialog);
                            }
                        }
                        return;
                    }
                    //播放获得时声音
                    var petVO = GameModels.pet.getFormatUpVOByPos(index);
                    var generaltmp = Templates.getTemplateById(templates.Map.GENERAL, petVO.refId);
                    var dataModel = Templates.getTemplateByProperty(templates.Map.DATAMODEL, "resId", generaltmp.model);
                    mg.soundManager.playSoundStopLast(dataModel.getSound);
                    if (this._changeHandler && this._caller)
                        this._changeHandler.call(this._caller, this._selectIndex);
                }
            }
        };
        Object.defineProperty(RoleHeadList.prototype, "selectIndex", {
            get: function () {
                return this._selectIndex;
            },
            set: function (value) {
                if (value > 0) {
                    var vo = GameModels.pet.getFormatUpVOByPos(value);
                    if (!vo)
                        return;
                }
                this._selectIndex = value;
                this.imgSelecd.x = this._roles[this._selectIndex].x + 3.5;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RoleHeadList.prototype, "changeHandler", {
            set: function (value) {
                this._changeHandler = value;
                if (this._changeHandler && this._caller)
                    this._changeHandler.call(this._caller, this._selectIndex);
            },
            enumerable: true,
            configurable: true
        });
        RoleHeadList.prototype.getRoleByIndex = function (index) {
            return this._roles[index];
        };
        return RoleHeadList;
    }(ui.RoleHeadListSkin));
    components.RoleHeadList = RoleHeadList;
    __reflect(RoleHeadList.prototype, "components.RoleHeadList");
})(components || (components = {}));
