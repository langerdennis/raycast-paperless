import {getPreferenceValues, showToast, Toast} from '@raycast/api';
import fetch from 'node-fetch';
import {paperlessFetchResponse} from '../paperlessResponse.model';
import {Preferences} from '../preferences.model';

const {paperlessURL}: Preferences = getPreferenceValues();
const {apiToken}: Preferences = getPreferenceValues();

export const fetchDocuments = async (
    searchTerm = '',
): Promise<paperlessFetchResponse> => {
    try {
        const response = await fetch(
            `${paperlessURL}/api/documents/?query=${searchTerm}`, {
                headers: {'Authorization': `Token ${apiToken}`}
            }
        );
        const json = await response.json();
        return json as paperlessFetchResponse;
    } catch (error) {
        showToast(Toast.Style.Failure, `Could not fetch documents ${error}`);
        return Promise.reject([]);
    }
};