/// <reference types="node" />
import { AttachmentOptions, Category, Status, ContentType } from './model';
import { AllureTest } from './AllureTest';
import { ExecutableItemWrapper } from './ExecutableItemWrapper';
import { AllureRuntime } from './AllureRuntime';
export declare abstract class Allure {
    protected runtime: AllureRuntime;
    protected abstract get currentTest(): AllureTest;
    protected abstract get currentExecutable(): ExecutableItemWrapper;
    protected constructor(runtime: AllureRuntime);
    epic(epic: string): void;
    feature(feature: string): void;
    story(story: string): void;
    suite(name: string): void;
    parentSuite(name: string): void;
    subSuite(name: string): void;
    label(name: string, value: string): void;
    parameter(name: string, value: string): void;
    link(url: string, name?: string, type?: string): void;
    issue(name: string, url: string): void;
    tms(name: string, url: string): void;
    description(markdown: string): void;
    descriptionHtml(html: string): void;
    abstract attachment(name: string, content: Buffer | string, options: ContentType | string | AttachmentOptions): void;
    owner(owner: string): void;
    severity(severity: string): void;
    tag(tag: string): void;
    writeEnvironmentInfo(info: Record<string, string>): void;
    writeCategoriesDefinitions(categories: Category[]): void;
    abstract logStep(name: string, status?: Status): void;
    abstract step<T>(name: string, body: (step: StepInterface) => unknown): T;
    createStep(name: string, stepFunction: Function): (...args: unknown[]) => unknown;
    createAttachment(name: string, content: Buffer | string | Function, type: ContentType): ((...args: unknown[]) => void) | undefined;
}
export interface StepInterface {
    parameter(name: string, value: string): void;
    name(name: string): void;
}
