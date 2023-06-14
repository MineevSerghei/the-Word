import Dexie from 'dexie';

export const db = new Dexie('Bibles');
db.version(1).stores({
    bibles: '++id, name, data'
})
