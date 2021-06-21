import VersionManager from "../../../app/VersionManager";

import { getValueFromConstants } from "../../_libs/helper_methods";

class Environment {
  set() {
    this.setByRemoteVersion();
  }

  async setByRemoteVersion() {
    const serverUrl = getValueFromConstants('PRODUCTION_SERVER_URL');
    const version_status = await VersionManager.getVersionStatusFromCLI(
      serverUrl,
    );
  }
}

export default new Environment();
