/// <reference types="node" />
import { AttachmentOptions, Category, ContentType, TestResult, TestResultContainer } from './model';
import { IAllureConfig } from './AllureConfig';
import { AllureGroup } from './AllureGroup';
export declare class AllureRuntime {
    private config;
    private writer;
    constructor(config: IAllureConfig);
    startGroup(name?: string): AllureGroup;
    writeResult(result: TestResult): void;
    writeGroup(result: TestResultContainer): void;
    writeAttachment(content: Buffer | string, options: ContentType | string | AttachmentOptions): string;
    writeEnvironmentInfo(info?: Record<string, string>): void;
    writeCategoriesDefinitions(categories: Category[]): void;
}
