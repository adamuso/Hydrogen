/**
 * Created by adame on 01.08.2017.
 */

import {StoryElement} from "./StoryElement";
import StoryController, {StoryEntry, EntryData} from "./StoryController";

export default class StoryQuest extends StoryElement
{
    public constructor(controller : StoryController, entryData : EntryData)
    {
        super(controller, entryData);
    }
}