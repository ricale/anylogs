import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

SQLite.enablePromise(true);

const DATABASE_NAME = 'anylog';

let db: SQLiteDatabase;

async function init () {
    db = await SQLite.openDatabase({
        name: `${DATABASE_NAME}.db`,
        location: 'default',
    });
}

async function insert (tableName: string, keyAndValue: Record<string, any>) {
    console.log('Database.insert');

    const keys = Object.keys(keyAndValue);
    const values = keys.map(key =>
        typeof keyAndValue[key] === 'number' ?
            keyAndValue[key] :
            `"${keyAndValue[key]}"`
    );
    return await db.executeSql(
        `INSERT INTO ${tableName} (${keys.join(',')})
        VALUES (${values.join(',')});`
    );
};

async function find (tableName: string, id: number) {
    console.log('Database.find')
    return await db.executeSql(
        `SELECT *
        FROM ${tableName}
        WHERE id = ${id};`
    );
};

type SelectProps = {
    limit?: number
    offset?: number
}
async function select (tableName: string, {
    limit,
    offset
}: SelectProps = {}) {
    console.log('Database.select')
    const limitClause = limit ? ` LIMIT ${limit}` : '';
    const offsetClause = limit ? ` OFFSET ${offset}` : '';
    return await db.executeSql(
        `SELECT *`+
        ` FROM ${tableName}`+
        limitClause+
        offsetClause
    );
}

const Database = {
    init,
    insert,
    find,
    select,
};

export default Database;
