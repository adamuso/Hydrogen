"use strict";
/**
 * Created by adame on 09.08.2017.
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var requestAnimFrame = (function () {
    return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();
var StoryCanvas = (function (_super) {
    __extends(StoryCanvas, _super);
    function StoryCanvas(props) {
        var _this = _super.call(this, props) || this;
        if (props.ref)
            props.ref(_this);
        _this._isOnScreen = false;
        _this._canvas = null;
        _this._canvasContext = null;
        return _this;
    }
    Object.defineProperty(StoryCanvas.prototype, "entryData", {
        set: function (value) {
            if (!value || typeof value != "object" || !value.entry || !value.state || !value.path)
                throw new Error("`value` is not type of StoryEntryData!");
            this._entryData = value;
        },
        enumerable: true,
        configurable: true
    });
    StoryCanvas.prototype.render = function () {
        var _this = this;
        return React.createElement("div", { style: this.props.style },
            React.createElement("canvas", { ref: function (dom) { return _this._canvas = dom; } }));
    };
    StoryCanvas.prototype.componentDidMount = function () {
        var _canvas = this._canvas;
        this._isOnScreen = true;
        if (_canvas) {
            this._canvasContext = _canvas.getContext("2d");
            _canvas.width = _canvas.clientWidth;
            _canvas.height = _canvas.clientHeight;
        }
        window.addEventListener("resize", this.resize.bind(this));
        requestAnimFrame(this.rawUpdateCanvas.bind(this));
    };
    StoryCanvas.prototype.componentWillUnmount = function () {
        this._isOnScreen = false;
        this._canvas = null;
        this._canvasContext = null;
        window.removeEventListener("resize", this.resize.bind(this));
    };
    StoryCanvas.prototype.rawUpdateCanvas = function () {
        if (this._isOnScreen) {
            this.updateCanvas();
            requestAnimFrame(this.rawUpdateCanvas.bind(this));
            this.renderCanvas();
        }
    };
    StoryCanvas.prototype.resize = function () {
        var _canvas = this._canvas;
        if (_canvas) {
            _canvas.width = _canvas.clientWidth;
            _canvas.height = _canvas.clientHeight;
        }
    };
    StoryCanvas.prototype.updateCanvas = function () {
    };
    StoryCanvas.prototype.renderCanvas = function () {
        this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);
        this._canvasContext.fillStyle = "red";
        this._canvasContext.fillRect(40, 40, 100, 100);
    };
    return StoryCanvas;
}(React.Component));
exports.StoryCanvas = StoryCanvas;
//# sourceMappingURL=StoryCanvas.js.map