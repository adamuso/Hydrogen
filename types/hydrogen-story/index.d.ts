/**
 * Created by adame on 30.07.2017.
 */
import { HydrogenModule } from "hydrogen-core";
import StoryAsset from "./StoryAsset";
import StoryController, { StoryState } from "./StoryController";
import { StoryChoiceState, StoryDialogueChoice } from "./StoryDialogueChoice";
export default class HydrogenStory extends HydrogenModule {
}
export { StoryController, StoryAsset, StoryState, StoryChoiceState, StoryDialogueChoice };
