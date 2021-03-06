"use strict";

export interface Message {
    subject: string;
    data: any;
}

export interface Receiver {
    friendlyName: string;
    address: string;
    port: number;
    currentApp: string;
}

export interface DownloadDelta {
    id: number;
    url?: browser.downloads.StringDelta;
    filename?: browser.downloads.StringDelta;
    danger?: browser.downloads.StringDelta;
    mime?: browser.downloads.StringDelta;
    startTime?: browser.downloads.StringDelta;
    endTime?: browser.downloads.StringDelta;
    state?: browser.downloads.StringDelta;
    canResume?: browser.downloads.BooleanDelta;
    paused?: browser.downloads.BooleanDelta;
    error?: browser.downloads.StringDelta;
    totalBytes?: browser.downloads.DoubleDelta;
    fileSize?: browser.downloads.DoubleDelta;
    exists?: browser.downloads.BooleanDelta;
}
