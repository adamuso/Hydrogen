/**
 * Created by adame on 27.07.2017.
 */

declare module "oxygen-core"
{
    interface Sampler
    {
        texture : string,
        filtering : string
    }

    class Asset
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

    class JSONAsset<TData> extends Asset
    {
        public data : TData;

        load() : Promise<JSONAsset<TData>>;

        public static factory(...args : any[]) : JSONAsset<any>;
    }


    class ImageAsset
    {
        public data : HTMLImageElement;

        public dispose() : void;
        public load() : Promise<ImageAsset>;
        public static factory(...args : any[]) : ImageAsset;
    }

    class System
    {
        public dispose() : void;

        public static readonly systems : { [key: string] : System };

        public static get(typename : string) : System;
        public static get<T>(typename : string) : T;
        public static register(system : System) : void;
    }

    class AssetSystem extends System
    {
        public readonly pathPrefix : string;
        public readonly fetchOptions : any;
        public readonly events : any;

        public constructor(pathPrefix : string, fetchOptions : any);
        public dispose() : void;
        public registerProtocol(protocol : string, assetConstructor : Function) : void;
        public unregisterProtocol(protocol : string) : void;
        public get(path : string) : any;

        public load<T>(path : string) : Promise<T>;
        public loadSequence(paths : string[]) : any[];
        public loadAll(paths : string[]) : Promise<any[]>;
        public unload(path : string) : void;
        public onUnregister() : void;
    }

    class RenderSystem extends System
    {

    }

    class Entity
    {

    }

    class Component
    {
        public readonly entity : Entity;

        public constructor();

        public dispose() : void;
        public onAttach() : void;
        public onDetach() : void;
        public onAction(name : string, ...args : any[]) : void;
        public onPropertySetup(name : string, value : any) : void;
    }

    class VerticesRenderer extends Component
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

    class RectangleRenderer extends  VerticesRenderer
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
