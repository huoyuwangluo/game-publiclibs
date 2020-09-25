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
/**
 * A* path-finder. Based upon https://github.com/bgrins/javascript-astar
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 * @param {number} opt.weight Weight to apply to the heuristic to allow for
 *     suboptimal paths, in order to speed up the search.
 */
var PF;
(function (PF) {
    var AStarFinder = (function () {
        function AStarFinder(opt) {
            opt = opt || {};
            this.allowDiagonal = opt.allowDiagonal;
            this.dontCrossCorners = opt.dontCrossCorners;
            this.heuristic = opt.heuristic || PF.Heuristic.manhattan;
            this.weight = opt.weight || 1;
            this.diagonalMovement = opt.diagonalMovement;
            if (!this.diagonalMovement) {
                if (!this.allowDiagonal) {
                    this.diagonalMovement = PF.DiagonalMovement.Never;
                }
                else {
                    if (this.dontCrossCorners) {
                        this.diagonalMovement = PF.DiagonalMovement.OnlyWhenNoObstacles;
                    }
                    else {
                        this.diagonalMovement = PF.DiagonalMovement.IfAtMostOneObstacle;
                    }
                }
            }
        }
        /**
         * Find and return the the path.
         * @return {Array<Array<number>>} The path, including both start and
         *     end positions.
         */
        AStarFinder.prototype.findPath = function (startX, startY, endX, endY, grid) {
            var openList = new PF.Heap(function (nodeA, nodeB) {
                return nodeA.f - nodeB.f;
            }), startNode = grid.getNodeAt(startX, startY), endNode = grid.getNodeAt(endX, endY), heuristic = this.heuristic, diagonalMovement = this.diagonalMovement, weight = this.weight, abs = Math.abs, SQRT2 = Math.SQRT2, node, neighbors, neighbor, i, l, x, y, ng;
            // set the `g` and `f` value of the start node to be 0
            startNode.g = 0;
            startNode.f = 0;
            // push the start node into the open list
            openList.push(startNode);
            startNode.opened = true;
            // while the open list is not empty
            while (!openList.empty()) {
                // pop the position of node which has the minimum `f` value.
                node = openList.pop();
                node.closed = true;
                // if reached the end position, construct the path and return it
                if (node === endNode) {
                    return PF.backtraceNode(endNode);
                }
                // get neigbours of the current node
                neighbors = grid.getNeighbors(node, diagonalMovement);
                for (i = 0, l = neighbors.length; i < l; ++i) {
                    neighbor = neighbors[i];
                    if (neighbor.closed) {
                        continue;
                    }
                    x = neighbor.x;
                    y = neighbor.y;
                    // get the distance between current node and the neighbor
                    // and calculate the next g score
                    ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);
                    // check if the neighbor has not been inspected yet, or
                    // can be reached with smaller cost from the current node
                    if (!neighbor.opened || ng < neighbor.g) {
                        neighbor.g = ng;
                        neighbor.h = neighbor.h || weight * heuristic(abs(x - endX), abs(y - endY));
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.parent = node;
                        if (!neighbor.opened) {
                            openList.push(neighbor);
                            neighbor.opened = true;
                        }
                        else {
                            // the neighbor can be reached with smaller cost.
                            // Since its f value has been updated, we have to
                            // update its position in the open list
                            openList.updateItem(neighbor);
                        }
                    }
                } // end for each neighbor
            } // end while not open list empty
            // fail to find the path
            return [];
        };
        ;
        return AStarFinder;
    }());
    PF.AStarFinder = AStarFinder;
    __reflect(AStarFinder.prototype, "PF.AStarFinder");
})(PF || (PF = {}));
/**
 * A* path-finder.
 * based upon https://github.com/bgrins/javascript-astar
 * @constructor
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 * @param {number} opt.weight Weight to apply to the heuristic to allow for
 *     suboptimal paths, in order to speed up the search.
 */
