/**
 * Created by adame on 09.08.2017.
 */
import { StoryElement } from "./StoryElement";
import { EntryData, default as StoryController, StoryEntry, StoryState } from "./StoryController";
export interface StoryChoiceEntry extends StoryEntry {
    readonly data: string;
    readonly options: {
        readonly [key: string]: StoryChoiceOptionEntry;
    };
}
export interface StoryChoiceState extends StoryState {
    option?: string;
}
export interface StoryChoiceOptionEntry {
    readonly text: string;
    readonly next: string;
}
export declare class StoryDialogueChoice extends StoryElement {
    private _choiceEntry;
    private _choiceState;
    readonly options: {
        readonly [key: string]: StoryChoiceOptionEntry;
    };
    option: StoryChoiceOptionEntry;
    constructor(controller: StoryController, entryData: EntryData);
    getOptionsNames(): string[];
}
