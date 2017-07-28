/**
 * Created by adame on 28.07.2017.
 */

import {System} from "oxygen-core";
import TileFactory from "./TileFactory";

export default class TileFactorySystem extends System
{
    private factories : Map<string, typeof TileFactory>;

    public constructor()
    {
        super();

        this.factories = new Map<string, typeof TileFactory>();
    }

    public dispose() : void
    {
        super.dispose();

        this.factories.clear();
    }

    public onRegister() : void
    {

    }

    public onUnregister() : void
    {

    }

    public register(factoryType : typeof TileFactory) : void
    {
        if(!(factoryType instanceof Function) || !factoryType.constructor)
            throw new Error("`factoryType` is not representing a subtype information of TileFactory")

        this.factories.set(factoryType.constructor.name, factoryType);
    }

    public unregister(factoryType : typeof TileFactory) : void
    {
        if(!(factoryType instanceof Function) || !factoryType.constructor)
            throw new Error("`factoryType` is not representing a subtype information of TileFactory")

        this.factories.delete(factoryType.constructor.name);
    }

    public get(name : string) : typeof TileFactory
    {
        if(!this.factories.has(name))
            throw new Error("Specified factory doesn't exist!");

        return <typeof TileFactory>this.factories.get(name);
    }
}