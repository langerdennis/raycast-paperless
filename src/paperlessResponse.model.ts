export type paperlessFetchResponse = paperlessResultModel;

export interface paperlessResultModel {
  count: number
  next?: string
  previous?: string
  results: paperlessResults[]
}

export interface paperlessResults {
  id: number
  correspondent?: string
  document_type?: string
  title: string
  content: string
  tags: number[]
  created: string
  modified: string
  added: string
  archive_serial_number?: string
  original_file_name: string
  archived_file_name: string
  __search_hit__: SearchHit
}

export interface SearchHit {
  score: number
  highlights: string
  rank: number
}