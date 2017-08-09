/**
 * Created by adame on 28.07.2017.
 */

import {JSONAsset, lazyInitialization, System} from "oxygen-core";
import { vec4 } from 'gl-matrix';
import {lazyHydrogenInitialization} from "hydrogen-core";
import HydrogenStory from "hydrogen-story";
import StoryController from "./scripts/StoryController";

lazyInitialization({
    asset: {
        pathPrefix: 'assets/',
        fetchOptions: { cache: 'no-store' }
    },
    render: { screen: 'screen-0' }
});

lazyHydrogenInitialization(HydrogenStory);

const {
    AssetSystem,
    RenderSystem,
    EntitySystem
} = System.systems;

EntitySystem.registerComponent("GameStoryController", StoryController.factory);

vec4.set(RenderSystem.clearColor, 1, 1, 1, 1);


(async() =>
{
    let configAsset = await AssetSystem.load<JSONAsset<{ assets : string[] }>>('json://config.json');
    await AssetSystem.loadSequence(configAsset.data.assets);

    System.events.triggerLater('change-scene', 'scene://scenes/game.json');
})();
