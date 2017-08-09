/**
 * Created by adame on 01.08.2017.
 */
import { StoryElement } from "./StoryElement";
import StoryController, { EntryData, StoryEntry, StoryState } from "./StoryController";
export interface StoryTextEntry extends StoryEntry {
    readonly next: string;
    readonly data: string;
}
export interface StoryAmbientEntry extends StoryTextEntry {
}
export interface StoryControlEntry extends StoryEntry {
    readonly data: string;
}
export interface StoryDialogueState extends StoryState {
    current: string;
}
export default class StoryDialogue extends StoryElement {
    private _entry;
    private _state;
    private _current;
    constructor(controller: StoryController, entryData: EntryData);
    next(): void;
    getCurrentElement<T extends StoryElement>(type: {
        new (controller: StoryController, entry: EntryData): T;
    }): T | null;
    getCurrentEntry<T extends StoryEntry>(): T | null;
    getCurrentState<T extends StoryState>(): T | null;
    private _setCurrent(path);
    private _handleText(entry);
    private _handleChoice(entry);
    private _handleAmbient(entry);
    private _handleControl(entry);
}
