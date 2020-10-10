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
var item;
(function (item) {
    var LegionShareFriendItem = (function (_super) {
        __extends(LegionShareFriendItem, _super);
        function LegionShareFriendItem() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LegionShareFriendItem.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.reset();
        };
        LegionShareFriendItem.prototype.clearItem = function () {
            this.labNo.visible = false;
            this.imgQuality.visible = false;
            this.imgHead.visible = false;
            this.labLevel.text = "";
            this.labName.text = "";
            this.imgVip.visible = false;
        };
        LegionShareFriendItem.prototype.setPlayerInfo = function (player) {
            this.clearItem();
            if (player) {
                this.imgQuality.visible = true;
                this.imgHead.visible = true;
                this.imgVip.visible = true;
                this.imgHead.source = ResPath.getPlayerIconSmall(player.HeadIcon);
                var elements = [];
                elements.push({ text: "Lv.", style: { textColor: 0xe8b139 } });
                elements.push({ text: player.Level.toString(), style: { textColor: 0xedd49e } });
                this.labLevel.textFlow = elements;
                this.labName.text = player.PlayerName;
                this.imgVip.source = player.VipLevel > 0 ? "xgVipBtn_json.img_VIP" + player.VipLevel : "";
            }
            else {
                this.labNo.visible = true;
            }
        };
        return LegionShareFriendItem;
    }(ui.LegionShareFriendItemSkin));
    item.LegionShareFriendItem = LegionShareFriendItem;
    __reflect(LegionShareFriendItem.prototype, "item.LegionShareFriendItem");
})(item || (item = {}));
