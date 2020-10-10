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
    var ModelPlatform = (function (_super) {
        __extends(ModelPlatform, _super);
        function ModelPlatform() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ModelPlatform.prototype, "shareServerId", {
            /**微信分享的服务器id */
            get: function () {
                return platform.sdk ? platform.sdk.shareServerId : "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPlatform.prototype, "shareUserId", {
            /**微信分享的玩家id*/
            get: function () {
                return platform.sdk ? platform.sdk.shareUserId : "";
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(ModelPlatform.prototype, "shareType", {
            /**微信分享的类型 1登录分享 2链接分享*/
            get: function () {
                return platform.sdk ? platform.sdk.shareType : 0;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 充值
         * @param price 价格 元
         * @param buyCount 购买个数
         * @param itemId 商品Id
         * @param itemName 商品名称
         * @param itemDec 商品描述
         * @param ext 游戏方透传参数，支付回调接口原样返回（例如:游戏方订单ID）
         */
        ModelPlatform.prototype.buy = function (price, buyCount, itemId, itemName, itemDec) {
            if (!platform.sdk && window.config.debug) {
                logger.log("充值的价格==", price);
                logger.log("充值的个数==", buyCount);
                logger.log("充值的id==", itemId);
                logger.log("充值的名称==", itemName);
                logger.log("充值的描述==", itemDec);
                logger.log("角色id==", GameModels.login.authData.identityId);
                logger.log("服务器id==", GameModels.login.serverList.selected.sid);
                logger.log("IP地址==", GameModels.login.serverList.selected.ip);
                logger.log("端口==", GameModels.login.serverList.selected.http_port);
                var str = "http://" + GameModels.login.serverList.selected.ip + ":" + GameModels.login.serverList.selected.http_port + "/game/services?action=pay&channelId=0&roleId=" + GameModels.login.authData.identityId + "&orderId=" + parseInt((GameModels.timer.getTimer() / 1000).toFixed(0)) + "&amount=" + price * 100 + "&productId=" + itemId + "&serverId=" + GameModels.login.serverList.selected.sid;
                window.open(str);
            }
            if (!platform.sdk)
                return;
            platform.sdk.openCharge(GameModels.login.serverList.selected.sid.toString(), GameModels.login.serverList.selected.name, GameModels.user.player.uid, GameModels.user.player.name, GameModels.user.player.level.toString(), GameModels.user.player.vip.toString(), price, GameModels.user.player.diamonds, buyCount, itemId, itemName, itemDec, 1, parseInt((GameModels.timer.getTimer() / 1000).toFixed(0))); //ext;
        };
        /**上报选服 */
        ModelPlatform.prototype.uploadSelectServer = function () {
            if (!platform.sdk)
                return;
            var dataType = platform.sdk.getDataType(platform.DATA_SELECT_SERVER);
            this.uploadReport(dataType);
        };
        /**上报创角 */
        ModelPlatform.prototype.uploadCreateRole = function (uid, name) {
            if (!platform.sdk)
                return;
            var dataType = platform.sdk.getDataType(platform.DATA_CREATE_ROLE);
            this.uploadReport(dataType, uid, name);
        };
        /**上报进入游戏 */
        ModelPlatform.prototype.uploadEnterGame = function () {
            if (!platform.sdk)
                return;
            var dataType = platform.sdk.getDataType(platform.DATA_ENTER_GAME);
            this.uploadReport(dataType);
        };
        /**上报角色升级 */
        ModelPlatform.prototype.uploadLevelUp = function () {
            if (!platform.sdk)
                return;
            var dataType = platform.sdk.getDataType(platform.DATA_LEVEL_UP);
            this.uploadReport(dataType);
        };
        /**上报退出 */
        ModelPlatform.prototype.uploadQuitGame = function () {
            if (!platform.sdk)
                return;
            var dataType = platform.sdk.getDataType(platform.DATA_QUIT_GAME);
            this.uploadReport(dataType);
        };
        /**上报付费 */
        ModelPlatform.prototype.uploadPay = function () {
            if (!platform.sdk)
                return;
            var dataType = platform.sdk.getDataType(platform.DATA_PAY);
            this.uploadReport(dataType);
        };
        /**上报聊天 */
        ModelPlatform.prototype.uploadChat = function (content, chattype) {
            if (!platform.sdk)
                return;
            var dataType = platform.sdk.getDataType(platform.DATA_CHAT);
            this.uploadReport(dataType, GameModels.user.player.uid, GameModels.user.player.name, content, chattype);
        };
        /**上报进入创角界面 */
        ModelPlatform.prototype.uploadCreateRoleEnter = function () {
            if (!platform.sdk)
                return;
            var dataType = platform.sdk.getDataType(platform.DATA_CREATE_ROLE_ENTER);
            this.uploadReport(dataType);
        };
        /**上报点击创角按钮 */
        ModelPlatform.prototype.uploadCreateRoleClick = function () {
            if (!platform.sdk)
                return;
            var dataType = platform.sdk.getDataType(platform.DATA_CREATE_ROLE_CLICK);
            this.uploadReport(dataType);
        };
        /**微信分享 */
        ModelPlatform.prototype.shareAppMessage = function (shareType) {
            if (!platform.sdk)
                return;
            platform.sdk.shareAppMessage(platform.sdk.userId.toString(), GameModels.login.serverList.selected.sid, shareType);
        };
        ModelPlatform.prototype.uploadReport = function (dataType, uid, name, content, chattype) {
            if (!dataType || !platform.sdk)
                return;
            var hasPlayer = !!GameModels.user && !!GameModels.user.player;
            platform.sdk.submitExtraData(dataType, platform.sdk.appId, parseInt(GameModels.login.serverList.selected.sid), GameModels.login.serverList.selected.name, uid ? uid : (hasPlayer ? GameModels.user.player.uid : ""), name ? name : (hasPlayer ? GameModels.user.player.name : ""), hasPlayer ? GameModels.user.player.level : 0, hasPlayer ? GameModels.user.player.diamonds : 0, parseInt((GameModels.timer.getTimer() / 1000).toFixed(0)), content, chattype, hasPlayer ? GameModels.user.player.job : 0, hasPlayer ? GameModels.user.player.vip : 0, hasPlayer ? GameModels.user.player.zhuanShenLevel : 0);
        };
        //实名认证
        ModelPlatform.prototype.verifyIdentity = function (caller, method) {
            if (!platform.sdk)
                return;
            platform.sdk.verifyIdentity(caller, method);
        };
        Object.defineProperty(ModelPlatform.prototype, "isPay", {
            get: function () {
                if (platform.sdk && platform.sdk.type == "wx") {
                    return platform.sdk.isPay;
                }
                var openModel = !!game.state.getItem(GameModels.user.player.uid, TypeSetting.OPEN_RECHAGE);
                if (openModel) {
                    return true;
                }
                return false;
            },
            enumerable: true,
            configurable: true
        });
        return ModelPlatform;
    }(mo.ModelBase));
    mo.ModelPlatform = ModelPlatform;
    __reflect(ModelPlatform.prototype, "mo.ModelPlatform");
})(mo || (mo = {}));
