/**
 * Created by adame on 09.08.2017.
 */

import {StoryElement} from "./StoryElement";
import {EntryData, default as StoryController, StoryEntry, StoryState} from "./StoryController";

export interface StoryChoiceEntry extends StoryEntry
{
    readonly data : string;
    readonly options : { readonly [key : string] : StoryChoiceOptionEntry};
}

export interface StoryChoiceState extends StoryState
{
    option? : string;
}

export interface StoryChoiceOptionEntry
{
    readonly text : string;
    readonly next : string;
}

export class StoryDialogueChoice extends StoryElement
{
    private _choiceEntry : StoryChoiceEntry;
    private _choiceState : StoryChoiceState;

    public get options() : { readonly [key : string] : StoryChoiceOptionEntry}
    {
        return this._choiceEntry.options;
    }

    public set option(value : StoryChoiceOptionEntry)
    {
        const {_choiceEntry} = this;
        let optionName : string | null = null;

        for (let p in _choiceEntry.options)
        {
            if (_choiceEntry.options[p] === value)
            {
                optionName = p;
                break;
            }
        }

        if(!optionName)
            throw new Error("Passed option is not part of this choice entry!");

        this._choiceState.option = optionName;
    }

    public constructor(controller : StoryController, entryData : EntryData)
    {
        super(controller, entryData);

        this._choiceEntry = <StoryChoiceEntry>entryData.entry;
        this._choiceState = <StoryChoiceState>entryData.state;
    }

    public getOptionsNames() : string[]
    {
        return Object.keys(this._choiceEntry.options);
    }
}