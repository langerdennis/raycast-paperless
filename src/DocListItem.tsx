import {
  List,
  Icon,
  ActionPanel,
  Action,
  getPreferenceValues,
} from '@raycast/api'
import { paperlessResults } from './paperlessResponse.model'

export interface Preferences {
  paperlessURL: string;
  apiToken: string;
}

const { paperlessURL }: Preferences = getPreferenceValues();

interface DocListItemProps {
  result: paperlessResults
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