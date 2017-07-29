/**
 * Created by adame on 28.07.2017.
 */

import {JSONAsset, lazyInitialization, System} from "oxygen-core";
import { vec4 } from 'gl-matrix';
import { Tile } from "hydrogen-tile";
import {lazyHydrogenInitialization} from "hydrogen-core";

// import TWEEN from 'tween.generated';
// import GameController from './scripts/GameController';

lazyInitialization({
    asset: {
        pathPrefix: 'assets/',
        fetchOptions: { cache: 'no-store' }
    },
    render: { screen: 'screen-0' }
});

lazyHydrogenInitialization();

let a : Tile = new Tile(1);

const {
    AssetSystem,
    RenderSystem,
    EntitySystem
} = System.systems;

// EntitySystem.registerComponent('GameController', GameController.factory);

vec4.set(RenderSystem.clearColor, 1, 1, 1, 1);

(async() =>
{
    let configAsset = await AssetSystem.load<JSONAsset<{ assets : string[] }>>('json://config.json');
    await AssetSystem.loadSequence(configAsset.data.assets);

    (<any>System).events.triggerLater(
            'change-scene',
            'scene://scenes/game.json');
})();
