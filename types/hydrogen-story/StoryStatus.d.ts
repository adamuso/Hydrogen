/**
 * Created by adame on 04.08.2017.
 */
export default class StoryStatus {
    private children;
    [key: string]: any;
    constructor();
    set(name: string, status: StoryStatus): void;
    createEmpty(name: string): void;
    get(name: string): StoryStatus;
    has(name: string): boolean;
}
