import {getPreferenceValues, showToast, Toast, Cache} from '@raycast/api';
import fetch from 'node-fetch';
import {paperlessDocumentTagsResponse, paperlessDocumentTagsResults} from '../paperlessResponse.model';
import {Preferences} from './fetchDocuments';

const {paperlessURL}: Preferences = getPreferenceValues();
const {apiToken}: Preferences = getPreferenceValues();

const cache = new Cache();

export const fetchDocumentTags = async (): Promise<paperlessDocumentTagsResponse> => {
    try {
        const response = await fetch(
            `${paperlessURL}/api/tags/`, {
                headers: {'Authorization': `Token ${apiToken}`}
            }
        );
        const json = await response.json();
        const tags = json as paperlessDocumentTagsResponse;
        await cacheDocumentTags(tags.results);
        return tags;
    } catch (error) {
        showToast(Toast.Style.Failure, `Could not fetch documents tags ${error}`);
        return Promise.reject([]);
    }
};

export const cacheDocumentTags = async (value: paperlessDocumentTagsResults[]): Promise<paperlessDocumentTagsResults[]> => {
    cache.set('tags', JSON.stringify(value));
    return value;
};