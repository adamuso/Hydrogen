/**
 * Created by adame on 27.07.2017.
 */

declare module "oxygen-core"
{
    class RenderSystem
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
