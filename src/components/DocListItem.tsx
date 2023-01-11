import {
  List,
  Icon,
  ActionPanel,
  Action,
  getPreferenceValues,
} from '@raycast/api'
import {paperlessDocumentResults} from '../models/paperlessResponse.model';
import { Preferences } from '../models/preferences.model';

const { paperlessURL }: Preferences = getPreferenceValues();

interface DocListItemProps {
  result: paperlessDocumentResults
}

export const DocListItem = ({
  result,
}: DocListItemProps): JSX.Element => {
  return (
    <List.Item
      title={result.title}
      icon={Icon.TextDocument}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser
            url={`http://${paperlessURL}/documents/${result.id}`}
            title="Open in Browser"
          />
        </ActionPanel>
      }
    />
  )
}