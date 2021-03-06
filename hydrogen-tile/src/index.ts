/**
 * Created by adame on 28.07.2017.
 */

import Tile from "./Tile";
import TileFactorySystem from "./TileFactorySystem";
import TileFactory from "./TileFactory";
import TileSetAsset from "./TileSetAsset";
import TileGridRenderer from "./TileGridRenderer";
import {AssetSystem, EntitySystem, System} from "oxygen-core";
import {HydrogenModule} from "hydrogen-core";

export class HydrogenTile extends HydrogenModule {}

export default {
    Tile,
    TileFactory,
    TileFactorySystem,
    TileGridRenderer,
    TileSetAsset
}

export {
    Tile,
    TileFactory,
    TileFactorySystem,
    TileGridRenderer,
    TileSetAsset
}

HydrogenModule.register(() =>
{
    System.register(new TileFactorySystem());
    System.get<TileFactorySystem>("TileFactorySystem").register(TileFactory);

    System.get<AssetSystem>("AssetSystem").registerProtocol("tileset", TileSetAsset.factory);
    System.get<EntitySystem>("EntitySystem").registerComponent("TileGridRenderer", TileGridRenderer.factory);
});