export interface IUpload {
  maxFileSize?: number | undefined;
  isMultipleFile?: boolean | undefined;
  acceptTypeFile: TypeFile;
  functionUpload: (data: any) => void;
}

export interface IUploadInfo {
title: string;
nameFile: string;
urlTemplate: string;
buttonLabel?: string;
}

export enum TypeFile {
ALL = '*',
IMAGE = '.png, .jpg, .jpeg',
EXCEL = '.xlsx, .xls, .csv, .txt',
ONLY_EXCEL = '.xlsx, .xls',
PDF = '.pdf',
}
