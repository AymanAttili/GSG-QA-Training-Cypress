import { AttachmentOptions, StatusDetails, StepResult, FixtureResult, TestResult, Status, Stage, ContentType } from './model';
export declare class ExecutableItemWrapper {
    private readonly info;
    constructor(info: FixtureResult | TestResult);
    protected get wrappedItem(): FixtureResult | TestResult;
    set name(name: string);
    set description(description: string);
    set descriptionHtml(descriptionHtml: string);
    set status(status: Status | undefined);
    get status(): Status | undefined;
    set statusDetails(details: StatusDetails);
    set detailsMessage(message: string);
    set detailsTrace(trace: string);
    set stage(stage: Stage);
    addParameter(name: string, value: string): void;
    addAttachment(name: string, options: ContentType | string | AttachmentOptions, fileName: string): void;
    startStep(name: string, start?: number): AllureStep;
    wrap(fun: (...args: unknown[]) => unknown): (...args: unknown[]) => unknown;
}
export declare class AllureStep extends ExecutableItemWrapper {
    private readonly stepResult;
    constructor(stepResult: StepResult, start?: number);
    endStep(stop?: number): void;
}
