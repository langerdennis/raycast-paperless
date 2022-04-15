export type pngxFetchResponse = pngxResultModel[];

export interface pngxResultModel {
  id: string;
  correspondent: string;
  document_type: string;
  title: string;
  created: string;
}

export interface Label {
  name: string;
}