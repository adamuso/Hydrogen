/**
 * Created by adame on 01.08.2017.
 */

import StoryController, {StoryEntryData} from "./StoryController";

export abstract class StoryElement
{
    protected _controller : StoryController;
    protected _entryData : StoryEntryData;

    public constructor(controller : StoryController, entryData : StoryEntryData)
    {
        this._controller = controller;
        this._entryData = entryData;
    }
}