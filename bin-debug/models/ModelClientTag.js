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
    var ModelClientTag = (function (_super) {
        __extends(ModelClientTag, _super);
        function ModelClientTag() {
            return _super.call(this) || this;
        }
        ModelClientTag.prototype.initialize = function () {
            _super.prototype.initialize.call(this);
            this._tagCountSByType1 = [];
            this._tagCountSByType2 = [];
            this.clientGetTagCount(1, TypeClientTag.CLIENT_TYPE1_ARR.concat());
        };
        ModelClientTag.prototype.tagCountSByType = function (type, tag) {
            if (type == 1) {
                for (var i = 0; i < this._tagCountSByType1.length; i++) {
                    if (this._tagCountSByType1[i].tag == tag) {
                        return this._tagCountSByType1[i].tagCount;
                    }
                }
            }
            else {
                for (var i = 0; i < this._tagCountSByType2.length; i++) {
                    if (this._tagCountSByType2[i].tag == tag) {
                        return this._tagCountSByType2[i].tagCount;
                    }
                }
            }
            return 0;
        };
        /**获取标记 */
        ModelClientTag.prototype.clientGetTagCount = function (type, tags, successhandler) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Client_GetTagCount);
            msg.Type = type;
            msg.Tags = tags;
            this.request(n.MessageMap.C2G_CLIENT_GETTAGCOUNT, msg, utils.Handler.create(this, function (data) {
                if (data.Type == 1) {
                    _this._tagCountSByType1 = [];
                    for (var i = 0; i < data.Tags.length; i++) {
                        var tem = { tag: data.Tags[i], tagCount: data.TagsCount[i] };
                        _this._tagCountSByType1.push(tem);
                    }
                }
                else {
                    _this._tagCountSByType2 = [];
                    for (var i = 0; i < data.Tags.length; i++) {
                        var tem = { tag: data.Tags[i], tagCount: data.TagsCount[i] };
                        _this._tagCountSByType2.push(tem);
                    }
                }
            }));
        };
        /**增加标记 */
        ModelClientTag.prototype.clientAddTag = function (type, tag) {
            var _this = this;
            var msg = n.MessagePool.from(n.C2G_Client_AddTag);
            msg.Type = type;
            msg.Tag = tag;
            this.request(n.MessageMap.C2G_CLIENT_ADDTAG, msg, utils.Handler.create(this, function (data) {
                _this.clientGetTagCount(1, TypeClientTag.CLIENT_TYPE1_ARR.concat());
            }));
        };
        return ModelClientTag;
    }(mo.ModelBase));
    mo.ModelClientTag = ModelClientTag;
    __reflect(ModelClientTag.prototype, "mo.ModelClientTag");
})(mo || (mo = {}));
