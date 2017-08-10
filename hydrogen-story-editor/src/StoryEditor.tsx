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

export class StoryEditor extends React.Component<{story : any}, any>
{
    public constructor()
    {
        super();

        this.state = {value: 1};
    }
    handleChange = (event : any, index : any, value : any) => this.setState({value});
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

        const mainMenuItems = StoryEditor.generateMainMenuItems(this.props.story);
        let a = 0;

        return (
            <div style={{ height: "100%" }}>
                <Toolbar>
                  <ToolbarGroup firstChild={true}>
                      <RaisedButton label="Create element" primary={true}/>
                      <DropDownMenu value={this.state.value} onChange={this.handleChange}>
                          <MenuItem value={1} primaryText="Never" />
                          <MenuItem value={2} primaryText="Every Night" />
                          <MenuItem value={3} primaryText="Weeknights" />
                          <MenuItem value={4} primaryText="Weekends" />
                          <MenuItem value={5} primaryText="Weekly" />
                          {/*mainMenuItems*/}
                      </DropDownMenu>
                  </ToolbarGroup>
                  <ToolbarGroup>
                      <ToolbarTitle text="Options" />
                  </ToolbarGroup>
                </Toolbar>
                {/*<div style={{ height: "calc(100% - 55px)" }}>*/}
                    {/*<StoryCanvas style={canvasStyle} story={this.props.story}/>*/}
                    {/*<StoryPropertiesPanel style={propertiesStyle} story={this.props.story}/>*/}
                {/*</div>*/}
            </div>
        );
    }

    //noinspection JSUnusedLocalSymbols
    private static generateMainMenuItems(story : { [key : string] : StoryEntry}) : JSX.Element[] | null
    {
        let elements : JSX.Element[] = [];

        for(const name in story)
        {
            if(!story.hasOwnProperty(name))
                continue; 

            const entry = story[name];

            if(entry.type === "dialogue")
                elements.push(<MenuItem key={name} primaryText={"Dialogue: " + name}/>);
            else if(entry.type === "quest")
                elements.push(<MenuItem key={name} primaryText={"Quest: " + name}/>);
            else if(entry.type === "container")
                elements.concat(StoryEditor.generateMainMenuItems(entry));
        }

        console.log(story);

        return elements;
    }
}