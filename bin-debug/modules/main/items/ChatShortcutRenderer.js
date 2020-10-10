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
var renderer;
(function (renderer) {
    var ChatShortcutRenderer = (function (_super) {
        __extends(ChatShortcutRenderer, _super);
        function ChatShortcutRenderer() {
            return _super.call(this) || this;
        }
        ChatShortcutRenderer.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            if (this.data) {
                this.labContent.text = this.data;
            }
        };
        ChatShortcutRenderer.prototype.onClick = function (evt) {
            GameModels.chat.sendChatMessage(this.labContent.text);
        };
        return ChatShortcutRenderer;
    }(ui.ChatShortcutRendererSkin));
    renderer.ChatShortcutRenderer = ChatShortcutRenderer;
    __reflect(ChatShortcutRenderer.prototype, "renderer.ChatShortcutRenderer");
})(renderer || (renderer = {}));
