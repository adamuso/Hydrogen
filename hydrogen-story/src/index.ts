/**
 * Created by adame on 30.07.2017.
 */

import {HydrogenModule} from "hydrogen-core";
import {AssetSystem, System} from "oxygen-core";
import StoryAsset from "./StoryAsset";
import StoryController, {StoryState, StoryEntry} from "./StoryController";
import {StoryChoiceState, StoryDialogueChoice} from "./StoryDialogueChoice";

export default class HydrogenStory extends HydrogenModule {}

export {
    StoryController,
    StoryAsset,
    StoryState,
    StoryChoiceState,
    StoryDialogueChoice,
    StoryEntry
}

HydrogenModule.register(() =>
{
    System.get<AssetSystem>("AssetSystem").registerProtocol("story", StoryAsset.factory);
});