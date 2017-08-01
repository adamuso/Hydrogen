/// <reference types="oxygen-core" />
/**
 * Created by adame on 30.07.2017.
 */
import { Asset, AssetSystem } from "oxygen-core";
export default class StoryAsset extends Asset {
    private _descriptorAsset;
    data: any;
    constructor(owner: AssetSystem, protocol: string, filename: string);
    dispose(): void;
    load(): Promise<StoryAsset>;
}
