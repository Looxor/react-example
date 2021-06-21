import { storage, storage_const } from "../../utils/firebase";

const storageUpload = async ({
  local_file_path,
  storage_path,
  onComplete = downloadUrl => {},
  onError = error => {},
  onRunning = ({bytesTransferred, totalBytes}) => {},
}) => {
  try {
    let completeCallbackCalled = false;
    storage()
      .ref(storage_path)
      .putFile(local_file_path)
      .on(
        storage_const.TaskEvent.STATE_CHANGED,
        async snapshot => {
          if (snapshot.state === storage_const.TaskState.SUCCESS) {
            const downloadUrl = await snapshot.ref.getDownloadURL();
            if (!completeCallbackCalled) {
              onComplete(downloadUrl);
              completeCallbackCalled = true;
            }
          } else if (snapshot.state === storage_const.TaskState.RUNNING) {
            onRunning({
              bytesTransferred: snapshot.bytesTransferred,
              totalBytes: snapshot.totalBytes,
            });
          }
        },
        error => {
          onError(error);
        },
      );
  } catch (error) {
    return error;
  }
};

const storageReadText = async storage_path => {
  return new Promise((resolve, reject) => {
    storage()
      .ref(storage_path)
      .getDownloadURL()
      .then(async url => {
        const request = await fetch(url);
        resolve(await request.text());
      })
      .catch(error => reject(error));
  });
};

const storageReadJson = async (
  storage_path,
  secondaryAppName = '',
): Promise<any> => {
  return new Promise((resolve, reject) => {
    storage()
      .ref(storage_path)
      .getDownloadURL()
      .then(async url => {
        const request = await fetch(url);
        resolve(await request.text());
      })
      .catch(error => reject(error));
  });
};

export {storageUpload, storageReadJson, storageReadText};
