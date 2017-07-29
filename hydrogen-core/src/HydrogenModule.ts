/**
 * Created by adame on 29.07.2017.
 */

export default class HydrogenModule
{
    private static modules : Array<() => void>;

    private static _initialize()
    {
        HydrogenModule.modules = [];
    }

    public static initialize()
    {
        for(let i = 0; i < HydrogenModule.modules.length; i++)
            HydrogenModule.modules[i]();
    }

    public static register(initializer : () => void)
    {
        if(!HydrogenModule.modules)
            HydrogenModule._initialize();

        HydrogenModule.modules.push(initializer);
    }
}