var PF;
(function (PF) {
    var BiAStarFinder = (function () {
        function BiAStarFinder(opt) {
            opt = opt || {};
            this.allowDiagonal = opt.allowDiagonal;
            this.dontCrossCorners = opt.dontCrossCorners;
            this.diagonalMovement = opt.diagonalMovement;
            this.heuristic = opt.heuristic || PF.Heuristic.manhattan;
            this.weight = opt.weight || 1;
            if (!this.diagonalMovement) {
                if (!this.allowDiagonal) {
                    this.diagonalMovement = PF.DiagonalMovement.Never;
                }
                else {
                    if (this.dontCrossCorners) {
                        this.diagonalMovement = PF.DiagonalMovement.OnlyWhenNoObstacles;
                    }
                    else {
                        this.diagonalMovement = PF.DiagonalMovement.IfAtMostOneObstacle;
                    }
                }
            }
            //When diagonal movement is allowed the manhattan heuristic is not admissible
            //It should be octile instead
            if (this.diagonalMovement === PF.DiagonalMovement.Never) {
                this.heuristic = opt.heuristic || PF.Heuristic.manhattan;
            }
            else {
                this.heuristic = opt.heuristic || PF.Heuristic.octile;
            }
        }
        /**
         * Find and return the the path.
         * @return {Array<Array<number>>} The path, including both start and
         *     end positions.
         */
        BiAStarFinder.prototype.findPath = function (startX, startY, endX, endY, grid) {
            var cmp = function (nodeA, nodeB) {
                return nodeA.f - nodeB.f;
            }, startOpenList = new PF.Heap(cmp), endOpenList = new PF.Heap(cmp), startNode = grid.getNodeAt(startX, startY), endNode = grid.getNodeAt(endX, endY), heuristic = this.heuristic, diagonalMovement = this.diagonalMovement, weight = this.weight, abs = Math.abs, SQRT2 = Math.SQRT2, node, neighbors, neighbor, i, l, x, y, ng, BY_START = 1, BY_END = 2;
            // set the `g` and `f` value of the start node to be 0
            // and push it into the start open list
            startNode.g = 0;
            startNode.f = 0;
            startOpenList.push(startNode);
            startNode.opened = BY_START;
            // set the `g` and `f` value of the end node to be 0
            // and push it into the open open list
            endNode.g = 0;
            endNode.f = 0;
            endOpenList.push(endNode);
            endNode.opened = BY_END;
            // while both the open lists are not empty
            while (!startOpenList.empty() && !endOpenList.empty()) {
                // pop the position of start node which has the minimum `f` value.
                node = startOpenList.pop();
                node.closed = true;
                // get neigbours of the current node
                neighbors = grid.getNeighbors(node, diagonalMovement);
                for (i = 0, l = neighbors.length; i < l; ++i) {
                    neighbor = neighbors[i];
                    if (neighbor.closed) {
                        continue;
                    }
                    if (neighbor.opened === BY_END) {
                        return PF.biBacktrace(node, neighbor);
                    }
                    x = neighbor.x;
                    y = neighbor.y;
                    // get the distance between current node and the neighbor
                    // and calculate the next g score
                    ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);
                    // check if the neighbor has not been inspected yet, or
                    // can be reached with smaller cost from the current node
                    if (!neighbor.opened || ng < neighbor.g) {
                        neighbor.g = ng;
                        neighbor.h = neighbor.h ||
                            weight * heuristic(abs(x - endX), abs(y - endY));
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.parent = node;
                        if (!neighbor.opened) {
                            startOpenList.push(neighbor);
                            neighbor.opened = BY_START;
                        }
                        else {
                            // the neighbor can be reached with smaller cost.
                            // Since its f value has been updated, we have to
                            // update its position in the open list
                            startOpenList.updateItem(neighbor);
                        }
                    }
                } // end for each neighbor      
                // pop the position of end node which has the minimum `f` value.
                node = endOpenList.pop();
                node.closed = true;
                // get neigbours of the current node
                neighbors = grid.getNeighbors(node, diagonalMovement);
                for (i = 0, l = neighbors.length; i < l; ++i) {
                    neighbor = neighbors[i];
                    if (neighbor.closed) {
                        continue;
                    }
                    if (neighbor.opened === BY_START) {
                        return PF.biBacktrace(neighbor, node);
                    }
                    x = neighbor.x;
                    y = neighbor.y;
                    // get the distance between current node and the neighbor
                    // and calculate the next g score
                    ng = node.g + ((x - node.x === 0 || y - node.y === 0) ? 1 : SQRT2);
                    // check if the neighbor has not been inspected yet, or
                    // can be reached with smaller cost from the current node
                    if (!neighbor.opened || ng < neighbor.g) {
                        neighbor.g = ng;
                        neighbor.h = neighbor.h ||
                            weight * heuristic(abs(x - startX), abs(y - startY));
                        neighbor.f = neighbor.g + neighbor.h;
                        neighbor.parent = node;
                        if (!neighbor.opened) {
                            endOpenList.push(neighbor);
                            neighbor.opened = BY_END;
                        }
                        else {
                            // the neighbor can be reached with smaller cost.
                            // Since its f value has been updated, we have to
                            // update its position in the open list
                            endOpenList.updateItem(neighbor);
                        }
                    }
                } // end for each neighbor
            } // end while not open list empty      
            // fail to find the path
            return [];
        };
        ;
        return BiAStarFinder;
    }());
    PF.BiAStarFinder = BiAStarFinder;
    __reflect(BiAStarFinder.prototype, "PF.BiAStarFinder");
})(PF || (PF = {}));
/**
 * Best-First-Search path-finder.
 * @constructor
 * @extends AStarFinder
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 */
var PF;
(function (PF) {
    var BestFirstFinder = (function (_super) {
        __extends(BestFirstFinder, _super);
        function BestFirstFinder(opt) {
            var _this = _super.call(this, opt) || this;
            var orig = _this.heuristic;
            _this.heuristic = function (dx, dy) {
                return orig(dx, dy) * 1000000;
            };
            return _this;
        }
        return BestFirstFinder;
    }(PF.AStarFinder));
    PF.BestFirstFinder = BestFirstFinder;
    __reflect(BestFirstFinder.prototype, "PF.BestFirstFinder");
})(PF || (PF = {}));
var PF;
(function (PF) {
    var Heuristic = (function () {
        function Heuristic() {
        }
        /**
         * Manhattan distance.
         * @param {number} dx - Difference in x.
         * @param {number} dy - Difference in y.
         * @return {number} dx + dy
         */
        Heuristic.manhattan = function (dx, dy) {
            return dx + dy;
        };
        /**
         * Euclidean distance.
         * @param {number} dx - Difference in x.
         * @param {number} dy - Difference in y.
         * @return {number} sqrt(dx * dx + dy * dy)
         */
        Heuristic.euclidean = function (dx, dy) {
            return Math.sqrt(dx * dx + dy * dy);
        };
        /**
         * Octile distance.
         * @param {number} dx - Difference in x.
         * @param {number} dy - Difference in y.
         * @return {number} sqrt(dx * dx + dy * dy) for grids
         */
        Heuristic.octile = function (dx, dy) {
            var F = Math.SQRT2 - 1;
            return (dx < dy) ? F * dx + dy : F * dy + dx;
        };
        /**
         * Chebyshev distance.
         * @param {number} dx - Difference in x.
         * @param {number} dy - Difference in y.
         * @return {number} max(dx, dy)
         */
        Heuristic.chebyshev = function (dx, dy) {
            return Math.max(dx, dy);
        };
        return Heuristic;
    }());
    PF.Heuristic = Heuristic;
    __reflect(Heuristic.prototype, "PF.Heuristic");
})(PF || (PF = {}));
var PF;
(function (PF) {
    var floor = Math.floor, min = Math.min;
    function defaultCmp(x, y) {
        if (x < y) {
            return -1;
        }
        if (x > y) {
            return 1;
        }
        return 0;
    }
    ;
    /*
    Insert item x in list a, and keep it sorted assuming a is sorted.

    If x is already in a, insert it to the right of the rightmost x.

    Optional args lo (default 0) and hi (default a.length) bound the slice
    of a to be searched.
    */
    function insort(a, x, lo, hi, cmp) {
        var mid;
        if (lo == null) {
            lo = 0;
        }
        if (cmp == null) {
            cmp = defaultCmp;
        }
        if (lo < 0) {
            throw new Error('lo must be non-negative');
        }
        if (hi == null) {
            hi = a.length;
        }
        while (lo < hi) {
            mid = floor((lo + hi) / 2);
            if (cmp(x, a[mid]) < 0) {
                hi = mid;
            }
            else {
                lo = mid + 1;
            }
        }
        return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);
    }
    ;
    /*
    Push item onto heap, maintaining the heap invariant.
     */
    function heappush(array, item, cmp) {
        if (cmp == null) {
            cmp = defaultCmp;
        }
        array.push(item);
        return _siftdown(array, 0, array.length - 1, cmp);
    }
    ;
    /*
    Pop the smallest item off the heap, maintaining the heap invariant.
     */
    function heappop(array, cmp) {
        var lastelt, returnitem;
        if (cmp == null) {
            cmp = defaultCmp;
        }
        lastelt = array.pop();
        if (array.length) {
            returnitem = array[0];
            array[0] = lastelt;
            _siftup(array, 0, cmp);
        }
        else {
            returnitem = lastelt;
        }
        return returnitem;
    }
    ;
    /*
    Pop and return the current smallest value, and add the new item.
    
    This is more efficient than heappop() followed by heappush(), and can be
    more appropriate when using a fixed size heap. Note that the value
    returned may be larger than item! That constrains reasonable use of
    this routine unless written as part of a conditional replacement:
        if item > array[0]
          item = heapreplace(array, item)
     */
    function heapreplace(array, item, cmp) {
        var returnitem;
        if (cmp == null) {
            cmp = defaultCmp;
        }
        returnitem = array[0];
        array[0] = item;
        _siftup(array, 0, cmp);
        return returnitem;
    }
    ;
    /*
    Fast version of a heappush followed by a heappop.
     */
    function heappushpop(array, item, cmp) {
        var _ref;
        if (cmp == null) {
            cmp = defaultCmp;
        }
        if (array.length && cmp(array[0], item) < 0) {
            _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
            _siftup(array, 0, cmp);
        }
        return item;
    }
    ;
    /*
    Transform list into a heap, in-place, in O(array.length) time.
     */
    function heapify(array, cmp) {
        var i, _i, _j, _len, _ref, _ref1, _results, _results1;
        if (cmp == null) {
            cmp = defaultCmp;
        }
        _ref1 = (function () {
            _results1 = [];
            for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--) {
                _results1.push(_j);
            }
            return _results1;
        }).apply(this).reverse();
        _results = [];
        for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
            i = _ref1[_i];
            _results.push(_siftup(array, i, cmp));
        }
        return _results;
    }
    ;
    /*
    Update the position of the given item in the heap.
    This function should be called every time the item is being modified.
     */
    function updateItem(array, item, cmp) {
        var pos;
        if (cmp == null) {
            cmp = defaultCmp;
        }
        pos = array.indexOf(item);
        if (pos === -1) {
            return;
        }
        _siftdown(array, 0, pos, cmp);
        return _siftup(array, pos, cmp);
    }
    ;
    /*
    Find the n largest elements in a dataset.
     */
    function nlargest(array, n, cmp) {
        var elem, result, _i, _len, _ref;
        if (cmp == null) {
            cmp = defaultCmp;
        }
        result = array.slice(0, n);
        if (!result.length) {
            return result;
        }
        heapify(result, cmp);
        _ref = array.slice(n);
        for (_i = 0, _len = _ref.length; _i < _len; _i++) {
            elem = _ref[_i];
            heappushpop(result, elem, cmp);
        }
        return result.sort(cmp).reverse();
    }
    ;
    /*
    Find the n smallest elements in a dataset.
     */
    function nsmallest(array, n, cmp) {
        var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
        if (cmp == null) {
            cmp = defaultCmp;
        }
        if (n * 10 <= array.length) {
            result = array.slice(0, n).sort(cmp);
            if (!result.length) {
                return result;
            }
            los = result[result.length - 1];
            _ref = array.slice(n);
            for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                elem = _ref[_i];
                if (cmp(elem, los) < 0) {
                    insort(result, elem, 0, null, cmp);
                    result.pop();
                    los = result[result.length - 1];
                }
            }
            return result;
        }
        heapify(array, cmp);
        _results = [];
        for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
            _results.push(heappop(array, cmp));
        }
        return _results;
    }
    ;
    function _siftdown(array, startpos, pos, cmp) {
        var newitem, parent, parentpos;
        if (cmp == null) {
            cmp = defaultCmp;
        }
        newitem = array[pos];
        while (pos > startpos) {
            parentpos = (pos - 1) >> 1;
            parent = array[parentpos];
            if (cmp(newitem, parent) < 0) {
                array[pos] = parent;
                pos = parentpos;
                continue;
            }
            break;
        }
        return array[pos] = newitem;
    }
    ;
    function _siftup(array, pos, cmp) {
        var childpos, endpos, newitem, rightpos, startpos;
        if (cmp == null) {
            cmp = defaultCmp;
        }
        endpos = array.length;
        startpos = pos;
        newitem = array[pos];
        childpos = 2 * pos + 1;
        while (childpos < endpos) {
            rightpos = childpos + 1;
            if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
                childpos = rightpos;
            }
            array[pos] = array[childpos];
            pos = childpos;
            childpos = 2 * pos + 1;
        }
        array[pos] = newitem;
        return _siftdown(array, startpos, pos, cmp);
    }
    ;
    var Heap = (function () {
        function Heap(cmp) {
            if (cmp === void 0) { cmp = null; }
            this.push = function (x) {
                return heappush(this.nodes, x, this.cmp);
            };
            this.pop = function () {
                return heappop(this.nodes, this.cmp);
            };
            this.peek = function () {
                return this.nodes[0];
            };
            this.contains = function (x) {
                return this.nodes.indexOf(x) !== -1;
            };
            this.replace = function (x) {
                return heapreplace(this.nodes, x, this.cmp);
            };
            this.pushpop = function (x) {
                return heappushpop(this.nodes, x, this.cmp);
            };
            this.heapify = function () {
                return heapify(this.nodes, this.cmp);
            };
            this.updateItem = function (x) {
                return updateItem(this.nodes, x, this.cmp);
            };
            this.clear = function () {
                return this.nodes = [];
            };
            this.empty = function () {
                return this.nodes.length === 0;
            };
            this.size = function () {
                return this.nodes.length;
            };
            this.clone = function () {
                var heap;
                heap = new Heap();
                heap.nodes = this.nodes.slice(0);
                return heap;
            };
            this.toArray = function () {
                return this.nodes.slice(0);
            };
            this.cmp = cmp != null ? cmp : defaultCmp;
            this.nodes = [];
            this.insert = this.push;
            this.top = this.peek;
            this.front = this.peek;
            this.has = this.contains;
            this.copy = this.clone;
        }
        Heap.push = heappush;
        Heap.pop = heappop;
        Heap.replace = heapreplace;
        Heap.pushpop = heappushpop;
        Heap.heapify = heapify;
        Heap.updateItem = updateItem;
        Heap.nlargest = nlargest;
        Heap.nsmallest = nsmallest;
        return Heap;
    }());
    PF.Heap = Heap;
    __reflect(Heap.prototype, "PF.Heap");
})(PF || (PF = {}));
var PF;
(function (PF) {
    PF.DiagonalMovement = {
        Always: 1,
        Never: 2,
        IfAtMostOneObstacle: 3,
        OnlyWhenNoObstacles: 4
    };
})(PF || (PF = {}));
var PF;
(function (PF) {
    /**
     * The Grid class, which serves as the encapsulation of the layout of the nodes.
     * @constructor
     * @param {number|Array<Array<(number|boolean)>>} width_or_matrix Number of columns of the grid, or matrix
     * @param {number} height Number of rows of the grid.
     * @param {Array<Array<(number|boolean)>>} [matrix] - A 0-1 matrix
     *     representing the walkable status of the nodes(0 or false for walkable).
     *     If the matrix is not supplied, all the nodes will be walkable.  */
    var Grid = (function () {
        function Grid() {
            this.nodes = [];
            /**
             * Build and return the nodes.
             * @private
             * @param {number} width
             * @param {number} height
             * @param {Array<Array<number|boolean>>} [matrix] - A 0-1 matrix representing
             *     the walkable status of the nodes.
             * @see Grid
             */
            this._buildNodes = function (width, height, matrix) {
                var that = this;
                var i, j;
                if (!that.nodes) {
                    that.nodes = [];
                }
                that.nodes.length = height;
                for (i = 0; i < height; ++i) {
                    that.nodes[i] = new Array(width);
                    for (j = 0; j < width; ++j) {
                        that.nodes[i][j] = PF.Node.from(j, i);
                    }
                }
                //if (matrix === undefined) {
                if (!matrix) {
                    return that.nodes;
                }
                if (matrix.length !== height || matrix[0].length !== width) {
                    throw new Error('Matrix size does not fit');
                }
                for (i = 0; i < height; ++i) {
                    for (j = 0; j < width; ++j) {
                        if (matrix[i][j]) {
                            // 0, false, null will be walkable
                            // while others will be un-walkable
                            that.nodes[i][j].walkable = false;
                        }
                    }
                }
                return that.nodes;
            };
            this.getNodeAt = function (x, y) {
                return this.nodes[y][x];
            };
            /**
             * Determine whether the node at the given position is walkable.
             * (Also returns false if the position is outside the grid.)
             * @param {number} x - The x coordinate of the node.
             * @param {number} y - The y coordinate of the node.
             * @return {boolean} - The walkability of the node.
             */
            this.isWalkableAt = function (x, y) {
                return this.isInside(x, y) && this.nodes[y][x].walkable;
            };
            /**
             * Determine whether the position is inside the grid.
             * XXX: `grid.isInside(x, y)` is wierd to read.
             * It should be `(x, y) is inside grid`, but I failed to find a better
             * name for this method.
             * @param {number} x
             * @param {number} y
             * @return {boolean}
             */
            this.isInside = function (x, y) {
                return (x >= 0 && x < this.width) && (y >= 0 && y < this.height);
            };
            /**
             * Set whether the node on the given position is walkable.
             * NOTE: throws exception if the coordinate is not inside the grid.
             * @param {number} x - The x coordinate of the node.
             * @param {number} y - The y coordinate of the node.
             * @param {boolean} walkable - Whether the position is walkable.
             */
            this.setWalkableAt = function (x, y, walkable) {
                this.nodes[y][x].walkable = walkable;
            };
            /**
             * Get the neighbors of the given node.
             *
             *     offsets      diagonalOffsets:
             *  +---+---+---+    +---+---+---+
             *  |   | 0 |   |    | 0 |   | 1 |
             *  +---+---+---+    +---+---+---+
             *  | 3 |   | 1 |    |   |   |   |
             *  +---+---+---+    +---+---+---+
             *  |   | 2 |   |    | 3 |   | 2 |
             *  +---+---+---+    +---+---+---+
             *
             *  When allowDiagonal is true, if offsets[i] is valid, then
             *  diagonalOffsets[i] and
             *  diagonalOffsets[(i + 1) % 4] is valid.
             * @param {Node} node
             * @param {DiagonalMovement} diagonalMovement
             */
            this.getNeighbors = function (node, diagonalMovement) {
                var x = node.x, y = node.y, neighbors = [], s0 = false, d0 = false, s1 = false, d1 = false, s2 = false, d2 = false, s3 = false, d3 = false, nodes = this.nodes;
                // ↑
                if (this.isWalkableAt(x, y - 1)) {
                    neighbors.push(nodes[y - 1][x]);
                    s0 = true;
                }
                // →
                if (this.isWalkableAt(x + 1, y)) {
                    neighbors.push(nodes[y][x + 1]);
                    s1 = true;
                }
                // ↓
                if (this.isWalkableAt(x, y + 1)) {
                    neighbors.push(nodes[y + 1][x]);
                    s2 = true;
                }
                // ←
                if (this.isWalkableAt(x - 1, y)) {
                    neighbors.push(nodes[y][x - 1]);
                    s3 = true;
                }
                if (diagonalMovement === PF.DiagonalMovement.Never) {
                    return neighbors;
                }
                if (diagonalMovement === PF.DiagonalMovement.OnlyWhenNoObstacles) {
                    d0 = s3 && s0;
                    d1 = s0 && s1;
                    d2 = s1 && s2;
                    d3 = s2 && s3;
                }
                else if (diagonalMovement === PF.DiagonalMovement.IfAtMostOneObstacle) {
                    d0 = s3 || s0;
                    d1 = s0 || s1;
                    d2 = s1 || s2;
                    d3 = s2 || s3;
                }
                else if (diagonalMovement === PF.DiagonalMovement.Always) {
                    d0 = true;
                    d1 = true;
                    d2 = true;
                    d3 = true;
                }
                else {
                    throw new Error('Incorrect value of diagonalMovement');
                }
                // ↖
                if (d0 && this.isWalkableAt(x - 1, y - 1)) {
                    neighbors.push(nodes[y - 1][x - 1]);
                }
                // ↗
                if (d1 && this.isWalkableAt(x + 1, y - 1)) {
                    neighbors.push(nodes[y - 1][x + 1]);
                }
                // ↘
                if (d2 && this.isWalkableAt(x + 1, y + 1)) {
                    neighbors.push(nodes[y + 1][x + 1]);
                }
                // ↙
                if (d3 && this.isWalkableAt(x - 1, y + 1)) {
                    neighbors.push(nodes[y + 1][x - 1]);
                }
                return neighbors;
            };
            /**
             * Get a clone of this grid.
             * @return {Grid} Cloned grid.
             */
            this.clone = function () {
                var i, j, width = this.width, height = this.height, thisNodes = this.nodes, newGrid = new Grid(), newNodes = new Array(height);
                newGrid.initialize(width, height);
                for (i = 0; i < height; ++i) {
                    newNodes[i] = new Array(width);
                    for (j = 0; j < width; ++j) {
                        newNodes[i][j] = PF.Node.from(j, i, thisNodes[i][j].walkable);
                    }
                }
                newGrid.nodes = newNodes;
                return newGrid;
            };
        }
        Grid.prototype.initialize = function (width_or_matrix, height, matrix) {
            if (matrix === void 0) { matrix = null; }
            var width;
            if (typeof width_or_matrix !== 'object') {
                width = width_or_matrix;
            }
            else {
                height = width_or_matrix.length;
                width = width_or_matrix[0].length;
                matrix = width_or_matrix;
            }
            /**
             * The number of columns of the grid.
             * @type number
             */
            this.width = width;
            /**
             * The number of rows of the grid.
             * @type number
             */
            this.height = height;
            /**
             * A 2D array of nodes.
             */
            this.clearNodes();
            this.nodes = this._buildNodes(width, height, matrix);
        };
        Grid.prototype.reset = function () {
            this.clearNodes();
            this.width = this.height = 0;
        };
        Grid.prototype.resetState = function () {
            if (this.nodes) {
                for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
                    var list = _a[_i];
                    for (var _b = 0, list_1 = list; _b < list_1.length; _b++) {
                        var node = list_1[_b];
                        node.resetState();
                    }
                }
            }
        };
        Grid.prototype.clearNodes = function () {
            if (this.nodes) {
                for (var _i = 0, _a = this.nodes; _i < _a.length; _i++) {
                    var list = _a[_i];
                    for (var _b = 0, list_2 = list; _b < list_2.length; _b++) {
                        var node = list_2[_b];
                        PF.Node.to(node);
                    }
                    list.length = 0;
                }
                this.nodes.length = 0;
            }
        };
        return Grid;
    }());
    PF.Grid = Grid;
    __reflect(Grid.prototype, "PF.Grid");
})(PF || (PF = {}));
var PF;
(function (PF) {
    var Option = (function () {
        function Option() {
            /**
             * 是否使用对角线
             */
            this.allowDiagonal = true;
            /**
             * 是否不在拐角处转弯
             */
            this.dontCrossCorners = true;
            /***
             * 自定义启发式算法
             */
            this.heuristic = null;
            /**
             * 权重
             */
            this.weight = 1;
            /**
             * 对角线行为
             */
            this.diagonalMovement = 0;
            /**
             * 最低时间-IDEA
             */
            this.timeLimit = 10;
            /**
             * 轨迹递归-IDEA、跳点
             */
            this.trackRecursion = true;
        }
        return Option;
    }());
    PF.Option = Option;
    __reflect(Option.prototype, "PF.Option");
})(PF || (PF = {}));
var PF;
(function (PF) {
    /**
     * Backtrace according to the parent records and return the path.
     * (including both start and end nodes)
     * @param {Node} node End node
     * @return {Array<Array<number>>} the path
     */
    function backtrace(node) {
        var path = [[node.x, node.y]];
        while (node.parent) {
            node = node.parent;
            path.push([node.x, node.y]);
        }
        return path.reverse();
    }
    PF.backtrace = backtrace;
    function backtraceNode(node) {
        var path = [node];
        while (node.parent) {
            node = node.parent;
            path.push(node);
        }
        return path.reverse();
    }
    PF.backtraceNode = backtraceNode;
    /**
     * Backtrace from start and end node, and return the path.
     * (including both start and end nodes)
     * @param {Node}
     * @param {Node}
     */
    function biBacktrace(nodeA, nodeB) {
        var pathA = backtrace(nodeA), pathB = backtrace(nodeB);
        return pathA.concat(pathB.reverse());
    }
    PF.biBacktrace = biBacktrace;
    /**
     * Compute the length of the path.
     * @param {Array<Array<number>>} path The path
     * @return {number} The length of the path
     */
    function pathLength(path) {
        var i, sum = 0, a, b, dx, dy;
        for (i = 1; i < path.length; ++i) {
            a = path[i - 1];
            b = path[i];
            dx = a[0] - b[0];
            dy = a[1] - b[1];
            sum += Math.sqrt(dx * dx + dy * dy);
        }
        return sum;
    }
    PF.pathLength = pathLength;
    /**
     * Given the start and end coordinates, return all the coordinates lying
     * on the line formed by these coordinates, based on Bresenham's algorithm.
     * http://en.wikipedia.org/wiki/Bresenham's_line_algorithm#Simplification
     * @param {number} x0 Start x coordinate
     * @param {number} y0 Start y coordinate
     * @param {number} x1 End x coordinate
     * @param {number} y1 End y coordinate
     * @return {Array<Array<number>>} The coordinates on the line
     */
    function interpolate(x0, y0, x1, y1) {
        var abs = Math.abs, line = [], sx, sy, dx, dy, err, e2;
        dx = abs(x1 - x0);
        dy = abs(y1 - y0);
        sx = (x0 < x1) ? 1 : -1;
        sy = (y0 < y1) ? 1 : -1;
        err = dx - dy;
        while (true) {
            line.push([x0, y0]);
            if (x0 === x1 && y0 === y1) {
                break;
            }
            e2 = 2 * err;
            if (e2 > -dy) {
                err = err - dy;
                x0 = x0 + sx;
            }
            if (e2 < dx) {
                err = err + dx;
                y0 = y0 + sy;
            }
        }
        return line;
    }
    PF.interpolate = interpolate;
    /**
     * Given a compressed path, return a new path that has all the segments
     * in it interpolated.
     * @param {Array<Array<number>>} path The path
     * @return {Array<Array<number>>} expanded path
     */
    function expandPath(path) {
        var expanded = [], len = path.length, coord0, coord1, interpolated, interpolatedLen, i, j;
        if (len < 2) {
            return expanded;
        }
        for (i = 0; i < len - 1; ++i) {
            coord0 = path[i];
            coord1 = path[i + 1];
            interpolated = interpolate(coord0[0], coord0[1], coord1[0], coord1[1]);
            interpolatedLen = interpolated.length;
            for (j = 0; j < interpolatedLen - 1; ++j) {
                expanded.push(interpolated[j]);
            }
        }
        expanded.push(path[len - 1]);
        return expanded;
    }
    PF.expandPath = expandPath;
    /**
     * Smoothen the give path.
     * The original path will not be modified; a new path will be returned.
     * @param {PF.Grid} grid
     * @param {Array<Array<number>>} path The path
     */
    function smoothenPath(grid, path) {
        var len = path.length, x0 = path[0][0], // path start x
        y0 = path[0][1], // path start y
        x1 = path[len - 1][0], // path end x
        y1 = path[len - 1][1], // path end y
        sx, sy, // current start coordinate
        ex, ey, // current end coordinate
        newPath, i, j, coord, line, testCoord, blocked;
        sx = x0;
        sy = y0;
        newPath = [[sx, sy]];
        for (i = 2; i < len; ++i) {
            coord = path[i];
            ex = coord[0];
            ey = coord[1];
            line = interpolate(sx, sy, ex, ey);
            blocked = false;
            for (j = 1; j < line.length; ++j) {
                testCoord = line[j];
                if (!grid.isWalkableAt(testCoord[0], testCoord[1])) {
                    blocked = true;
                    break;
                }
            }
            if (blocked) {
                var lastValidCoord = path[i - 1];
                newPath.push(lastValidCoord);
                sx = lastValidCoord[0];
                sy = lastValidCoord[1];
            }
        }
        newPath.push([x1, y1]);
        return newPath;
    }
    PF.smoothenPath = smoothenPath;
    /**
     * Compress a path, remove redundant nodes without altering the shape
     * The original path is not modified
     * @param {Array<Array<number>>} path The path
     * @return {Array<Array<number>>} The compressed path
     */
    function compressPath(path) {
        // nothing to compress
        if (path.length < 3) {
            return path;
        }
        var compressed = [], sx = path[0][0], // start x
        sy = path[0][1], // start y
        px = path[1][0], // second point x
        py = path[1][1], // second point y
        dx = px - sx, // direction between the two points
        dy = py - sy, // direction between the two points
        lx, ly, ldx, ldy, sq, i;
        // normalize the direction
        sq = Math.sqrt(dx * dx + dy * dy);
        dx /= sq;
        dy /= sq;
        // start the new path
        compressed.push([sx, sy]);
        for (i = 2; i < path.length; i++) {
            // store the last point
            lx = px;
            ly = py;
            // store the last direction
            ldx = dx;
            ldy = dy;
            // next point
            px = path[i][0];
            py = path[i][1];
            // next direction
            dx = px - lx;
            dy = py - ly;
            // normalize
            sq = Math.sqrt(dx * dx + dy * dy);
            dx /= sq;
            dy /= sq;
            // if the direction has changed, store the point
            if (dx !== ldx || dy !== ldy) {
                compressed.push([lx, ly]);
            }
        }
        // store the last point
        compressed.push([px, py]);
        return compressed;
    }
    PF.compressPath = compressPath;
})(PF || (PF = {}));
/**
* A node in grid.
* This class holds some basic information about a node and custom
* attributes may be added, depending on the algorithms' needs.
* @constructor
* @param {number} x - The x coordinate of the node on the grid.
* @param {number} y - The y coordinate of the node on the grid.
* @param {boolean} [walkable] - Whether this node is walkable.
*/
var PF;
(function (PF) {
    var Node = (function () {
        function Node() {
        }
        Node.prototype.initialize = function (x, y, walkable) {
            if (walkable === void 0) { walkable = true; }
            this.x = x;
            this.y = y;
            this.walkable = walkable;
            if (this.walkable) {
                if (!this.objects) {
                    this.objects = [];
                }
            }
        };
        Node.prototype.reset = function () {
            var that = this;
            that.x = 0;
            that.y = 0;
            that.walkable = true;
            if (that.objects && that.objects.length) {
                that.objects.length = 0;
            }
            that.resetState();
        };
        Node.prototype.resetState = function () {
            var that = this;
            that.g = 0;
            that.f = 0;
            that.h = 0;
            that.by = 0;
            that.parent = null;
            that.opened = false;
            that.closed = false;
            that.tested = false;
        };
        Node.prototype.hasObject = function (obj) {
            if (obj === void 0) { obj = null; }
            return this.objects && (obj ? (this.objects.indexOf(obj) >= 0) : (!!this.objects.length));
        };
        Node.from = function (x, y, walkable) {
            if (walkable === void 0) { walkable = true; }
            var node;
            if (this._pool.length) {
                node = this._pool.pop();
            }
            else {
                node = new Node();
            }
            node.initialize(x, y, walkable);
            return node;
        };
        Node.to = function (node) {
            node.reset();
            this._pool.push(node);
        };
        Node._pool = [];
        return Node;
    }());
    PF.Node = Node;
    __reflect(Node.prototype, "PF.Node");
})(PF || (PF = {}));
/**
 * Bi-direcitional Best-First-Search path-finder.
 * @constructor
 * @extends BiAStarFinder
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 * @param {function} opt.heuristic Heuristic function to estimate the distance
 *     (defaults to manhattan).
 */
