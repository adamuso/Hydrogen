/**
 * Created by adame on 28.07.2017.
 */

import Tile from "./src/Tile";
import TileFactorySystem from "./src/TileFactorySystem";
import TileFactory from "./src/TileFactory";
import TileSetAsset from "./src/TileSetAsset";
import TileGridRenderer from "./src/TileGridRenderer";
import {System} from "oxygen-core";

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

System.register(new TileFactorySystem());
System.get<TileFactorySystem>("TileFactorySystem").register(TileFactory);