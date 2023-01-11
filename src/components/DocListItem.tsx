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
import {DocItem} from '../models/docItem.model';
import moment from 'moment';

const {paperlessURL}: Preferences = getPreferenceValues();
const {dateFormat}: Preferences = getPreferenceValues();

const formatDateTime = (date: string): string => {
    console.log(date);
    return moment(date).format(dateFormat).toString();
}

export const DocListItem = ({document, type, tags, correspondent}: DocItem): JSX.Element => {
    return (
        <List.Item
            title={document.title}
            icon={Icon.Document}
            detail={
                <List.Item.Detail
                    metadata={
                        <List.Item.Detail.Metadata>
                            <List.Item.Detail.Metadata.Label title="Type" text={type}/>
                            <List.Item.Detail.Metadata.Label title="Correspondent" text={correspondent}/>
                            <List.Item.Detail.Metadata.Label title="Tags" text={tags}/>
                            <List.Item.Detail.Metadata.Separator/>
                            <List.Item.Detail.Metadata.Label title="Added" text={formatDateTime(document.added)}/>
                            <List.Item.Detail.Metadata.Label title="Created" text={formatDateTime(document.created)}/>
                            <List.Item.Detail.Metadata.Label title="Modified" text={formatDateTime(document.modified)}/>
                        </List.Item.Detail.Metadata>
                    }
                />
            }
            actions={
                <DocActions document={document}/>
            }
        />
    );
};