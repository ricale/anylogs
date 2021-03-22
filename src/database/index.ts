import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

import { convertAllKeys, convertAllKeysToSnakeCase } from 'utils';

// SQLite.DEBUG(true);
SQLite.enablePromise(true);

const DATABASE_NAME = 'anylog';

let db: SQLiteDatabase;

async function query (statement: string, params?: any[] | undefined) {
    console.log(`%cquery`, 'color: dodgerblue;', statement);
    return await db.executeSql(statement, params);
}

async function init () {
    db = await SQLite.openDatabase({
        // name: `${DATABASE_NAME}.db`,
        name: `a`,
        location: 'default',
        createFromLocation: `~www/${DATABASE_NAME}.db`,
    },
    () => {console.log('openDatabase success')},
    (err) => {console.log('openDatabase failed', err)});
}

async function insert (tableName: string, keyAndValue: Record<string, any>) {
    const converted = convertAllKeysToSnakeCase(keyAndValue);

    const keys = Object.keys(converted);
    const values = keys.map(key =>
        typeof converted[key] === 'number' ?
            converted[key] :
            `"${converted[key]}"`
    );

    const result = await query(
        `INSERT INTO ${tableName} (${keys.join(',')})
        VALUES (${values.join(',')});`
    );
    const { rowsAffected, insertId } = result[0];
    return {
        success: true,
        data: { id: insertId },
    };
};

async function find (tableName: string, id: number) {
    return await query(
        `SELECT *
        FROM ${tableName}
        WHERE id = ${id};`
    );
};

type SelectProps = {
    limit?: number
    offset?: number
}
async function select (
    tableName: string,
    {
        limit,
        offset
    }: SelectProps = {}
) {
    const limitClause = limit ? ` LIMIT ${limit}` : '';
    const offsetClause = limit ? ` OFFSET ${offset}` : '';

    const result = await query(
        `SELECT *`+
        ` FROM ${tableName}`+
        limitClause+
        offsetClause
    );
    const { rows } = result[0];
    const items = [...new Array(rows.length)].map((_,i) =>
        rows.item(i)
    );
    
    return convertAllKeys(items);
}

const Database = {
    init,
    insert,
    find,
    select,
};

export default Database;
