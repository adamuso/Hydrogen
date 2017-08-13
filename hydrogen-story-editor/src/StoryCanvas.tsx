/**
 * Created by adame on 09.08.2017.
 */

import * as React from "react";
import {StoryAssetDataContainer, StoryEntryData} from "hydrogen-story";

const requestAnimFrame : (callback : () => void) => void = (function()
{
    return window.requestAnimationFrame             ||
        window.webkitRequestAnimationFrame          ||
        (window as any).mozRequestAnimationFrame    ||
        function( callback : () => void )
        {
            window.setTimeout(callback, 1000 / 60);
        };
})();

interface StoryCanvasProps
{
    style?: object;
    ref?: (self : StoryCanvas) => void;
    story: StoryAssetDataContainer;
}

export class StoryCanvas extends React.Component<StoryCanvasProps, HTMLCanvasElement>
{
    private _isOnScreen : boolean;
    private _canvasContext : CanvasRenderingContext2D | null;
    private _canvas : HTMLCanvasElement | null;
    private _entryData : StoryEntryData;

    public set entryData(value : StoryEntryData)
    {
        if(!value || typeof value != "object" || !value.entry || !value.state || !value.path)
            throw new Error("`value` is not type of StoryEntryData!");

        this._entryData = value;
    }

    public constructor(props: StoryCanvasProps)
    {
        super(props);

        if(props.ref)
            props.ref(this);

        this._isOnScreen = false;
        this._canvas = null;
        this._canvasContext = null;
    }

    public render() : JSX.Element | null | any
    {
        return <div style={this.props.style}><canvas ref={dom => this._canvas = dom}/></div>;
    }

    public componentDidMount() : void
    {
        const { _canvas } = this;

        this._isOnScreen = true;

        if(_canvas)
        {
            this._canvasContext = _canvas.getContext("2d");
            _canvas.width = _canvas.clientWidth;
            _canvas.height = _canvas.clientHeight;
        }

        window.addEventListener("resize", this.resize.bind(this));

        requestAnimFrame(this.rawUpdateCanvas.bind(this));
    }

    public componentWillUnmount() : void
    {
        this._isOnScreen = false;
        this._canvas = null;
        this._canvasContext = null;

        window.removeEventListener("resize", this.resize.bind(this));
    }

    private rawUpdateCanvas() : void
    {
        if(this._isOnScreen)
        {
            this.updateCanvas();
            requestAnimFrame(this.rawUpdateCanvas.bind(this));
            this.renderCanvas();
        }
    }

    private resize()
    {
        const { _canvas } = this;

        if(_canvas)
        {
            _canvas.width = _canvas.clientWidth;
            _canvas.height = _canvas.clientHeight;
        }
    }

    private updateCanvas()
    {

    }

    private renderCanvas()
    {
        this._canvasContext.clearRect(0, 0, this._canvas.width, this._canvas.height);

        this._canvasContext.fillStyle = "red";
        this._canvasContext.fillRect(40, 40, 100, 100);
    }
}