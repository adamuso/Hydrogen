/**
 * Created by adame on 30.07.2017.
 */

import {Asset, AssetSystem, JSONAsset} from "oxygen-core";

export default class StoryAsset extends Asset
{
    private _descriptorAsset : JSONAsset<any>;

    public data : any;

    public constructor(owner : AssetSystem, protocol : string, filename : string)
    {
        super(owner, protocol, filename);
    }

    public dispose() : void
    {
        const { _descriptorAsset } = this;

        if(!!_descriptorAsset)
            _descriptorAsset.dispose();
    }

    public async load() : Promise<StoryAsset>
    {
        const descriptorAsset = await this.owner.load<JSONAsset<any>>("json://" + this.filename);

        this._descriptorAsset = descriptorAsset;
        this.data = descriptorAsset.data;

        return this;
    }

    public static factory(...args : any[]) : StoryAsset
    {
        return new StoryAsset(args[0], args[1], args[2]);
    }
}