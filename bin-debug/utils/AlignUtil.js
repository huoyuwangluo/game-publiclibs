var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var utils;
(function (utils) {
    var AlignUtil = (function () {
        function AlignUtil() {
        }
        /**
         * 获取基于区域的对齐后的位置
         * @param align 对齐方式
         * @param areaWidth 当前布局空间的宽度
         * @param areaHeight 当前布局空间的高度
         * @param displayObject 需要对齐的显示对象
         * @param offRatioX X轴的缩放比例偏差
         * @param offRatioY Y轴的缩放比例偏差
         * @param result 作为结果return的点对象
         * @return
         */
        AlignUtil.getAreaAglinPoint = function (align, areaWidth, areaHeight, displayObject, offRatioX, offRatioY, result) {
            if (offRatioX === void 0) { offRatioX = 0; }
            if (offRatioY === void 0) { offRatioY = 0; }
            if (result === void 0) { result = null; }
            return this.getAreaAglinPointByWH(align, areaWidth, areaHeight, displayObject.width * displayObject.scaleX, displayObject.height * displayObject.scaleY, offRatioX, offRatioY, result);
        };
        AlignUtil.getAreaAglinPointByWH = function (align, areaWidth, areaHeight, targetWidth, targetHeight, offRatioX, offRatioY, result) {
            if (offRatioX === void 0) { offRatioX = 0; }
            if (offRatioY === void 0) { offRatioY = 0; }
            if (result === void 0) { result = null; }
            var point = result ? result : new egret.Point();
            var offX = offRatioX;
            var offY = offRatioY;
            switch (align) {
                case game.TypeAlign.TOP:
                    point.setTo(areaWidth / 2 - targetWidth / 2 + offX, offY);
                    break;
                case game.TypeAlign.TOP_LEFT:
                    point.setTo(offX, offY);
                    break;
                case game.TypeAlign.TOP_RIGHT:
                    point.setTo(areaWidth - targetWidth + offX, offY);
                    break;
                case game.TypeAlign.BOTTOM:
                    point.setTo(areaWidth / 2 - targetWidth / 2 + offX, areaHeight - targetHeight + offY);
                    break;
                case game.TypeAlign.BOTTOM_LEFT:
                    point.setTo(offX, areaHeight - targetHeight + offY);
                    break;
                case game.TypeAlign.BOTTOM_RIGHT:
                    point.setTo(areaWidth - targetWidth + offX, areaHeight - targetHeight + offY);
                    break;
                case game.TypeAlign.LEFT:
                    point.setTo(offX, areaHeight / 2 - targetHeight / 2 + offY);
                    break;
                case game.TypeAlign.RIGHT:
                    point.setTo(areaWidth - targetWidth + offX, areaHeight / 2 - targetHeight / 2 + offY);
                    break;
                case game.TypeAlign.CENTER:
                    point.setTo(areaWidth / 2 - targetWidth / 2 + offX, areaHeight / 2 - targetHeight / 2 + offY);
                    break;
                case game.TypeAlign.TOP_AUTO:
                    mg.stageManager.whRatio_current >= mg.stageManager.whRatio_design ? point.setTo(areaWidth / 2 - targetWidth / 2 + offX, offY) : point.setTo(areaWidth / 2 - targetWidth / 2 + offX, areaHeight / 2 - targetHeight / 2 - 40);
                    break;
                case game.TypeAlign.BOTTOM_AUTO:
                    mg.stageManager.whRatio_current >= mg.stageManager.whRatio_design ? point.setTo(areaWidth / 2 - targetWidth / 2 + offX, areaHeight - targetHeight + offY) : point.setTo(areaWidth / 2 - targetWidth / 2 + offX, areaHeight / 2 - targetHeight / 2 - 40);
                    break;
            }
            return point;
        };
        /**
         * 获取基于对象的对齐位置  以对象为中心
         * @param align
         * @param offWidth
         * @param offHeight
         * @param targetWidth
         * @param targetHeight
         * @param offRatioX
         * @param offRatioY
         * @param result
         * @return
         */
        AlignUtil.getTargetAglinPoint = function (align, targetPosX, targetPosY, targetWidth, targetHeight, offWidth, offHeight, result) {
            if (result === void 0) { result = null; }
            var point = result ? result : new egret.Point();
            var halfWidth = targetWidth / 2;
            var halfHeight = targetHeight / 2;
            var centerX = targetPosX + halfWidth;
            var centerY = targetPosY + halfHeight;
            switch (align) {
                case game.TypeAlign.TOP:
                    point.setTo(centerX, centerY - halfHeight - offHeight);
                    break;
                case game.TypeAlign.TOP_LEFT:
                    point.setTo(centerX - halfWidth - offWidth, centerY - halfHeight - offHeight);
                    break;
                case game.TypeAlign.TOP_RIGHT:
                    point.setTo(centerX + halfWidth + offWidth, centerY - halfHeight - offHeight);
                    break;
                case game.TypeAlign.BOTTOM:
                    point.setTo(centerX, centerY + halfHeight + offHeight);
                    break;
                case game.TypeAlign.BOTTOM_LEFT:
                    point.setTo(centerX - halfWidth - offWidth, centerY + halfHeight + offHeight);
                    break;
                case game.TypeAlign.BOTTOM_RIGHT:
                    point.setTo(centerX + halfWidth + offWidth, centerY + halfHeight + offHeight);
                    break;
                case game.TypeAlign.LEFT:
                    point.setTo(centerX - halfWidth - offWidth, centerY + offHeight / 2);
                    break;
                case game.TypeAlign.RIGHT:
                    point.setTo(centerX + halfWidth + offWidth, centerY + offHeight / 2);
                    break;
                case game.TypeAlign.CENTER:
                    point.setTo(centerX - offWidth / 2, centerY - offHeight / 2);
                    break;
            }
            return point;
        };
        return AlignUtil;
    }());
    utils.AlignUtil = AlignUtil;
    __reflect(AlignUtil.prototype, "utils.AlignUtil");
})(utils || (utils = {}));
