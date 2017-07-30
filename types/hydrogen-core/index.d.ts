/**
 * Created by adame on 27.07.2017.
 */
import HydrogenModule from "./HydrogenModule";
declare const _default: {
    HydrogenModule: typeof HydrogenModule;
    lazyHydrogenInitialization: (...modules: any[]) => void;
};
export default _default;
export { HydrogenModule, lazyHydrogenInitialization };
declare function lazyHydrogenInitialization(...modules: any[]): void;
