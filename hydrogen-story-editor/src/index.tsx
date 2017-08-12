/**
 * Created by adame on 09.08.2017.
 */

import * as React from 'react';
import {StoryEditor} from "./StoryEditor";
import * as injectTapEventPlugin from "react-tap-event-plugin";

(injectTapEventPlugin as any)();

interface EditorProperties
{
    readonly filename : string;
    buffer : any;
    onEdit : () => void;
}

export const name = 'Hydrogen Story Editor';
export const description = 'Story editor for hydrogen-story module';

export function onRender(filename : string, instance : any, meta : any)
{

}

export function onSave(filename : string, instance : any, meta : any, onEdit : any)
{

}

export function editor(props : EditorProperties)
{
    const story = JSON.parse(props.buffer.toString());

    return (
        <StoryEditor story={story}/>
    );
}