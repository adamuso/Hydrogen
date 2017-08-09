/**
 * Created by adame on 30.07.2017.
 */

import StoryAsset from "./StoryAsset";
import {StoryElement} from "./StoryElement";
import StoryDialogue from "./StoryDialogue";

export interface StoryEntry
{
    readonly [key : string] : any;

    readonly type : string;
}

export interface StoryDialogueEntry extends StoryEntry
{
    readonly start : string;
}

export interface StoryElementType
{
    new(controller : StoryController, entry : StoryEntry, path : string) : StoryElement
}

export interface StoryState
{
    [key : string] : string | number | StoryState | string[] | number[] | StoryState[] | undefined;
}

export interface EntryData
{
    entry : StoryEntry;
    state : StoryState;
    args : { [key : string] : string; };
    path : string;
}

export default class StoryController
{
    private _story : StoryAsset | null;
    private _state : StoryState;

    public get story() : StoryAsset | null { return this._story; }
    public set story(value : StoryAsset | null)
    {
        if(!(value instanceof StoryAsset) || value === null)
            throw new Error("`value` is not a type of StoryAsset!");

        this._story = value;
    }

    public constructor()
    {
        this._story = null;
        this._state = {};
    }

    public getEntryData(name : string, callerEntry : EntryData | null) : EntryData
    {
        if(this._story === null )
            throw new Error("Story is not set!");

        let nameParts = this._resolveArgs(name, callerEntry ? callerEntry.args : null).split("/").filter((value) => value.length > 0);

        if(callerEntry && callerEntry.args)
            delete callerEntry.args;

        let currentEntry  : StoryEntry = this._story.data;
        let currentState = this._state;
        let currentName = "";

        // extracts arguments from name
        let args = nameParts[nameParts.length - 1].trim().split(" ").filter((value) => value.length > 0);
        nameParts[nameParts.length - 1] = args[0]; // zero argument is story entry name so we need to pass it back to nameParts
        args.splice(0, 1); // remove story entry name

        for(let i = 0; i < nameParts.length; i++)
        {
            if(nameParts[i] === ".")
                continue;

            // TODO: implement backing up
            //if(nameParts[i] === "..")

            if(!currentEntry[nameParts[i]])
                throw new Error("Entry with name `" + nameParts[i] + "` not found!");

            currentName += "/" + nameParts[i];
            currentEntry = currentEntry[nameParts[i]];

            if(!currentState["$" + nameParts[i]])
                currentState["$" + nameParts[i]] = {};

            currentState = <StoryState>currentState["$" + nameParts[i]];
        }

        const argsMap = args.reduce((map, value, index) => { map[index] = value; return map; }, <{ [key : string] : string }>{});

        return { entry : currentEntry, state : currentState, args : argsMap, path : nameParts.join("/") };
    }

    public getDialogue(name : string) : StoryDialogue
    {
        return new StoryDialogue(this, this.getEntryData(name, null));
    }

    public resolveRelativePath(path : string, basePath : string) : string
    {
        const pathStart = path.split("/")[0].trim();

        if(pathStart === "")
            return path;

        return basePath + "/" + path;
    }

    private _resolveArgs(call : string, callArgs : { [key : string] : string } | null)
    {
        call = call.trim();
        call = call.replace(/{(.+)}/g, (substring : string, ...args: any[]) : string =>
        {
            const argsName : string = args[0];

            if(!callArgs || !callArgs[argsName])
                throw new Error("Arguments were not passed to this entry!");

            return callArgs[argsName];
        });

        return call;
    }
}