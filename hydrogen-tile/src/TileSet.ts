/**
 * Created by adame on 27.07.2017.
 */

export default class TileSet
{
    private _width : number;
    private _height : number;
    private _tileSize : number;

    public get width() : number { return this._width; }
    public get height() : number { return this._height; }

    public get tileSize() : number { return this._tileSize; }
    public set tileSize(value : number)
    {
        if(!(typeof value !== "number"))
            throw new Error("`value` is not type of TileSet!");

        this._tileSize = value;
    }
}