/**
 * Created by adame on 01.08.2017.
 */

import {StoryElement} from "./StoryElement";
import StoryController, {StoryEntryData, StoryDialogueEntry, StoryEntry, StoryState} from "./StoryController";
import {StoryChoiceEntry, StoryChoiceState} from "./StoryDialogueChoice";
import StoryControlElement from "./StoryControlElement";

export interface StoryTextEntry extends StoryEntry
{
    readonly next : string;
    readonly data : string;
}

export interface StoryAmbientEntry extends StoryTextEntry
{

}

export interface StoryControlEntry extends StoryEntry
{
    readonly data : string;
}

export interface StoryDialogueState extends StoryState
{
    current : string;
}

export default class StoryDialogue extends StoryControlElement
{
    public static get uid() { return "StoryDialogue"; }

    private _entry: StoryDialogueEntry;
    private _state : StoryDialogueState;
    private _current : StoryEntryData | null;

    public constructor(controller : StoryController, entryData : StoryEntryData)
    {
        super(controller, entryData);

        this._entry = <StoryDialogueEntry>entryData.entry;
        this._state = <StoryDialogueState>entryData.state;
        this._current = null;

        if(this._state.current)
            this._setCurrent(this._state.current);
    }

    public next() : void
    {
        const { _current, _entry } = this;

        if(_current === null)
        {
            this._setCurrent(_entry.start);
        }
        else
        {
            const type = _current.entry.type;

            if(type === "dialogue")
            {

            }
            else if(type === "text")
                this._handleText(<StoryTextEntry>_current.entry);
            else if(type === "choice")
                this._handleChoice(<StoryChoiceEntry>_current.entry);
            else if(type === "ambient")
                this._handleAmbient(<StoryAmbientEntry>_current.entry);
            else if(type === "control")
                this._handleControl(<StoryControlEntry>_current.entry);
        }
    }

    public getCurrentElement<T extends StoryElement>(type : { new(controller : StoryController, entry : StoryEntryData) : T }) : T | null
    {
        const { _current } = this;

        if(!_current)
            return null;

        return new type(this._controller, _current);
    }

    public getCurrentEntry<T extends StoryEntry>() : T | null
    {
        return this._current ? <T>this._current.entry : null;
    }

    public getCurrentState<T extends StoryState>() : T | null
    {
        return this._current ? <T>this._current.state : null;
    }

    private _setCurrent(path : string | null)
    {
        if(path === null)
        {
            this._state.current = "";
            this._current = null;
            return;
        }

        const { _current, _controller, _entryData } = this;

        this._current = _controller.getEntryData(_controller.resolveRelativePath(path, _entryData.path), _current);
        this._state.current = "/" + this._current.path;
    }

    private _handleText(entry : StoryTextEntry)
    {
        this._setCurrent(entry.next);
    }

    private _handleChoice(entry : StoryChoiceEntry)
    {
        const { _current } = this;

        const state = <StoryChoiceState>_current!.state;

        if(state.option)
        {
            this._setCurrent(entry.options[state.option].next);

            delete (<any>state).option;
        }
        else
            throw new Error("`option` field is not set!");
    }

    private _handleAmbient(entry : StoryAmbientEntry)
    {
        this._setCurrent(entry.next);
    }

    private _handleControl(entry : StoryControlEntry)
    {
        if(entry.data === "end")
            this._setCurrent(null);
    }
}