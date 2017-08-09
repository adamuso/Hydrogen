/**
 * Created by adame on 05.08.2017.
 */

import {AssetSystem, Script, System} from "oxygen-core"
import {StoryController, StoryAsset, StoryDialogueChoice} from "hydrogen-story";

export default class GameStoryController extends Script
{
    private storyController : StoryController;

    public constructor()
    {
        super();

        this.storyController = new StoryController();
        this.storyController.story = System.get<AssetSystem>("AssetSystem").get<StoryAsset>("story://stories/story.json");
    }

    public onUpdate(deltaTime : number) : any
    {

    }

    public onKeyDown(code : number)
    {
        const dialogue = this.storyController.getDialogue("dialogue1");

        dialogue.next();

        if(dialogue.getCurrentEntry().type === "choice")
        {
            const element = dialogue.getCurrentElement<StoryDialogueChoice>(StoryDialogueChoice);

            element.option = element.options["yes"];
        }

        console.log((<any>dialogue)._current);
    }

    public static factory() : GameStoryController
    {
        return new GameStoryController();
    }
}