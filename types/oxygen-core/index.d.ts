/**
 * Created by adame on 27.07.2017.
 */

declare module "oxygen-core/bin/systems/AssetSystem/Asset.js"
{
    import {AssetSystem} from "oxygen-core";

    export default class Asset
    {
        public readonly owner : AssetSystem;
        public readonly  protocol : string;
        public readonly  filename : string;
        public data : any;

        public constructor(owner : AssetSystem, protocol : string, filename : string);
        public dispose() : void;
        public load() : Promise<any>;
        public onReady() : void
    }
}

declare module "oxygen-core"
{
    import {vec4} from "gl-matrix";

    export function lazyInitialization(settings : { asset : { pathPrefix : string, fetchOptions : object}, render : { screen : string } }) : void;

    interface Sampler
    {
        texture : string,
        filtering : string
    }

    interface AllSystems
    {
        AssetSystem: AssetSystem;
        EntitySystem : EntitySystem;
        RenderSystem : RenderSystem;
    }

    export class Asset
    {
        public readonly owner : AssetSystem;
        public readonly  protocol : string;
        public readonly  filename : string;
        public data : any;

        public constructor(owner : AssetSystem, protocol : string, filename : string);
        public dispose() : void;
        public load() : Promise<any>;
        public onReady() : void
    }

    export class JSONAsset<TData> extends Asset
    {
        public data: TData;

        load(): Promise<JSONAsset<TData>>;

        public static factory(...args: any[]): JSONAsset<any>;
    }

    export class ImageAsset extends Asset
    {
        public data : HTMLImageElement;

        public dispose() : void;
        public load() : Promise<ImageAsset>;
        public static factory(...args : any[]) : ImageAsset;
    }

    export class System
    {
        public dispose() : void;

        public static readonly systems : AllSystems

        public static get(typename : string) : System;
        public static get<T>(typename : string) : T;
        public static register(system : System) : void;
    }

    export class AssetSystem extends System
    {
        public readonly pathPrefix : string;
        public readonly fetchOptions : any;
        public readonly events : any;

        public constructor(pathPrefix : string, fetchOptions : any);
        public dispose() : void;
        public registerProtocol(protocol : string, assetConstructor : () => Asset) : void;
        public unregisterProtocol(protocol : string) : void;
        public get(path : string) : Asset;
        public get<T>(path : string) : T;

        public load<T>(path : string) : Promise<T>;
        public loadSequence(paths : string[]) : any[];
        public loadAll(paths : string[]) : Promise<any[]>;
        public unload(path : string) : void;
        public onUnregister() : void;
    }

    export class EntitySystem extends  System
    {
        public registerComponent(componentName : string, componentCreator : () => Component) : void;
    }

    export class RenderSystem extends System
    {
        public clearColor : vec4;
    }

    export class Entity
    {

    }

    export class Component
    {
        public readonly entity : Entity;

        public constructor();

        public dispose() : void;
        public onAttach() : void;
        public onDetach() : void;
        public onAction(name : string, ...args : any[]) : void;
        public onPropertySetup(name : string, value : any) : void;
    }

    export class VerticesRenderer extends Component
    {
        public visible : boolean;
        public shader : string;
        public vertices : Float32Array | number[];
        public indices : Uint16Array | number[];
        public overrideUniforms : Map<string, object> | object;
        public overrideSamplers : Map<string, object> | object;

        public constructor();
        public dispose() : void;

        public onAction(name : string, ...args : any[]) : void;
        public onRender(gl : WebGLRenderingContext, renderer : RenderSystem, deltaTime : number) : void;

        public static factory() : VerticesRenderer;
    }

    export class RectangleRenderer extends  VerticesRenderer
    {
        public width : number;
        public height : number;
        public xOffset : number;
        public yOffset : number;

        public constructor();

        public onRender(gl : WebGLRenderingContext, renderer : RenderSystem, deltaTime : number) : void;
        public ensureVertices() : void;

        public static factory() : RectangleRenderer;
    }
}
