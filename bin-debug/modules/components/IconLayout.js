var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var components;
(function (components) {
    var IconLayout = (function () {
        function IconLayout(group, verticalOrhorizontal) {
            this._group = group;
            this._vertical = verticalOrhorizontal;
            this._items = [];
            this._postions = [];
            this._shows = [];
            this._effects = [];
            var index = 0;
            while (index < this._group.numChildren) {
                var data = { ui: null, pos: null };
                var comp = this._group.getChildAt(index);
                data.ui = comp;
                data.pos = index;
                this._items.push(data);
                this._shows.push(data);
                this._postions.push({ x: comp.x, y: comp.y });
                index++;
            }
        }
        IconLayout.prototype.add = function (comp) {
            var index = 0;
            var itemComponent = [];
            for (var i = 0; i < this._items.length; i++) {
                itemComponent.push(this._items[i].ui);
                if (comp == this._items[i].ui) {
                    index = this._items[i].pos;
                }
            }
            var showsComponent = [];
            for (var i = 0; i < this._shows.length; i++) {
                showsComponent.push(this._shows[i].ui);
            }
            if (itemComponent.indexOf(comp) < 0)
                return;
            if (showsComponent.indexOf(comp) >= 0)
                return;
            this._shows.push({ ui: comp, pos: index });
            this._group.addChild(comp);
            this._shows.sort(function (a, b) {
                return a.pos - b.pos;
            });
            egret.callLater(this.update, this);
        };
        IconLayout.prototype.remove = function (comp) {
            var index = 0;
            var itemComponent = [];
            for (var i = 0; i < this._items.length; i++) {
                itemComponent.push(this._items[i].ui);
            }
            var showsComponent = [];
            for (var i = 0; i < this._shows.length; i++) {
                showsComponent.push(this._shows[i].ui);
                if (comp == this._shows[i].ui) {
                    index = i;
                }
            }
            if (itemComponent.indexOf(comp) < 0)
                return;
            if (showsComponent.indexOf(comp) < 0)
                return;
            this._shows.splice(index, 1);
            if (comp.parent) {
                comp.parent.removeChild(comp);
            }
            this._shows.sort(function (a, b) {
                return a.pos - b.pos;
            });
            egret.callLater(this.update, this);
        };
        IconLayout.prototype.update = function () {
            for (var i = 0; i < this._shows.length; i++) {
                var comp = this._shows[i].ui;
                comp.x = this._postions[i].x;
                comp.y = this._postions[i].y;
                // if (this._effects[comp.hashCode]) {
                //     var effect: s.AnimationSprite = this._effects[comp.hashCode];
                //     this._group.addChild(effect);
                //     effect.x = comp.x;
                //     effect.y = comp.y;
                //     effect.play();
                // }
            }
        };
        IconLayout.prototype.getShowItemPos = function (comp) {
            for (var i = 0; i < this._shows.length; i++) {
                if (this._shows[i].ui == comp) {
                    return i;
                }
            }
            return 0;
        };
        return IconLayout;
    }());
    components.IconLayout = IconLayout;
    __reflect(IconLayout.prototype, "components.IconLayout");
})(components || (components = {}));
