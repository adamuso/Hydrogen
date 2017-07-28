/**
 * Created by adame on 27.07.2017.
 */

///<reference path="../node_modules/hydrogen-core/src/oxygen.d.ts"/>

import { VerticesRenderer } from "oxygen-core";
import TileSet from "./TileSet";
import Tile from "./Tile";

export default class TileGridRenderer extends VerticesRenderer
{
    private _width : number;
    private _height : number;
    private _xOffset : number;
    private _yOffset : number;
    private _tileSet : TileSet | null;
    private rebuild : boolean;
    private tiles : Tile[];

    public get width() : number { return this._width; }
    public get height() : number { return this._height; }

    public get xOffset() : number { return this._xOffset; }
    public set xOffset(value : number)
    {
        if(!(typeof value !== "number"))
            throw new Error("`value` is not type of TileSet!");

        this._xOffset = value;
        this.rebuild = true;
    }

    public get yOffset() : number { return this._yOffset; }
    public set yOffset(value : number)
    {
        if(!(typeof value !== "number"))
            throw new Error("`value` is not type of TileSet!");

        this._yOffset = value;
        this.rebuild = true;
    }

    public get tileSet() : TileSet | null { return this._tileSet; }
    public set tileSet(value : TileSet | null)
    {
        if(value == null || !(value instanceof TileSet))
            throw new Error("`value` is not type of TileSet!");

        this._tileSet = value;
        this.rebuild = true;
    }

    public constructor()
    {
        super();

        this._width = 0;
        this._height = 0;
        this._xOffset = 0;
        this._yOffset = 0;
        this._tileSet = null;
        this.tiles = [];
        this.rebuild = false;
    }

    public onPropertySetup(name : string, value : any) : void
    {
        if()
        this[name] = value;

        super.onPropertySetup(name, value);
    }

    private ensureVertices()
    {
        if (!this.rebuild || !this._tileSet)
            return;

        const { _width, _height, _xOffset, _yOffset } = this;

        this.vertices = [];
        this.indices = [];

        let _frameBottomRight = [0, 0];
        let _frameTopLeft = [0, 0];

        for(let y = 0; y < this._height; y++)
        {
            for(let x = 0; x < this._width; x++)
            {
                _frameTopLeft[0] = (this.tiles[x + y * this.width].id % this._tileSet.width * this._tileSet.tileSize) / (this._tileSet.width * this._tileSet.tileSize);
                _frameTopLeft[1] = (this.tiles[x + y * this.width].id / this._tileSet.width * this._tileSet.tileSize) / (this._tileSet.height * this._tileSet.tileSize);

                this.vertices.push(
                    -_xOffset, -_yOffset, _frameTopLeft[0], _frameTopLeft[1],
                    _width - _xOffset, -_yOffset, _frameBottomRight[0], _frameTopLeft[1],
                    _width - _xOffset, _height - _yOffset, _frameBottomRight[0], _frameBottomRight[1],
                    -_xOffset, _height - _yOffset, _frameTopLeft[0], _frameBottomRight[1]);

                this.indices.push(0, 1, 2, 2, 3, 0);
            }
        }

        this.rebuild = false;
    }
}