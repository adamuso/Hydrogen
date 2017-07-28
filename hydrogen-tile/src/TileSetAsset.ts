/**
 * Created by adame on 27.07.2017.
 */

import {Asset, AssetSystem, ImageAsset, JSONAsset} from "oxygen-core";

interface TileSetAssetData
{
    width : number;
    height : number;
    tileSize : number;
    image : string;
}

export default class TileSetAsset extends Asset
{
    private _descriptorAsset : Asset | null;
    private _imageAsset : Asset | null;

    public data : { descriptor: TileSetAssetData, image : HTMLImageElement };

    public get width() : number { return this.data.descriptor.width; }
    public get height() : number { return this.data.descriptor.height; }
    public get tileSize() : number { return this.data.descriptor.tileSize; }
    public get texture() : string { return this.data.descriptor.image; }

    public constructor(owner : AssetSystem, protocol : string, filename : string)
    {
        super(owner, protocol, filename);

        this._descriptorAsset = null;
        this._imageAsset = null;
    }

    public dispose() : void
    {
        super.dispose();

        const { _descriptorAsset, _imageAsset } = this;

        if (!!_descriptorAsset) {
            _descriptorAsset.dispose();
        }
        if (!!_imageAsset) {
            _imageAsset.dispose();
        }

        this._descriptorAsset = null;
        this._imageAsset = null;
    }

    public async load() : Promise<TileSetAsset>
    {
        const descriptorAsset = await this.owner.load<JSONAsset<TileSetAssetData>>(`json://${this.filename}`);
        const data = descriptorAsset.data;
        this._descriptorAsset = descriptorAsset;

        if(!data.image)
            throw new Error("`image` field doesn't exists!");

        const imageAsset = await this.owner.load<ImageAsset>(`image://${data.image}`);

        this.data = {
            descriptor: data,
            image: imageAsset.data
        };

        return this;
    }
}