var PF;
(function (PF) {
    var BiBestFirstFinder = (function (_super) {
        __extends(BiBestFirstFinder, _super);
        function BiBestFirstFinder(opt) {
            var _this = _super.call(this, opt) || this;
            var orig = _this.heuristic;
            _this.heuristic = function (dx, dy) {
                return orig(dx, dy) * 1000000;
            };
            return _this;
        }
        return BiBestFirstFinder;
    }(PF.BiAStarFinder));
    PF.BiBestFirstFinder = BiBestFirstFinder;
    __reflect(BiBestFirstFinder.prototype, "PF.BiBestFirstFinder");
})(PF || (PF = {}));
/**
 * Bi-directional Breadth-First-Search path finder.
 * @constructor
 * @param {object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 */
var PF;
(function (PF) {
    var BiBreadthFirstFinder = (function () {
        function BiBreadthFirstFinder(opt) {
            opt = opt || {};
            this.allowDiagonal = opt.allowDiagonal;
            this.dontCrossCorners = opt.dontCrossCorners;
            this.diagonalMovement = opt.diagonalMovement;
            if (!this.diagonalMovement) {
                if (!this.allowDiagonal) {
                    this.diagonalMovement = PF.DiagonalMovement.Never;
                }
                else {
                    if (this.dontCrossCorners) {
                        this.diagonalMovement = PF.DiagonalMovement.OnlyWhenNoObstacles;
                    }
                    else {
                        this.diagonalMovement = PF.DiagonalMovement.IfAtMostOneObstacle;
                    }
                }
            }
        }
        /**
         * Find and return the the path.
         * @return {Array<Array<number>>} The path, including both start and
         *     end positions.
         */
        BiBreadthFirstFinder.prototype.findPath = function (startX, startY, endX, endY, grid) {
            var startNode = grid.getNodeAt(startX, startY), endNode = grid.getNodeAt(endX, endY), startOpenList = [], endOpenList = [], neighbors, neighbor, node, diagonalMovement = this.diagonalMovement, BY_START = 0, BY_END = 1, i, l;
            // push the start and end nodes into the queues
            startOpenList.push(startNode);
            startNode.opened = true;
            startNode.by = BY_START;
            endOpenList.push(endNode);
            endNode.opened = true;
            endNode.by = BY_END;
            // while both the queues are not empty
            while (startOpenList.length && endOpenList.length) {
                // expand start open list       
                node = startOpenList.shift();
                node.closed = true;
                neighbors = grid.getNeighbors(node, diagonalMovement);
                for (i = 0, l = neighbors.length; i < l; ++i) {
                    neighbor = neighbors[i];
                    if (neighbor.closed) {
                        continue;
                    }
                    if (neighbor.opened) {
                        // if this node has been inspected by the reversed search,
                        // then a path is found.
                        if (neighbor.by === BY_END) {
                            return PF.biBacktrace(node, neighbor);
                        }
                        continue;
                    }
                    startOpenList.push(neighbor);
                    neighbor.parent = node;
                    neighbor.opened = true;
                    neighbor.by = BY_START;
                }
                // expand end open list     
                node = endOpenList.shift();
                node.closed = true;
                neighbors = grid.getNeighbors(node, diagonalMovement);
                for (i = 0, l = neighbors.length; i < l; ++i) {
                    neighbor = neighbors[i];
                    if (neighbor.closed) {
                        continue;
                    }
                    if (neighbor.opened) {
                        if (neighbor.by === BY_START) {
                            return PF.biBacktrace(neighbor, node);
                        }
                        continue;
                    }
                    endOpenList.push(neighbor);
                    neighbor.parent = node;
                    neighbor.opened = true;
                    neighbor.by = BY_END;
                }
            }
            // fail to find the path
            return [];
        };
        ;
        return BiBreadthFirstFinder;
    }());
    PF.BiBreadthFirstFinder = BiBreadthFirstFinder;
    __reflect(BiBreadthFirstFinder.prototype, "PF.BiBreadthFirstFinder");
})(PF || (PF = {}));
var PF;
(function (PF) {
    /**
     * Breadth-First-Search path finder.
     * @constructor
     * @param {Object} opt
     * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
     *     Deprecated, use diagonalMovement instead.
     * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
     *     block corners. Deprecated, use diagonalMovement instead.
     * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
     */
    var BreadthFirstFinder = (function () {
        function BreadthFirstFinder(opt) {
            opt = opt || {};
            this.allowDiagonal = opt.allowDiagonal;
            this.dontCrossCorners = opt.dontCrossCorners;
            this.diagonalMovement = opt.diagonalMovement;
            if (!this.diagonalMovement) {
                if (!this.allowDiagonal) {
                    this.diagonalMovement = PF.DiagonalMovement.Never;
                }
                else {
                    if (this.dontCrossCorners) {
                        this.diagonalMovement = PF.DiagonalMovement.OnlyWhenNoObstacles;
                    }
                    else {
                        this.diagonalMovement = PF.DiagonalMovement.IfAtMostOneObstacle;
                    }
                }
            }
        }
        /**
         * Find and return the the path.
         * @return {Array<Array<number>>} The path, including both start and
         *     end positions.
         */
        BreadthFirstFinder.prototype.findPath = function (startX, startY, endX, endY, grid) {
            var openList = [], diagonalMovement = this.diagonalMovement, startNode = grid.getNodeAt(startX, startY), endNode = grid.getNodeAt(endX, endY), neighbors, neighbor, node, i, l;
            // push the start pos into the queue
            openList.push(startNode);
            startNode.opened = true;
            // while the queue is not empty
            while (openList.length) {
                // take the front node from the queue
                node = openList.shift();
                node.closed = true;
                // reached the end position
                if (node === endNode) {
                    return PF.backtrace(endNode);
                }
                neighbors = grid.getNeighbors(node, diagonalMovement);
                for (i = 0, l = neighbors.length; i < l; ++i) {
                    neighbor = neighbors[i];
                    // skip this neighbor if it has been inspected before
                    if (neighbor.closed || neighbor.opened) {
                        continue;
                    }
                    openList.push(neighbor);
                    neighbor.opened = true;
                    neighbor.parent = node;
                }
            }
            // fail to find the path
            return [];
        };
        ;
        return BreadthFirstFinder;
    }());
    __reflect(BreadthFirstFinder.prototype, "BreadthFirstFinder");
})(PF || (PF = {}));
/**
 * Dijkstra path-finder.
 * @constructor
 * @extends AStarFinder
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 */
var PF;
(function (PF) {
    var DijkstraFinder = (function (_super) {
        __extends(DijkstraFinder, _super);
        function DijkstraFinder(opt) {
            var _this = _super.call(this, opt) || this;
            _this.heuristic = function (dx, dy) {
                return 0;
            };
            return _this;
        }
        return DijkstraFinder;
    }(PF.AStarFinder));
    PF.DijkstraFinder = DijkstraFinder;
    __reflect(DijkstraFinder.prototype, "PF.DijkstraFinder");
})(PF || (PF = {}));
var PF;
(function (PF) {
    /**
     * Iterative Deeping A Star (IDA*) path-finder.
     *
     * Recursion based on:
     *   http://www.apl.jhu.edu/~hall/AI-Programming/IDA-Star.html
     *
     * Path retracing based on:
     *  V. Nageshwara Rao, Vipin Kumar and K. Ramesh
     *  "A Parallel Implementation of Iterative-Deeping-A*", January 1987.
     *  ftp://ftp.cs.utexas.edu/.snapshot/hourly.1/pub/AI-Lab/tech-reports/UT-AI-TR-87-46.pdf
     *
     * @author Gerard Meier (www.gerardmeier.com)
     *
     * @constructor
     * @param {Object} opt
     * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
     *     Deprecated, use diagonalMovement instead.
     * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
     *     block corners. Deprecated, use diagonalMovement instead.
     * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
     * @param {function} opt.heuristic Heuristic function to estimate the distance
     *     (defaults to manhattan).
     * @param {number} opt.weight Weight to apply to the heuristic to allow for
     *     suboptimal paths, in order to speed up the search.
     * @param {boolean} opt.trackRecursion Whether to track recursion for
     *     statistical purposes.
     * @param {number} opt.timeLimit Maximum execution time. Use <= 0 for infinite.
     */
    var IDAStarFinder = (function () {
        function IDAStarFinder(opt) {
            opt = opt || {};
            this.allowDiagonal = opt.allowDiagonal;
            this.dontCrossCorners = opt.dontCrossCorners;
            this.diagonalMovement = opt.diagonalMovement;
            this.heuristic = opt.heuristic || PF.Heuristic.manhattan;
            this.weight = opt.weight || 1;
            this.trackRecursion = opt.trackRecursion || false;
            this.timeLimit = opt.timeLimit || Infinity; // Default: no time limit.
            if (!this.diagonalMovement) {
                if (!this.allowDiagonal) {
                    this.diagonalMovement = PF.DiagonalMovement.Never;
                }
                else {
                    if (this.dontCrossCorners) {
                        this.diagonalMovement = PF.DiagonalMovement.OnlyWhenNoObstacles;
                    }
                    else {
                        this.diagonalMovement = PF.DiagonalMovement.IfAtMostOneObstacle;
                    }
                }
            }
            // When diagonal movement is allowed the manhattan heuristic is not
            // admissible, it should be octile instead
            if (this.diagonalMovement === PF.DiagonalMovement.Never) {
                this.heuristic = opt.heuristic || PF.Heuristic.manhattan;
            }
            else {
                this.heuristic = opt.heuristic || PF.Heuristic.octile;
            }
        }
        /**
         * Find and return the the path. When an empty array is returned, either
         * no path is possible, or the maximum execution time is reached.
         *
         * @return {Array<Array<number>>} The path, including both start and
         *     end positions.
         */
        IDAStarFinder.prototype.findPath = function (startX, startY, endX, endY, grid) {
            // Used for statistics:
            var nodesVisited = 0;
            // Execution time limitation:
            var startTime = new Date().getTime();
            // Heuristic helper:
            var h = function (a, b) {
                return this.heuristic(Math.abs(b.x - a.x), Math.abs(b.y - a.y));
            }.bind(this);
            // Step cost from a to b:
            var cost = function (a, b) {
                return (a.x === b.x || a.y === b.y) ? 1 : Math.SQRT2;
            };
            /**
             * IDA* search implementation.
             *
             * @param {Node} The node currently expanding from.
             * @param {number} Cost to reach the given node.
             * @param {number} Maximum search depth (cut-off value).
             * @param {Array<Array<number>>} The found route.
             * @param {number} Recursion depth.
             *
             * @return {Object} either a number with the new optimal cut-off depth,
             * or a valid node instance, in which case a path was found.
             */
            var search = function (node, g, cutoff, route, depth) {
                nodesVisited++;
                // Enforce timelimit:
                if (this.timeLimit > 0 &&
                    new Date().getTime() - startTime > this.timeLimit * 1000) {
                    // Enforced as "path-not-found".
                    return Infinity;
                }
                var f = g + h(node, end) * this.weight;
                // We've searched too deep for this iteration.
                if (f > cutoff) {
                    return f;
                }
                if (node == end) {
                    route[depth] = [node.x, node.y];
                    return node;
                }
                var min, t, k, neighbour;
                var neighbours = grid.getNeighbors(node, this.diagonalMovement);
                // Sort the neighbours, gives nicer paths. But, this deviates
                // from the original algorithm - so I left it out.
                //neighbours.sort(function(a, b){
                //    return h(a, end) - h(b, end);
                //});
                /*jshint -W084 */ //Disable warning: Expected a conditional expression and instead saw an assignment
                for (k = 0, min = Infinity; neighbour = neighbours[k]; ++k) {
                    /*jshint +W084 */ //Enable warning: Expected a conditional expression and instead saw an assignment
                    if (this.trackRecursion) {
                        // Retain a copy for visualisation. Due to recursion, this
                        // node may be part of other paths too.
                        neighbour.retainCount = neighbour.retainCount + 1 || 1;
                        if (neighbour.tested !== true) {
                            neighbour.tested = true;
                        }
                    }
                    t = search(neighbour, g + cost(node, neighbour), cutoff, route, depth + 1);
                    if (t instanceof PF.Node) {
                        route[depth] = [node.x, node.y];
                        // For a typical A* linked list, this would work:
                        // neighbour.parent = node;
                        return t;
                    }
                    // Decrement count, then determine whether it's actually closed.
                    if (this.trackRecursion && (--neighbour.retainCount) === 0) {
                        neighbour.tested = false;
                    }
                    if (t < min) {
                        min = t;
                    }
                }
                return min;
            }.bind(this);
            // Node instance lookups:
            var start = grid.getNodeAt(startX, startY);
            var end = grid.getNodeAt(endX, endY);
            // Initial search depth, given the typical heuristic contraints,
            // there should be no cheaper route possible.
            var cutOff = h(start, end);
            var j, route, t;
            // With an overflow protection.
            for (j = 0; true; ++j) {
                route = [];
                // Search till cut-off depth:
                t = search(start, 0, cutOff, route, 0);
                // Route not possible, or not found in time limit.
                if (t === Infinity) {
                    return [];
                }
                // If t is a node, it's also the end node. Route is now
                // populated with a valid path to the end node.
                if (t instanceof PF.Node) {
                    return route;
                }
                // Try again, this time with a deeper cut-off. The t score
                // is the closest we got to the end node.
                cutOff = t;
            }
            // This _should_ never to be reached.
            //return [];
        };
        return IDAStarFinder;
    }());
    PF.IDAStarFinder = IDAStarFinder;
    __reflect(IDAStarFinder.prototype, "PF.IDAStarFinder");
})(PF || (PF = {}));
/**
 * Bi-directional Dijkstra path-finder.
 * @constructor
 * @extends BiAStarFinder
 * @param {Object} opt
 * @param {boolean} opt.allowDiagonal Whether diagonal movement is allowed.
 *     Deprecated, use diagonalMovement instead.
 * @param {boolean} opt.dontCrossCorners Disallow diagonal movement touching
 *     block corners. Deprecated, use diagonalMovement instead.
 * @param {DiagonalMovement} opt.diagonalMovement Allowed diagonal movement.
 */
var PF;
(function (PF) {
    var BiDijkstraFinder = (function (_super) {
        __extends(BiDijkstraFinder, _super);
        function BiDijkstraFinder(opt) {
            var _this = _super.call(this, opt) || this;
            _this.heuristic = function (dx, dy) {
                return 0;
            };
            return _this;
        }
        return BiDijkstraFinder;
    }(PF.BiAStarFinder));
    PF.BiDijkstraFinder = BiDijkstraFinder;
    __reflect(BiDijkstraFinder.prototype, "PF.BiDijkstraFinder");
})(PF || (PF = {}));