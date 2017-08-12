/**
 * Created by adame on 30.07.2017.
 */

import {HydrogenModule} from "hydrogen-core";
import {AssetSystem, System} from "oxygen-core";
import StoryController, {StoryState, StoryEntry, StoryEntryData} from "./StoryController";
import {StoryChoiceState, StoryDialogueChoice} from "./StoryDialogueChoice";
import {StoryElement} from "./StoryElement";
import StoryDialogue from "./StoryDialogue";
import StoryQuest from "./StoryQuest";
import StoryControlElement from "./StoryControlElement";
import StoryAsset, {StoryAssetDataContainer} from "./StoryAsset";

export interface StoryElementCreator
{
    new(controller: StoryController, entryData: StoryEntryData): StoryElement;
}

export interface StoryControlElementCreator
{
    new(controller: StoryController, entryData: StoryEntryData): StoryControlElement;
}

export default class HydrogenStory extends HydrogenModule
{
    private static _storyElements: StoryElementCreator[];
    private static _storyControlElements: StoryControlElementCreator[];

    public static registerStoryElement(storyElementCreator: StoryElementCreator)
    {
        if (!HydrogenStory._storyElements)
            HydrogenStory._storyElements = [];

        if (!HydrogenStory._storyControlElements)
            HydrogenStory._storyControlElements = [];

        const {_storyElements, _storyControlElements} = HydrogenStory;

        if (storyElementCreator.prototype instanceof StoryControlElement)
        {
            if (_storyControlElements.indexOf(storyElementCreator) === -1)
                _storyControlElements.push(storyElementCreator);
            else
                throw new Error("StoryControlElement of name `" + name + "` is already registered!");
        }
        else
        {
            if (_storyElements.indexOf(storyElementCreator) === -1)
                _storyElements.push(storyElementCreator);
            else
                throw new Error("StoryElement of name `" + name + "` is already registered!");
        }
    }

    public static get storyElements(): StoryElementCreator[]
    {
        return this._storyElements;
    }

    public static get storyControlElements(): StoryControlElementCreator[]
    {
        return this._storyControlElements;
    }
}

export {
    StoryController,
    StoryAsset,
    StoryState,
    StoryChoiceState,
    StoryDialogueChoice,
    StoryEntry,
    StoryAssetDataContainer,
    StoryEntryData,
    StoryDialogue,
    StoryQuest,
    StoryElement,
    StoryControlElement
}

HydrogenModule.register(() =>
{
    HydrogenStory.registerStoryElement(StoryDialogue);
    HydrogenStory.registerStoryElement(StoryQuest);
    HydrogenStory.registerStoryElement(StoryDialogueChoice);
    debugger;

    System.get<AssetSystem>("AssetSystem").registerProtocol("story", StoryAsset.factory);
});
