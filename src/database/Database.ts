import SQLite from 'react-native-sqlite-storage';

import { convertAllKeys, convertAllKeysToSnakeCase } from 'utils';
import Migrator from './Migrator';

import { AnylogsDatabase } from './types';

// SQLite.DEBUG(true);
SQLite.enablePromise(true);

const DATABASE_NAME = 'anylog';

let db: AnylogsDatabase;

async function init () {
    if(db) {
        return;
    }

    try {
        db = await SQLite.openDatabase({
            // name: `${DATABASE_NAME}.db`,
            name: `a`,
            location: 'default',
            createFromLocation: `~www/${DATABASE_NAME}.db`,
        });
        console.log('SQLite.openDatabase success');

    } catch(err) {
        console.error('SQLite.openDatabase error', err);
        throw err;
    }

    await Migrator.initAndMigrate(db);
}

async function query (
    statement: string,
    params?: any[] | undefined
) {
    try {
        console.log('call', statement);
        const result = await db.executeSql(statement, params);
        console.log(`%cquery`, 'color: dodgerblue;', statement, result);
        return result;
    } catch(err) {
        console.error(statement, err);
        throw err;
    }
}

async function insert (tableName: string, keyAndValue: Record<string, any>) {
    const converted = convertAllKeysToSnakeCase(keyAndValue);

    const keys = Object.keys(converted);
    const values = keys.map(key =>
        typeof converted[key] === 'number' ?
            converted[key] :
            `"${converted[key]}"`
    );

    const [ result ] = await query(
        `INSERT INTO ${tableName} (${keys.join(',')})`+
        ` VALUES (${values.join(',')});`
    );
    const { rowsAffected, insertId } = result;
    return {
        success: true,
        data: { id: insertId },
    };
};

async function find (tableName: string, id: number) {
    const [ result ] = await query(
        'SELECT *'+
        ` FROM ${tableName}`+
        ` WHERE id = ${id};`
    );
    return convertAllKeys(result.rows.item(0));
};

type SelectProps = {
    limit?: number
    offset?: number
    orderBy?: {
        field: string
        desc?: boolean
    }
}
async function select (
    tableName: string,
    {
        limit,
        offset,
        orderBy,
    }: SelectProps = {}
) {
    const limitClause = limit ? ` LIMIT ${limit}` : '';
    const offsetClause = offset ? ` OFFSET ${offset}` : '';
    const orderByClause = orderBy ? ` ORDER BY ${orderBy.field}${orderBy.desc?' DESC':' ASC'}` : '';

    const [ result ] = await query(
        `SELECT *`+
        ` FROM ${tableName}`+
        orderByClause+
        limitClause+
        offsetClause
    );
    const { rows } = result;
    const items = [...new Array(rows.length)].map((_,i) =>
        rows.item(i)
    );
    
    return convertAllKeys(items);
}

const Database = {
    init,
    query,

    insert,
    find,
    select,
};

export default Database;
