import { getPreferenceValues, showToast, Toast } from "@raycast/api";
import fetch from "node-fetch";
import { pngxFetchResponse } from "../pngxResponse.model";

export interface Preferences {
  paperlessURL: string;
  apiToken: string;
}

const { paperlessURL }: Preferences = getPreferenceValues();
const { apiToken }: Preferences = getPreferenceValues();

export const returnTodos = async (searchTerm: string): Promise<pngxFetchResponse> => {
  try {
    if (searchTerm != "") {
      const response = await fetch(
        `http://${paperlessURL}/api/documents/?query=${searchTerm}`, {
            headers: {'Authorization': `Token ${apiToken}`}
        }
      );
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const json: any = await response.json();
      return json.cards as pngxFetchResponse;
    } else {
      try {
        const response = await fetch(
          `http://${paperlessURL}/api/documents/`, {
            headers: {'Authorization': `Token ${apiToken}`}
        }
        );
        const json = await response.json();
        return json as pngxFetchResponse;
      } catch (error) {
        showToast(Toast.Style.Failure, "An error occured", "Could not fetch todos, check your credentials");
        return Promise.resolve([]);
      }
    }
  } catch (error) {
    showToast(Toast.Style.Failure, "An error occured", "Could not fetch todos, check your credentials");
    return Promise.resolve([]);
  }
};