/**
 * Created by adame on 29.07.2017.
 */
export default class HydrogenModule {
    private static modules;
    private static _initialize();
    static initialize(): void;
    static register(initializer: () => void): void;
}
