/**
 * Created by adame on 09.08.2017.
 */

import * as React from "react"
import {StoryCanvas} from "./StoryCanvas";
import {StoryPropertiesPanel} from "./StoryPropertiesPanel";
import {
    Toolbar, ToolbarGroup, ToolbarTitle, RaisedButton, DropDownMenu, MenuItem
} from "material-ui";
import {StoryEntry} from "hydrogen-story";
import SuperSelectField from "material-ui-superselectfield";
import {StoryController, StoryAssetDataContainer, StoryEntryData} from "hydrogen-story";

interface StoryEditorProps
{
    story : StoryAssetDataContainer;
}

export class StoryEditor extends React.Component<StoryEditorProps, { storyMenuElement: any }>
{
    private _controller : StoryController;
    private _storyCanvas : StoryCanvas | null;

    public constructor(props : StoryEditorProps)
    {
        super();

        this._controller = new StoryController();
        this._controller.story = props.story;
        this._storyCanvas = null;
    }

    public handleStoryMenuSelection(item : { value: StoryEntryData, label: string }, name : string)
    {
        const { _storyCanvas } = this;

        if(_storyCanvas)
            _storyCanvas.entryData = item.value;
    }

    public render() : JSX.Element | null | any
    {
        const canvasStyle = { display: "inline-block", width: "calc(100% - 250px)", height: "100%", verticalAlign: "top" };

        const propertiesStyle = {
            display: "inline-block",
            width: "250px",
            height: "100%",
            verticalAlign: "top",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            borderLeft: "1px solid rgba(0, 0, 0, 0.2)",
            boxSizing: "border-box"
        };

        const mainMenuItems = StoryEditor.generateMainMenuItems(this._controller, this.props.story.data);

        return (
            <div style={{ height: "100%" }}>
                <Toolbar>
                  <ToolbarGroup firstChild={true}>
                      <RaisedButton label="Create element" primary={true}/>
                      <SuperSelectField name="storyMenuElement" style={{ "minWidth": "200px" }} onChange={this.handleStoryMenuSelection.bind(this)}>
                          {mainMenuItems}
                      </SuperSelectField>
                  </ToolbarGroup>
                  <ToolbarGroup>
                      <ToolbarTitle text="Options" />
                  </ToolbarGroup>
                </Toolbar>
                <div style={{ height: "calc(100% - 55px)" }}>
                    <StoryCanvas ref={(self) => this._storyCanvas = self} style={canvasStyle} story={this.props.story}/>
                    <StoryPropertiesPanel style={propertiesStyle} story={this.props.story}/>
                </div>
            </div>
        );
    }

    //noinspection JSUnusedLocalSymbols
    private static StoryMenuElement(props : JSX.ElementChildrenAttribute & { value: StoryEntryData, label: string })
    {
        return <div {...props}>{props.children}</div>;
    }

    private static generateMainMenuItems(controller : StoryController, story : { [key : string] : StoryEntry}, base : string = "") : JSX.Element[] | null
    {
        let elements : JSX.Element[] = [];

        for(const name in story)
        {
            if(!story.hasOwnProperty(name))
                continue; 

            const entryData = controller.getEntryData(controller.resolveRelativePath(name, base), null);

            if(entryData.entry.type === "dialogue")
                elements.push(<StoryEditor.StoryMenuElement value={entryData} label={"Dialogue: " + name}>{"Dialogue: " + name}</StoryEditor.StoryMenuElement>);
            else if(entryData.entry.type === "quest")
                elements.push(<StoryEditor.StoryMenuElement value={entryData} label={"Quest: " + name}>{"Quest: " + name}</StoryEditor.StoryMenuElement>);
            else if(entryData.entry.type === "container")
                elements.concat(StoryEditor.generateMainMenuItems(controller, entryData.entry, entryData.path));
        }

        return elements;
    }
}