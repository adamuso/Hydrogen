/**
 * Created by adame on 30.07.2017.
 */
import StoryAsset from "./StoryAsset";
import { StoryElement } from "./StoryElement";
import StoryDialogue from "./StoryDialogue";
export interface StoryEntry {
    readonly [key: string]: any;
    readonly type: string;
}
export interface StoryDialogueEntry extends StoryEntry {
    readonly start: string;
}
export interface StoryElementType {
    new (controller: StoryController, entry: StoryEntry, path: string): StoryElement;
}
export interface StoryState {
    [key: string]: string | number | StoryState | string[] | number[] | StoryState[] | undefined;
}
export interface EntryData {
    entry: StoryEntry;
    state: StoryState;
    args: {
        [key: string]: string;
    };
    path: string;
}
export default class StoryController {
    private _story;
    private _state;
    story: StoryAsset | null;
    constructor();
    getEntryData(name: string, callerEntry: EntryData | null): EntryData;
    getDialogue(name: string): StoryDialogue;
    resolveRelativePath(path: string, basePath: string): string;
    private _resolveArgs(call, callArgs);
}
