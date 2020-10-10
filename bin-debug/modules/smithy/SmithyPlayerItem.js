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
    var SmithyPlayerItem = (function (_super) {
        __extends(SmithyPlayerItem, _super);
        function SmithyPlayerItem() {
            return _super.call(this) || this;
        }
        SmithyPlayerItem.prototype.dataChange = function () {
            if (this.dataSource) {
                this.imgLock.visible = true;
                this.labLv.visible = false;
                this.imgOut.visible = false;
                this.labPlayerName.visible = false;
                this.head.visible = false;
                if (this.dataSource instanceof vo.SmithyVO) {
                    var data = this.dataSource;
                    this.imgLock.visible = false;
                    this.head.visible = true;
                    this.head.source = ResPath.getPlayerIconSmall(data.headIcon);
                    this.labLv.visible = true;
                    this.labPlayerName.visible = true;
                    this.labLv.text = "Lv." + data.level;
                    this.labPlayerName.text = data.playerName;
                    if (GameModels.user.player.uid != data.playerId) {
                        this.imgOut.visible = true;
                    }
                }
            }
        };
        return SmithyPlayerItem;
    }(ui.SmithyPlayerItemSkin));
    item.SmithyPlayerItem = SmithyPlayerItem;
    __reflect(SmithyPlayerItem.prototype, "item.SmithyPlayerItem");
})(item || (item = {}));
