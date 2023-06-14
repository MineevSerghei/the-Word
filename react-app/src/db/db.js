import Dexie from 'dexie';

export const db = new Dexie('Bibles');
db.version(1).stores({
    bibles: '++id, name, bible'
})

export async function addBible(name, bible) {
    try {
        await db.bibles.add({
            name,
            bible
        });
    } catch (e) {
        console.log('Failed to save to IndexDB: ', e)
    }
}
