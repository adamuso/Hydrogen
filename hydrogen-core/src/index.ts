/**
 * Created by adame on 27.07.2017.
 */

import HydrogenModule from "./HydrogenModule";

export default {
    HydrogenModule,
    lazyHydrogenInitialization
}

export {
    HydrogenModule,
    lazyHydrogenInitialization
}

function lazyHydrogenInitialization(...modules : any[])
{
    HydrogenModule.initialize();
}