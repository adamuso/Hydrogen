/**
 * Created by adame on 30.07.2017.
 */
import StoryAsset from "./StoryAsset";
export interface StoryEntry {
    readonly [key: string]: any;
    readonly type: string;
}
export interface StoryControlEntry extends StoryEntry {
    readonly data: string;
}
export interface StoryDialogueEntry extends StoryEntry {
    readonly start: string;
}
export interface StoryTextEntry extends StoryEntry {
    readonly next: string;
    readonly data: string;
}
export interface StoryAmbientEntry extends StoryTextEntry {
}
export interface StoryChoiceEntry extends StoryEntry {
    readonly data: string;
    readonly options: {
        readonly [key: string]: {
            text: string;
            next: string;
        };
    };
}
export default class StoryController {
    private _story;
    private _currentEntry;
    private _currentEntryName;
    private _status;
    story: StoryAsset | null;
    readonly entry: StoryEntry | null;
    constructor();
    next(): void;
    private _setEntry(name);
    private _getStatus(name?);
    private _getParentStatus();
    private _resolveCall(call);
    private _handleEntry();
    private _handleDialogue(entry);
    private _handleText(entry);
    private _handleChoice(entry);
    private _handleAmbient(entry);
    private _handleControl(entry);
}
