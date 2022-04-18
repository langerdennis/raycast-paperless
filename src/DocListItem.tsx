import {
  List,
  Icon,
  ActionPanel,
  Action,
  getPreferenceValues,
} from '@raycast/api'
import { paperlessResults } from './paperlessResponse.model'

interface DocListItemProps {
  result: paperlessResults
}

export const DocListItem = ({
  result,
}: DocListItemProps): JSX.Element => {
  const actions = {
    documentPage: (
      <Action.OpenInBrowser
        key="docUrl"
        url={`https://bild.de`}
        icon={{
          source: 'command-icon.png',
        }}
      />
    ),
  }

  return (
    <List.Item
      id={result.id}
      title={result.title}
      icon={Icon.ArrowRight}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser
            url={`https://www.bild.de`}
            title="Paperless Search Results"
          />
        </ActionPanel>
      }
    />
  )
}