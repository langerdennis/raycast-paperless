import {List} from '@raycast/api';
import {useState} from 'react';
import {
    paperlessCorrespondentsResponse,
    paperlessDocumentResults,
    paperlessDocumentTagsResponse,
    paperlessDocumentTypesResponse,
    paperlessFetchResponse
} from './models/paperlessResponse.model';
import {fetchDocuments} from './utils/fetchDocuments';
import {DocListItem} from './components/DocListItem';
import {fetchDocumentTags} from './utils/fetchDocumentTags';
import {fetchDocumentTypes} from './utils/fetchDocumentTypes';
import {fetchCorrespondents} from './utils/fetchCorrespondents';

export default function DocumentList() {
    const [results, setResults] = useState<paperlessFetchResponse>();
    const [tags, setTags] = useState<paperlessDocumentTagsResponse>();
    const [types, setTypes] = useState<paperlessDocumentTypesResponse>();
    const [correspondents, setCorrespondents] = useState<paperlessCorrespondentsResponse>();
    const [loading, setLoading] = useState<boolean>(false);

    const onSearchTextChange = async (text: string) => {
        setLoading(true);
        const response = await fetchDocuments(text.replace(/\s/g, '+'));
        setResults(response);
        const documentResponse = await fetchDocuments(text.replace(/\s/g, '+'));
        setResults(documentResponse);
        const documentTagsResponse = await fetchDocumentTags();
        setTags(documentTagsResponse);
        const documentTypesResponse = await fetchDocumentTypes();
        setTypes(documentTypesResponse);
        const correspondentsResponse = await fetchCorrespondents();
        setCorrespondents(correspondentsResponse);
        setLoading(false);
    };

    const getCorrespondent = (doc: paperlessDocumentResults) => {
        if (correspondents) {
            const correspondent = correspondents.results.find((correspondent) => correspondent.id === doc.correspondent);
            return correspondent?.name;
        } else {
            return '';
        }
    };

    const getDocumentType = (doc: paperlessDocumentResults) => {
        if (types) {
            const type = types.results.find((type) => type.id === doc.document_type);
            return type?.name;
        } else {
            return '';
        }

    };

    const stringifyTags = (doc: paperlessDocumentResults) => {
        // Returns a string of all tags for a document
        if (tags) {
            const tagNames = doc.tags.map((tag) => {
                const tagName = tags.results.find((tagResult) => tagResult.id === tag);
                return tagName?.name;
            });
            return tagNames?.join(', ');
        }
    };

    return (
        <List
            isLoading={loading}
            isShowingDetail={true}
            searchBarPlaceholder={`Search documents, like "Steuer"…`}
            onSearchTextChange={onSearchTextChange}
            throttle
        >
            {results?.results.length
                ? results.results.map((document) => {
                    return <DocListItem
                        key={document.id}
                        document={document}
                        type={getDocumentType(document)}
                        correspondent={getCorrespondent(document)}
                        tags={stringifyTags(document)}/>;
                })
                : null}
        </List>
    );
}