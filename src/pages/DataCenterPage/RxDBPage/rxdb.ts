import { addRxPlugin, createRxDatabase, dbCount, RxError } from 'rxdb';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { nStore } from 'src/utils/store';
import { notify } from 'src/utils/toaster';

addRxPlugin(RxDBDevModePlugin);

export const RxDB_prefixe = 'rxdb@';

export const createRxDexieDatabase = async (dbName: string) => {
  try {
    const prefixDBName = `${RxDB_prefixe}${dbName}`;

    if (await nStore.has(prefixDBName)) {
      notify(`「${dbName}」已经存在，不能重复创建`);
      return;
    }

    const db = await createRxDatabase({
      name: dbName,
      storage: getRxStorageDexie(),
    });
    await nStore.set(prefixDBName, db);
    await nStore.save();
    return db;
  } catch (e: any) {
    console.log((e as RxError).message, (e as RxError).code);

    notify((e as RxError).message, {
      position: 'bottom-right',
    });
  }
};
