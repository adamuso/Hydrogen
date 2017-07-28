/// <reference types="oxygen-core" />
/**
 * Created by adame on 27.07.2017.
 */
import { VerticesRenderer, RenderSystem } from "oxygen-core";
import TileSetAsset from "./TileSetAsset";
import Tile from "./Tile";
import TileFactory from "./TileFactory";
export default class TileGridRenderer extends VerticesRenderer {
    private _width;
    private _height;
    private _xOffset;
    private _yOffset;
    private _tileSet;
    private tileFactory;
    private rebuild;
    private tiles;
    width: number;
    height: number;
    xOffset: number;
    yOffset: number;
    tileFactoryType: typeof TileFactory;
    tileSet: TileSetAsset | null;
    constructor();
    setTile(x: number, y: number, tile: Tile): void;
    getTile(x: number, y: number): Tile | null;
    clear(): void;
    onRender(gl: WebGLRenderingContext, renderer: RenderSystem, deltaTime: number): void;
    onPropertySetup(name: string, value: any): void;
    private ensureVertices();
    static factory(): TileGridRenderer;
}
