"use strict";
/**
 * Created by adame on 09.08.2017.
 */
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var StoryEditor_1 = require("./StoryEditor");
var injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();
exports.name = 'Hydrogen Story Editor';
exports.description = 'Story editor for hydrogen-story module';
function onRender(filename, instance, meta) {
}
exports.onRender = onRender;
function onSave(filename, instance, meta, onEdit) {
}
exports.onSave = onSave;
function editor(props) {
    var story = JSON.parse(props.buffer.toString());
    return (React.createElement(StoryEditor_1.StoryEditor, { story: story }));
}
exports.editor = editor;
//# sourceMappingURL=index.js.map