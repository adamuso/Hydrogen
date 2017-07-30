/**
 * Created by adame on 28.07.2017.
 */
import Tile from "./Tile";
import TileFactorySystem from "./TileFactorySystem";
import TileFactory from "./TileFactory";
import TileSetAsset from "./TileSetAsset";
import TileGridRenderer from "./TileGridRenderer";
import { HydrogenModule } from "hydrogen-core";
export declare class HydrogenTile extends HydrogenModule {
}
declare const _default: {
    Tile: typeof Tile;
    TileFactory: typeof TileFactory;
    TileFactorySystem: typeof TileFactorySystem;
    TileGridRenderer: typeof TileGridRenderer;
    TileSetAsset: typeof TileSetAsset;
};
export default _default;
export { Tile, TileFactory, TileFactorySystem, TileGridRenderer, TileSetAsset };
