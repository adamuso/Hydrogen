/**
 * Created by adame on 28.07.2017.
 */

import Tile from "./Tile";

export default class TileFactory
{
    //noinspection JSMethodCanBeStatic
    public create(data: any) : Tile
    {
        if(typeof data === "number")
            return new Tile(data);

        throw new Error("`data` is in unknown format!");
    }
}