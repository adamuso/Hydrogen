/// <reference types="oxygen-core" />
/**
 * Created by adame on 27.07.2017.
 */
import { Asset, AssetSystem } from "oxygen-core";
export interface TileSetAssetData {
    width: number;
    height: number;
    tileSize: number;
    image: string;
}
export default class TileSetAsset extends Asset {
    private _descriptorAsset;
    private _imageAsset;
    data: {
        descriptor: TileSetAssetData;
        image: HTMLImageElement;
    };
    readonly width: number;
    readonly height: number;
    readonly tileSize: number;
    readonly texture: string;
    constructor(owner: AssetSystem, protocol: string, filename: string);
    dispose(): void;
    load(): Promise<TileSetAsset>;
}
