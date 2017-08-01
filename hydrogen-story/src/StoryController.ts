/**
 * Created by adame on 30.07.2017.
 */

import StoryAsset from "./StoryAsset";

export interface StoryEntry
{
    readonly [key : string] : any;

    readonly type : string;
}

export interface StoryControlEntry extends StoryEntry
{
    readonly data : string;
}

export interface StoryDialogueEntry extends StoryEntry
{
    readonly start : string;
}

export interface StoryTextEntry extends StoryEntry
{
    readonly next : string;
    readonly data : string;
}

export interface StoryAmbientEntry extends StoryTextEntry
{

}

export interface StoryChoiceEntry extends StoryEntry
{
    readonly data : string;
    readonly options : { readonly [key : string] : { text : string, next : string } };
}

interface StoryChoiceStatus
{
    readonly option : string;
}

export default class StoryController
{
    private _story : StoryAsset | null;
    private _currentEntry : StoryEntry | null;
    private _currentEntryName : string | null;
    private _status : any;

    public get story() : StoryAsset | null { return this._story; }
    public set story(value : StoryAsset | null)
    {
        if(!(value instanceof StoryAsset) || value === null)
            throw new Error("`value` is not a type of StoryAsset!");

        this._story = value;
    }

    public get entry() : StoryEntry | null { return this._currentEntry; }

    public constructor()
    {
        this._story = null;
        this._currentEntry = null;
        this._currentEntryName = null;
        this._status = null;
    }

    public next() : void
    {
        if(this._story === null)
            throw new Error("Story is not set!");

        if(this._currentEntry === null)
            throw new Error("Current entry is not set!");

        this._handleEntry();
    }

    private _setEntry(name : string | null)
    {
        if(name === null)
        {
            this._currentEntry = null;
            this._currentEntryName = null;
            return;
        }

        if(this._story === null)
            throw new Error("Story is not set!");

        let nameParts = this._resolveCall(name).split("/");
        let currentEntry = this._currentEntry ? this._currentEntry : this._story.data;
        let currentStatus = this._status;
        let currentName = this._currentEntryName;

        if(currentStatus._args)
            delete currentStatus._args;

        // handle absolute path
        if(nameParts[0].trim() === "")
        {
            currentName = "";
            currentEntry = this._story.data;
            nameParts.splice(0, 1);
        }

        // extracts arguments from name
        let args = nameParts[nameParts.length - 1].trim().split(" ").filter((value) => value.length > 0);
        nameParts[nameParts.length - 1] = args[0]; // zero argument is story entry name so we need to pass it back to nameParts
        args.splice(0, 1); // remove story entry name

        if(!currentStatus)
            currentStatus = {};

        for(let i = 0; i < nameParts.length; i++)
        {
            if(!currentEntry[nameParts[i]])
                throw new Error("Entry with name `" + nameParts[i] + "` not found!");

            if(!currentStatus[nameParts[i]])
                currentStatus[nameParts[i]] = {};

            currentStatus = currentStatus[nameParts[i]];
            currentEntry = currentEntry[nameParts[i]];
        }

        currentStatus._args = args;
        currentStatus._previousName = currentName;

        this._currentEntryName = currentName + "/" + name;
        this._currentEntry = currentEntry;
        this._status = currentStatus;
    }

    private _getStatus(name? : string) : any
    {
        if(this._story === null)
            throw new Error("Story is not set!");

        if(!name)
        {
            if (this._currentEntryName)
                name = this._currentEntryName;
            else
                throw new Error("Current entry is not set!");
        }

        let nameParts = name.split("/");
        let currentStatus = this._status;

        if(!currentStatus)
            throw new Error("Status is not set!");

        // handle absolute path
        if(nameParts[0].trim() === "")
            nameParts.splice(0, 1);

        // extracts arguments from name
        let args = nameParts[nameParts.length - 1].trim().split(" ").filter((value) => value.length > 0);
        nameParts[nameParts.length - 1] = args[0]; // zero argument is story entry name so we need to pass it back to nameParts
        args.splice(0, 1); // remove story entry name

        for(let i = 0; i < nameParts.length; i++)
        {
            if(!currentStatus[nameParts[i]])
                throw new Error("Status with name `" + nameParts[i] + "` not found!");

            currentStatus = currentStatus[nameParts[i]];
        }

        return currentStatus;
    }

    private _getParentStatus() : any
    {
        const { _currentEntryName } = this;

        if(!_currentEntryName)
            throw new Error("Entry is not set!");

        let name = _currentEntryName.split("/").filter((value) => value.length > 0);
        name.splice(name.length - 1, 1);

        return this._getStatus(name.join("/"));
    }

    private _resolveCall(call : string)
    {
        const { _status } = this;
        call = call.trim();
        call = call.replace(/{(.+)}/g, (substring : string, ...args: any[]) : string =>
        {
            const argsName : string = args[0];

            if(!_status || !_status._args || !_status._args[argsName])
                throw new Error("Arguments were not passed to this entry!");

            return _status._args[argsName];
        });

        return call;
    }

    private _handleEntry()
    {
        const { _currentEntry } = this;

        if(!_currentEntry)
            return;

        if(_currentEntry.type === "dialogue")
            this._handleDialogue(<StoryDialogueEntry>_currentEntry);
        else if(_currentEntry.type === "text")
            this._handleText(<StoryTextEntry>_currentEntry);
        else if(_currentEntry.type === "choice")
            this._handleChoice(<StoryChoiceEntry>_currentEntry);
        else if(_currentEntry.type === "ambient")
            this._handleAmbient(<StoryAmbientEntry>_currentEntry);
        else if(_currentEntry.type === "control")
            this._handleControl(<StoryControlEntry>_currentEntry);
    }

    private _handleDialogue(entry : StoryDialogueEntry)
    {
        this._setEntry(entry.start);
    }

    private _handleText(entry : StoryTextEntry)
    {
        this._setEntry(entry.next);
    }

    private _handleChoice(entry : StoryChoiceEntry)
    {
        const status = <StoryChoiceStatus>this._status;

        this._setEntry(entry.options[status.option].next);

        delete (<any>status).option;
    }

    private _handleAmbient(entry : StoryAmbientEntry)
    {
        this._setEntry(entry.next);
    }

    private _handleControl(entry : StoryControlEntry)
    {
        const parentStatus = this._getParentStatus();

        if(entry.data === "end")
            this._setEntry(parentStatus._previousName);
    }
}