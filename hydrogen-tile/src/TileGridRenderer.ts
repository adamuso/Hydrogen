/**
 * Created by adame on 27.07.2017.
 */

import {VerticesRenderer, RenderSystem, System, Sampler, AssetSystem} from "oxygen-core";
import TileSetAsset from "./TileSetAsset";
import Tile from "./Tile";
import TileFactory from "./TileFactory";
import TileFactorySystem from "./TileFactorySystem";

export default class TileGridRenderer extends VerticesRenderer
{
    private _width : number;
    private _height : number;
    private _xOffset : number;
    private _yOffset : number;
    private _tileSet : TileSetAsset | null;
    private tileFactory : TileFactory;
    private rebuild : boolean;
    private tiles : Tile[];

    public get width() : number { return this._width; }
    public set width(value : number)
    {
        if(typeof value !== "number")
            throw new Error("`value` is not type of number!");

        this._width = value;
        this.rebuild = true;
    }

    public get height() : number { return this._height; }
    public set height(value : number)
    {
        if(typeof value !== "number")
            throw new Error("`value` is not type of number!");

        this._height = value;
        this.rebuild = true;
    }

    public get xOffset() : number { return this._xOffset; }
    public set xOffset(value : number)
    {
        if(typeof value !== "number")
            throw new Error("`value` is not type of number!");

        this._xOffset = value;
        this.rebuild = true;
    }

    public get yOffset() : number { return this._yOffset; }
    public set yOffset(value : number)
    {
        if(typeof value !== "number")
            throw new Error("`value` is not type of number!");

        this._yOffset = value;
        this.rebuild = true;
    }

    public set tileFactoryType(value : typeof TileFactory)
    {
        if(!(value instanceof Function) || !value.constructor)
            throw new Error("`value` is not representing a subtype information of TileFactory")

        const factorySystem = <TileFactorySystem>System.get("TileFactorySystem");
        const factoryType = factorySystem.get(value.constructor.name);

        this.tileFactory = new factoryType();
    }

    public get tileSet() : TileSetAsset | null { return this._tileSet; }
    public set tileSet(value : TileSetAsset | null)
    {
        if(value == null || !(value instanceof TileSetAsset))
            throw new Error("`value` is not type of TileSetAsset!");

        const overrideSamplers = <Map<string, object>>this.overrideSamplers;
        const sampler = <Sampler>overrideSamplers.get('sBase');

        if (!sampler)
        {
            overrideSamplers.set('sBase', <Sampler>{
                texture: value.texture,
                filtering: 'linear'
            });
        }
        else
        {
            sampler.texture = value.texture;
        }

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
        this.tileFactory = new TileFactory();
        this.tiles = [];
        this.rebuild = false;
    }

    public setTile(x : number, y : number, tile : Tile) : void
    {
        if(!(typeof x === "number") || x < 0 || x >= this.width)
            throw new Error("`x` is out of range!");

        if(!(typeof y === "number") || y < 0 || y >= this.height)
            throw new Error("`y` is out of range!");

        this.tiles[x + y * this.width] = tile;
        this.rebuild = true;
    }

    public getTile(x : number, y : number) : Tile | null
    {
        if(!(typeof x === "number") || x < 0 || x >= this.width)
            throw new Error("`x` is out of range!");

        if(!(typeof y === "number") || y < 0 || y >= this.height)
            throw new Error("`y` is out of range!");

        let result = this.tiles[x + y * this.width];

        return !result ? null : result;
    }

    public clear()
    {
        this.tiles = [];
    }

    public onRender(gl : WebGLRenderingContext, renderer : RenderSystem, deltaTime : number)
    {
        this.ensureVertices();

        super.onRender(gl, renderer, deltaTime);
    }

    public onPropertySetup(name : string, value : any) : void
    {
        if(name === "tiles")
        {
            if(!(value instanceof Array))
                throw new Error("`tiles` must be an array!");

            for(let i = 0; i < value.length; i++)
            {
                this.setTile(i % this.width, i / this.height, this.tileFactory.create(value[i]));
            }
        }
        else if(name === "tilesFactory")
        {
            if(typeof value !== "string")
                throw new Error("`tilesFactory` must be a name of factory!");

            const factorySystem : TileFactorySystem = System.get<TileFactorySystem>("TileFactorySystem");
            const factoryType = factorySystem.get(value);

            this.tileFactory = new factoryType();
        }
        else if(name === "tileset")
        {
            if(typeof value !== "string")
                throw new Error("`tilesFactory` must be a name of factory!");

            const assetSystem : AssetSystem = System.get<AssetSystem>("AssetSystem");

            this.tileSet = assetSystem.get<TileSetAsset>("tileset://" + value);
        }
        else
            super.onPropertySetup(name, value);
    }

    private ensureVertices()
    {
        if (!this.rebuild || !this._tileSet)
            return;

        const { _width, _height, _xOffset, _yOffset } = this;

        let vertices : number[] = [];
        let indices : number[] = [];

        let _frameBottomRight = [0, 0];
        let _frameTopLeft = [0, 0];
        let indicesStart = 0;

        for(let y = 0; y < this._height; y++)
        {
            for(let x = 0; x < this._width; x++)
            {
                if(!this.tiles[x + y * this.width])
                    continue;

                _frameTopLeft[0] = (this.tiles[x + y * this.width].id % this._tileSet.width * this._tileSet.tileSize) / (this._tileSet.width * this._tileSet.tileSize);
                _frameTopLeft[1] = (this.tiles[x + y * this.width].id / this._tileSet.width * this._tileSet.tileSize) / (this._tileSet.height * this._tileSet.tileSize);
                _frameBottomRight[0] = (this.tiles[x + y * this.width].id % this._tileSet.width * this._tileSet.tileSize + this._tileSet.tileSize) / (this._tileSet.width * this._tileSet.tileSize);
                _frameBottomRight[1] = (this.tiles[x + y * this.width].id / this._tileSet.width * this._tileSet.tileSize + this._tileSet.tileSize) / (this._tileSet.height * this._tileSet.tileSize);

                vertices.push(
                    -_xOffset, -_yOffset, _frameTopLeft[0], _frameTopLeft[1],
                    _width - _xOffset, -_yOffset, _frameBottomRight[0], _frameTopLeft[1],
                    _width - _xOffset, _height - _yOffset, _frameBottomRight[0], _frameBottomRight[1],
                    -_xOffset, _height - _yOffset, _frameTopLeft[0], _frameBottomRight[1]);

                indices.push(indicesStart, indicesStart + 1, indicesStart + 2, indicesStart + 2, indicesStart + 3, indicesStart);
                indicesStart += 4;
            }
        }

        this.vertices = vertices;
        this.indices = indices;

        this.rebuild = false;
    }

    public static factory() : TileGridRenderer
    {
        return new TileGridRenderer();
    }
}