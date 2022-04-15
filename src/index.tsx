import { getPreferenceValues, ActionPanel, Detail, List, Action } from "@raycast/api";

export interface Preferences {
  paperlessURL: string;
  apiToken: string;
}
const { paperlessURL }: Preferences = getPreferenceValues();
const { apiToken }: Preferences = getPreferenceValues();

export default function Command() {
  return (
    <List>
      <List.Item
        icon="list-icon.png"
        title="Hi there"
        actions={
          <ActionPanel>
            <Action.Push title="Show Details" target={<Detail markdown="# Hey!👋" />} />
          </ActionPanel>
        }
      />
    </List>
  );
}
