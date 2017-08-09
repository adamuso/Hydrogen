/**
 * Created by adame on 09.08.2017.
 */

import * as React from "react"
import {StoryCanvas} from "./StoryCanvas";
import {StoryPropertiesPanel} from "./StoryPropertiesPanel";
import {
    Toolbar, ToolbarGroup, ToolbarTitle, RaisedButton
} from "material-ui";
import {
    Grid, Sidebar, Menu, Icon, Segment
} from "semantic-ui-react"

export class StoryEditor extends React.Component
{
    public render() : JSX.Element | null | any
    {
        return (
            <div>
                <Sidebar.Pushable as={Segment}>
                    <Sidebar as={Menu} width='thin' visible={true} icon='labeled' vertical inverted>
                        <Menu.Item name='home'>
                            <Icon name='home' />
                            Home
                        </Menu.Item>
                        <Menu.Item name='gamepad'>
                            <Icon name='gamepad' />
                            Games
                        </Menu.Item>
                    </Sidebar>
                </Sidebar.Pushable>
                <Toolbar>
                  <ToolbarGroup firstChild={true}>
                      <RaisedButton label="Add element" primary={true} />
                  </ToolbarGroup>
                  <ToolbarGroup>
                      <ToolbarTitle text="Options" />
                  </ToolbarGroup>
                </Toolbar>
                <Grid>
                    <Grid.Column>
                        <StoryCanvas/>
                    </Grid.Column>
                    <Grid.Column>
                        <StoryPropertiesPanel/>
                    </Grid.Column>
                </Grid>
            </div>
        );
    }
}