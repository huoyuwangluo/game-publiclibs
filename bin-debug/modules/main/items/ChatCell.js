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
var ui;
(function (ui) {
    var ChatCell = (function (_super) {
        __extends(ChatCell, _super);
        function ChatCell() {
            var _this = _super.call(this) || this;
            _this.skinName = 'skin.ChatCellSkin';
            return _this;
        }
        ChatCell.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initText();
        };
        ChatCell.prototype.initText = function () {
            if (!this.tf) {
                this.tf = new egret.RichTextField(TypeChatEmoji.emoji_static);
                this.addChild(this.tf);
                this.tf.x = 36;
                this.tf.y = 0;
                this.tf.width = 429;
                this.labMsg = this.tf.textField;
                this.labMsg.lineSpacing = 5;
                this.labMsg.size = 18;
                this.labMsg.maxWidth = 429;
                this.labMsg.wordWrap = true;
                this.labMsg.addEventListener(egret.TextEvent.LINK, this.onLinkHandler, this);
            }
        };
        ChatCell.prototype.dataChanged = function () {
            var chatData = this.data;
            this.initText();
            if (chatData.country != 0) {
                this.tf.x = 62;
                this.tf.width = 403;
                this.labMsg.maxWidth = 403;
                this.countryType.visible = true;
                this.countryType.source = "uiMain_json.main_chat_type_" + chatData.country;
            }
            else {
                this.tf.x = 36;
                this.tf.width = 429;
                this.labMsg.maxWidth = 429;
                this.countryType.visible = false;
                this.countryType.source = null;
            }
            this.setChatTypeImage();
            this.setCountryTypeImage();
            this.tf.textFlow = utils.TextFlowMaker.generateTextFlow(chatData.msg);
            this.tf.height = this.labMsg.textHeight;
            this.height = this.tf.height;
        };
        ChatCell.prototype.onLinkHandler = function (evt) {
            var chatData = this.data;
            var arr = evt.text.split('_');
            var type = arr[0];
            var value = arr[1];
            switch (type) {
                case vo.ChatVO.LINK_TYPE_OPENUI:
                    mg.uiManager.showByName(parseInt(arr[1]));
                    break;
                case vo.ChatVO.LINK_TYPE_OPENPLAYER:
                    if (chatData.type != TypeChatChannel.CROSSREALM) {
                        GameModels.friends.getPromptInfo(chatData.id, utils.Handler.create(this, function (info, count) {
                            mg.alertManager.showAlert(PlayerOperationAlert, true, true, info, count);
                        }));
                    }
                    else {
                        mg.alertManager.tip(Language.KF_KFLTZBKCKWJXX);
                    }
                    break;
                case vo.ChatVO.LINK_TYPE_SENDMSG:
                    if (value == "9999") {
                        if (this.checkCanJoin())
                            return;
                        GameModels.copyMaterial.sendTeamJoin(chatData.id);
                    }
                    else if (value == "9995") {
                        if (this.checkCanJoin())
                            return;
                        if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.copyboss, 3, true))
                            return;
                        if (!chatData.copyId)
                            return;
                        var copyVO = GameModels.copyBoss.getVOById(mo.ModelGameBoss.COPY_FAMILY, parseInt(chatData.copyId));
                        //if (copyVO) app.gameContext.enterFamilyBoss(copyVO);
                    }
                    else if (value == "9996") {
                        if (this.checkCanJoin())
                            return;
                        if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.copyboss, 2, true))
                            return;
                        if (!chatData.copyId)
                            return;
                        var copyVO = GameModels.copyBoss.getVOById(mo.ModelGameBoss.COPY_DOMAIN, parseInt(chatData.copyId));
                        if (copyVO)
                            app.gameContext.enterGodDomain(copyVO);
                    }
                    else if (value == "9997") {
                        if (this.checkCanJoin())
                            return;
                        if (!TypeFunOpen.checkFuncOpen(s.UserfaceName.sports, 2, true))
                            return;
                        if (!chatData.copyId)
                            return;
                        var copyVO = GameModels.copyBoss.getVOById(mo.ModelGameBoss.COPY_DEATH, parseInt(chatData.copyId));
                        //if (copyVO) app.gameContext.enterDeathEveryOneBoss(copyVO);
                    }
                    break;
            }
        };
        ChatCell.prototype.checkCanJoin = function () {
            if (utils.CheckUtil.checkBagSmelting())
                return true;
            if (TypeGame.isCopy(app.gameContext.gameCurrent.type)) {
                mg.alertManager.tip(Language.J_FBZWFQH);
                return true;
            }
            if ((app.gameContext.gameCurrent && app.gameContext.gameCurrent.type == TypeGame.CHAPTER_BOSS)) {
                mg.alertManager.tip(Language.J_GKZWFQH);
                return true;
            }
            return false;
        };
        ChatCell.prototype.setCountryTypeImage = function () {
            var chatData = this.data;
            if (!chatData || chatData.country == 0) {
                this.countryType.source = null;
                this.countryType.visible = false;
                return;
            }
            this.countryType.source = "uiMain_json.main_chat_type_" + chatData.country;
            this.countryType.visible = true;
        };
        ChatCell.prototype.setChatTypeImage = function () {
            var chatData = this.data;
            if (!chatData || !chatData.type) {
                this.imgType.source = null;
                this.imgType.visible = false;
                return;
            }
            switch (chatData.type) {
                case TypeChatChannel.WORLD:
                    this.imgType.source = "uiMain_json.main_chat_type_world";
                    this.imgType.visible = true;
                    break;
                case TypeChatChannel.LEGION:
                    this.imgType.source = "uiMain_json.main_chat_type_legion";
                    this.imgType.visible = true;
                    break;
                case TypeChatChannel.SYS:
                    this.imgType.source = "uiMain_json.main_chat_type_system";
                    this.imgType.visible = true;
                    break;
                case TypeChatChannel.CROSSREALM:
                    this.imgType.source = "uiMain_json.main_chat_type_cross";
                    this.imgType.visible = true;
                    break;
                default:
                    this.imgType.source = null;
                    this.imgType.visible = false;
            }
        };
        return ChatCell;
    }(eui.ItemRenderer));
    ui.ChatCell = ChatCell;
    __reflect(ChatCell.prototype, "ui.ChatCell");
})(ui || (ui = {}));
