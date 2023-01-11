import {
    List,
    Icon,
    ActionPanel,
    Action,
    getPreferenceValues,
} from '@raycast/api';
import {paperlessDocumentResults} from '../models/paperlessResponse.model';
import {Preferences} from '../models/preferences.model';
import {DocActions} from './DocActions';

const {paperlessURL}: Preferences = getPreferenceValues();

interface DocListItemProps {
    document: paperlessDocumentResults;
}

export const DocListItem = ({document}: DocListItemProps): JSX.Element => {
    return (
        <List.Item
            title={document.title}
            icon={Icon.Document}
            actions={
                <DocActions document={document}/>
            }
        />
    );
};