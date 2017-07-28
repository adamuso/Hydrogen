/// <reference types="oxygen-core" />
/**
 * Created by adame on 28.07.2017.
 */
import { System } from "oxygen-core";
import TileFactory from "./TileFactory";
declare module "oxygen-core" {
    interface AllSystems {
        TileFactorySystem: TileFactorySystem;
    }
}
export default class TileFactorySystem extends System {
    private factories;
    constructor();
    dispose(): void;
    onRegister(): void;
    onUnregister(): void;
    register(factoryType: typeof TileFactory): void;
    unregister(factoryType: typeof TileFactory): void;
    get(name: string): typeof TileFactory;
}
