/**
 * Created by adame on 04.08.2017.
 */

export default class StoryStatus
{
    private children : { [key: string] : StoryStatus };

    [key : string] : any;

    public constructor()
    {
        this.children = {};
    }

    public set(name : string, status : StoryStatus) : void
    {
        this.children[name] = status;
    }

    public createEmpty(name : string) : void
    {
        this.children[name] = new StoryStatus();
    }

    public get(name : string) : StoryStatus
    {
        return this.children[name];
    }

    public has(name : string) : boolean
    {
        return !!this.children[name];
    }
}