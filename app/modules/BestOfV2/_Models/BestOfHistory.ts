import AsyncStorage from "@react-native-async-storage/async-storage";
import { UserData } from "../../../config/constants";

class BestOfHistory {
  async set(bestof) {
    const original_bestofs = (await this.get()) || [];
    const key = UserData.getUserData().user_id;
    let new_bestofs;
    const existing_index = original_bestofs.findIndex(
      original_bestof =>
        original_bestof.bestof_data.bestof_id === bestof.bestof_data.bestof_id,
    );
    if (existing_index > -1) {
      original_bestofs[existing_index] = bestof;
      new_bestofs = original_bestofs;
    } else {
      new_bestofs = original_bestofs.concat(bestof);
    }
    await AsyncStorage.setItem(key, JSON.stringify(new_bestofs));
  }

  async clear() {
    const key = UserData.getUserData().user_id;
    await AsyncStorage.setItem(key, JSON.stringify([]));
  }

  async get() {
    const key = UserData.getUserData().user_id;
    return JSON.parse(await AsyncStorage.getItem(key));
  }
}

export default new BestOfHistory();
