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
var vo;
(function (vo_1) {
    var VOBase = (function (_super) {
        __extends(VOBase, _super);
        function VOBase() {
            var _this = _super.call(this) || this;
            _this.autoRecover = true;
            _this.toPoolTime = 0;
            return _this;
        }
        return VOBase;
    }(egret.EventDispatcher));
    vo_1.VOBase = VOBase;
    __reflect(VOBase.prototype, "vo.VOBase", ["utils.IPool"]);
    /**从缓存吃取出 当需要一个新的VO时，请调用此方法*/
    function fromPool(VOClass) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return (_a = utils.ObjectPool).from.apply(_a, [VOClass, true].concat(args));
        var _a;
    }
    vo_1.fromPool = fromPool;
    /**存入缓存池 */
    function toPool(vo) {
        if (vo.autoRecover) {
            utils.ObjectPool.to(vo);
        }
    }
    vo_1.toPool = toPool;
    /**存入缓存池 */
    function toPoolList(list) {
        if (list && list.length) {
            for (var _i = 0, list_1 = list; _i < list_1.length; _i++) {
                var itemVO = list_1[_i];
                utils.ObjectPool.to(itemVO);
            }
        }
    }
    vo_1.toPoolList = toPoolList;
    var buffPool = {};
    function fromBuffPool(caseter, body, buffTemplate) {
        if (!buffTemplate)
            return null;
        var type = buffTemplate.type;
        var buffVO;
        if (buffPool[type] && buffPool[type].length) {
            buffVO = buffPool[type].pop();
        }
        else {
            buffVO = new vo.BuffVO();
        }
        buffVO.initialize(caseter, body, buffTemplate);
        return buffVO;
    }
    vo_1.fromBuffPool = fromBuffPool;
    function toBuffPool(buff) {
        if (!buffPool[buff.type])
            buffPool[buff.type] = [];
        buffPool[buff.type].push(buff);
        buff.reset();
    }
    vo_1.toBuffPool = toBuffPool;
    function parseItems(itemInfos) {
        var items = [];
        for (var _i = 0, itemInfos_1 = itemInfos; _i < itemInfos_1.length; _i++) {
            var str = itemInfos_1[_i];
            var strs = str.split('_');
            var id = parseInt(strs[0]);
            var count = parseInt(strs[1]);
            var template = Templates.getItemTemplateById(id);
            var itemVO;
            if (template instanceof templates.equip) {
                itemVO = vo.fromPool(vo.EquipVO, template);
            }
            else {
                itemVO = vo.fromPool(vo.ItemVO, template);
                itemVO.count = count;
            }
            items.push(itemVO);
        }
        items.sort(function (a, b) {
            if (a.type == TypeItem.PET_TYPE)
                return -1;
            return a.quality > b.quality ? -1 : 1;
        });
        return items;
    }
    vo_1.parseItems = parseItems;
    function parseProtoItems(items, type) {
        if (type === void 0) { type = 0; }
        var list = [];
        if (items) {
            for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
                var proto = items_1[_i];
                var template = Templates.getItemTemplateById(proto.Id);
                if (!template) {
                    logger.error("配置表找不到该Id:" + proto.Id);
                    continue;
                }
                if (template.mainType == TypeItem.EQUIP) {
                    list.push(vo.fromPool(vo.EquipVO, proto));
                    continue;
                }
                list.push(vo.fromPool(vo.ItemVO, proto));
            }
        }
        return list;
    }
    vo_1.parseProtoItems = parseProtoItems;
})(vo || (vo = {}));
