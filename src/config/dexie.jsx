import Dexie from 'dexie';
const db = new Dexie("yssjcms");

// Declare tables, IDs and indexes
db.version(3).stores({
    friends: "++id, &name, age",
    news: "id, title, content"
});

export default db;
