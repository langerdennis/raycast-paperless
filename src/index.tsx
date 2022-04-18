import { List } from "@raycast/api";
import { useState } from 'react'
import { paperlessFetchResponse } from "./paperlessResponse.model";
import { fetchDocuments } from './utils/fetchDocuments'
import { DocListItem } from './DocListItem'

export default function DocumentList() {
  const [results, setResults] = useState<paperlessFetchResponse>()
  const [loading, setLoading] = useState<boolean>(false)

  const onSearchTextChange = async (text: string) => {
    setLoading(true)
    const response = await fetchDocuments(text.replace(/\s/g, '+'))
    setResults(response)
    setLoading(false)
  }

  return (
    <List
    isLoading={loading}
    searchBarPlaceholder={`Search documents, like "Steuer"…`}
    onSearchTextChange={onSearchTextChange}
    throttle
  >
      {results?.results.length
        ? results.results.map((result) => {
            return <DocListItem key={result.id} result={result} />
          })
        : null}
    </List>
  );
}