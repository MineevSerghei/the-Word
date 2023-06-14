import Dexie from 'dexie';

export const db = new Dexie('Bibles');
db.version(1).stores({
    bibles: '++id, version'
})

export async function addBible(version, bible) {
    try {
        await db.bibles.add({
            version,
            bible
        });
    } catch (e) {
        console.log('Failed to save to IndexDB: ', e)
    }
}
