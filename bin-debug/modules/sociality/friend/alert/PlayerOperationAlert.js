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
var PlayerOperationAlert = (function (_super) {
    __extends(PlayerOperationAlert, _super);
    function PlayerOperationAlert() {
        var _this = _super.call(this) || this;
        _this._qualityArr = [_this.imgQuila, _this.imgQuila0, _this.imgQuila1, _this.imgQuila2, _this.imgQuila3];
        _this._iconArr = [_this.imgIcon, _this.imgIcon0, _this.imgIcon1, _this.imgIcon2, _this.imgIcon3];
        _this._labArr = [_this.labName, _this.labName0, _this.labName1, _this.labName2, _this.labName3];
        _this._starArr = [_this.imgStar, _this.imgStar0, _this.imgStar1, _this.imgStar2, _this.imgStar3];
        return _this;
    }
    PlayerOperationAlert.prototype.show = function (data, count) {
        this._data = data;
        this._count = count;
        this.initData();
        this.initPlayerInfo();
        this.btnPM.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnPK.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnReFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnReBlack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnAddFriend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnAddBlack.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        for (var i = 0; i < this._iconArr.length; i++) {
            this._iconArr[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPetClick, this);
        }
    };
    PlayerOperationAlert.prototype.hide = function () {
        this.btnPM.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnPK.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnReFriend.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnReBlack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnAddFriend.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        this.btnAddBlack.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        for (var i = 0; i < this._iconArr.length; i++) {
            this._iconArr[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onPetClick, this);
        }
        this._data = null;
        if (this.parent) {
            this.parent.removeChild(this);
        }
    };
    PlayerOperationAlert.prototype.onPetClick = function (e) {
        var index = this._iconArr.indexOf(e.currentTarget);
        var petRoomList = this._nowPlayerData.PlayerData.PetRoomList;
        var pet = this.getPetByUid(petRoomList[index].CurPetId);
        var newEquipInfo = this._nowPlayerData.PlayerData.Equips;
        var equipVOArr = [];
        for (var i = 0; i < newEquipInfo.length; i++) {
            var equipTemp = Templates.getTemplateById(templates.Map.EQUIP, newEquipInfo[i].RefId);
            var equipVO = vo.fromPool(vo.EquipVO, equipTemp);
            equipVOArr.push(equipVO);
        }
        var obj = { data: pet, tabIndex: index, equips: equipVOArr };
        mg.TipManager.instance.showTip(tips.GeneralInfoTip, obj);
    };
    PlayerOperationAlert.prototype.initPlayerInfo = function () {
        var _this = this;
        if (!this._data)
            return;
        GameModels.ranking.requestPlayerData(this._data.PlayerId, utils.Handler.create(this, function (data) {
            data.autoRecover = false;
            _this._nowPlayerData = data;
            _this.showPet();
        }));
    };
    PlayerOperationAlert.prototype.showPet = function () {
        for (var j = 0; j < this._qualityArr.length; j++) {
            this._qualityArr[j].source = "qualityBg_json.img_qlt_1_png";
            this._iconArr[j].source = null;
            this._starArr[j].source = null;
            this._labArr[j].text = "";
        }
        var petRoomList = this._nowPlayerData.PlayerData.PetRoomList;
        for (var i = 0; i < 5; i++) {
            if (petRoomList[i] && petRoomList[i].CurPetId) {
                var pet = this.getPetByUid(petRoomList[i].CurPetId);
                if (pet) {
                    var item = Templates.getTemplateById(templates.Map.ITEM, pet.PetRefId);
                    this._iconArr[i].source = item.icon;
                    this._qualityArr[i].source = ResPath.getPetQualityByStar(pet.Star, GameModels.pet.isHashFourSkill(pet.PetRefId));
                    this._starArr[i].source = "tujian_json.img_star" + pet.Star;
                    this._labArr[i].text = "LV." + pet.Level.toString();
                }
            }
        }
    };
    PlayerOperationAlert.prototype.getPetByUid = function (uid) {
        var petList = this._nowPlayerData.PlayerData.PetList;
        for (var i = 0; i < petList.length; i++) {
            if (petList[i].PetId == uid) {
                return petList[i];
            }
        }
        return null;
    };
    PlayerOperationAlert.prototype.onClick = function (e) {
        switch (e.target) {
            // case this.btnLook:
            // 	mg.uiManager.show(dialog.playerInfo.PlayerInfo, this._data.PlayerId);
            // 	this.dispatchEventWith(egret.Event.CLOSE);
            // 	break;
            case this.btnPM:
                this.privateChat();
                break;
            case this.btnPK:
                if (GameModels.user.player.level < 60) {
                    mg.alertManager.tip(Language.J_DJBZ1);
                }
                else {
                    app.gameContext.enterFriendDiscussFight(this._data.PlayerId);
                    this.dispatchEventWith(egret.Event.CLOSE);
                }
                break;
            case this.btnReFriend:
                GameModels.friends.sendDeleteFriend(this._data.PlayerId);
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnReBlack:
                GameModels.friends.sendDeleteBlackList(this._data.PlayerId);
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.btnAddFriend:
                if (this._data.PlayerId == GameModels.user.player.uid) {
                    mg.alertManager.tip(Language.J_BNTJZJWHY);
                }
                else if (GameModels.user.player.level < 70) {
                    mg.alertManager.tip(Language.getExpression(Language.E_1JKFGN, 70), 0xff0000);
                }
                else {
                    GameModels.friends.sendAddFriend(this._data.PlayerName, utils.Handler.create(this, this.addBack));
                    this.dispatchEventWith(egret.Event.CLOSE);
                }
                break;
            case this.btnAddBlack:
                GameModels.friends.sendAddBlackList(this._data.PlayerId);
                this.dispatchEventWith(egret.Event.CLOSE);
                break;
            case this.imgIcon:
                break;
            case this.imgIcon0:
                break;
            case this.imgIcon1:
                break;
            case this.imgIcon2:
                break;
            case this.imgIcon3:
                break;
        }
    };
    PlayerOperationAlert.prototype.privateChat = function () {
        if (this._data.PlayerId == GameModels.user.player.uid) {
            mg.alertManager.tip(Language.J_BNHZJSL);
            return;
        }
        var viplv = GameModels.user.player.getProperty(TypeProperty.VIP_LEVEL) || 0;
        if (viplv < 1) {
            mg.alertManager.tip(Language.J_VIP1CKYSL);
            return;
        }
        if (!GameModels.friends.isFriend(this._data.PlayerId)) {
            mg.alertManager.tip(Language.J_ZYHYCNSL);
            return;
        }
        mg.alertManager.showAlert(dialog.sociality.friend.PrivateChatDialog, true, true, this._data);
        this.dispatchEventWith(egret.Event.CLOSE);
    };
    PlayerOperationAlert.prototype.addBack = function (data) {
        if (data.Result == 1) {
            mg.alertManager.tip(Language.J_SQCG);
        }
        else if (data.Result == 2) {
            mg.alertManager.tip(Language.J_TJCG);
        }
    };
    PlayerOperationAlert.prototype.initData = function () {
        this.imgHead.source = ResPath.getPlayerIconSmall(this._data.HeadIcon);
        this.labplayerName.text = this._data.PlayerName;
        this.lablv.text = "" + this._data.Level;
        if (TypeUnionName.getUnionId(this._data.UnionName) != 0) {
            this.imgPoint.visible = true;
            this.imgPoint.source = "common_json.img_union_point" + TypeUnionName.getUnionId(this._data.UnionName) + "_png";
        }
        else {
            this.imgPoint.visible = false;
        }
        this.labFight.text = this._data.FightValue;
        this.btnPK.label = "";
        if (this._data.VipLevel > 0) {
            this.imgVip.visible = true;
            this.imgVip.source = "common_json.img_vip_png";
            if (this._data.VipLevel > 10) {
                this.labVipRanking.visible = false;
                this.imgVip.source = "rankings_json.img_rang_vip" + this._data.VipLevel;
            }
            else {
                this.labVipRanking.visible = true;
                this.labVipRanking.text = this._data.VipLevel.toString();
            }
        }
        else {
            this.imgVip.visible = false;
            this.labVipRanking.visible = false;
        }
        this.btnAddFriend.visible = !GameModels.friends.isFriend(this._data.PlayerId);
        this.btnReFriend.visible = GameModels.friends.isFriend(this._data.PlayerId);
        this.btnAddBlack.visible = !GameModels.friends.isBlackList(this._data.PlayerId);
        this.btnReBlack.visible = GameModels.friends.isBlackList(this._data.PlayerId);
    };
    return PlayerOperationAlert;
}(ui.PlayerOperationAlertSkin));
__reflect(PlayerOperationAlert.prototype, "PlayerOperationAlert", ["IAlert", "egret.DisplayObject"]);
