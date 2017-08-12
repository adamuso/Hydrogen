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
var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var StoryCanvas_1 = require("./StoryCanvas");
var StoryPropertiesPanel_1 = require("./StoryPropertiesPanel");
var material_ui_1 = require("material-ui");
var material_ui_superselectfield_1 = require("material-ui-superselectfield");
var hydrogen_story_1 = require("hydrogen-story");
var StoryEditor = (function (_super) {
    __extends(StoryEditor, _super);
    function StoryEditor(props) {
        var _this = _super.call(this) || this;
        _this._controller = new hydrogen_story_1.StoryController();
        _this._controller.story = props.story;
        _this._storyCanvas = null;
        return _this;
    }
    StoryEditor.prototype.handleStoryMenuSelection = function (item, name) {
        var _storyCanvas = this._storyCanvas;
        if (_storyCanvas)
            _storyCanvas.entryData = item.value;
    };
    StoryEditor.prototype.render = function () {
        var _this = this;
        var canvasStyle = { display: "inline-block", width: "calc(100% - 250px)", height: "100%", verticalAlign: "top" };
        var propertiesStyle = {
            display: "inline-block",
            width: "250px",
            height: "100%",
            verticalAlign: "top",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
            boxSizing: "border-box"
        };
        var mainMenuItems = StoryEditor.generateMainMenuItems(this._controller, this.props.story.data);
        return (React.createElement("div", { style: { height: "100%" } },
            React.createElement(material_ui_1.Toolbar, null,
                React.createElement(material_ui_1.ToolbarGroup, { firstChild: true },
                    React.createElement(material_ui_1.RaisedButton, { label: "Create element", primary: true }),
                    React.createElement(material_ui_superselectfield_1.default, { name: "storyMenuElement", style: { "minWidth": "200px" }, onChange: this.handleStoryMenuSelection.bind(this) }, mainMenuItems)),
                React.createElement(material_ui_1.ToolbarGroup, null,
                    React.createElement(material_ui_1.ToolbarTitle, { text: "Options" }))),
            React.createElement("div", { style: { height: "calc(100% - 55px)" } },
                React.createElement(StoryCanvas_1.StoryCanvas, { ref: function (self) { return _this._storyCanvas = self; }, style: canvasStyle, story: this.props.story }),
                React.createElement(StoryPropertiesPanel_1.StoryPropertiesPanel, { style: propertiesStyle, story: this.props.story }))));
    };
    //noinspection JSUnusedLocalSymbols
    StoryEditor.StoryMenuElement = function (props) {
        return React.createElement("div", __assign({}, props), props.children);
    };
    StoryEditor.generateMainMenuItems = function (controller, story, base) {
        if (base === void 0) { base = ""; }
        var elements = [];
        for (var name_1 in story) {
            if (!story.hasOwnProperty(name_1))
                continue;
            var entryData = controller.getEntryData(controller.resolveRelativePath(name_1, base), null);
            if (entryData.entry.type === "dialogue")
                elements.push(React.createElement(StoryEditor.StoryMenuElement, { value: entryData, label: "Dialogue: " + name_1 }, "Dialogue: " + name_1));
            else if (entryData.entry.type === "quest")
                elements.push(React.createElement(StoryEditor.StoryMenuElement, { value: entryData, label: "Quest: " + name_1 }, "Quest: " + name_1));
            else if (entryData.entry.type === "container")
                elements.concat(StoryEditor.generateMainMenuItems(controller, entryData.entry, entryData.path));
        }
        return elements;
    };
    return StoryEditor;
}(React.Component));
exports.StoryEditor = StoryEditor;
//# sourceMappingURL=StoryEditor.js.map