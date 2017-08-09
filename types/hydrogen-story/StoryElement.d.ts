/**
 * Created by adame on 01.08.2017.
 */
import StoryController, { EntryData } from "./StoryController";
export declare abstract class StoryElement {
    protected _controller: StoryController;
    protected _entryData: EntryData;
    constructor(controller: StoryController, entryData: EntryData);
}
