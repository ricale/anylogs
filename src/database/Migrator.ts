import Migration from './Migration';
import { AnylogsDatabase, Transaction } from './types';
import migrations from './migrations';
import { ResultSet } from 'react-native-sqlite-storage';

let _db: AnylogsDatabase;
let _currentVersion: number | undefined;
let _migrationsMap: Record<number, Migration>
let _versions: number[]
let _cursor: number

async function _initializeMigrationTables (txn: Transaction, result: ResultSet) {
    if(!result.rows.length) {
        await Promise.all([
            txn.executeSql('CREATE TABLE IF NOT EXISTS version (version INTEGER)'),
            txn.executeSql('CREATE INDEX IF NOT EXISTS version_idx ON version (version)'),
            txn.executeSql('INSERT INTO version (version) VALUES (:version)', [0]),
            txn.executeSql('CREATE TABLE IF NOT EXISTS executed_migration (migration INTEGER)'),
            txn.executeSql('CREATE INDEX IF NOT EXISTS migration_idx ON executed_migration (migration);'),
        ]);
        _currentVersion = 0;

    } else {
        const [_, res] = await txn.executeSql('SELECT version FROM version LIMIT 1', []);
        _currentVersion = res.rows.item(0).version;
    }
}

function _initialize() {
    return new Promise<void>((resolve, reject) => {
        _db.transaction(txn => {
            const sql = (
                'SELECT name'+
                ' FROM sqlite_master'+
                ' WHERE type=\'table\''+
                '  AND name=:name'
            );
            txn.executeSql(
                sql,
                ['version'],
                (tx, result) => {
                    _initializeMigrationTables(tx, result)
                        .then(resolve)
                        .catch(reject);
                },
                (err) => {
                    console.log('Migrator.initialize error', err);
                    reject(err);
                }
            );
        });
    })
}

async function init(db: AnylogsDatabase) {
    _db = db;

    _versions = [];
    _cursor = 0;
    _migrationsMap = migrations.reduce((acc: Record<number, Migration>, sql, i) => {
        const version = i + 1;
        acc[version] = new Migration(version, sql);
        _versions.push(version);

        return acc;
    }, {});

    await _initialize();
}

function _next(
    success: () => void,
    failure: (err?: any) => void
) {
    try {
        if(_versions[_cursor]) {
            const next = _versions[_cursor];
            _migrationsMap[next].execute(
                _db,
                () => {
                    _currentVersion = _versions[_cursor];
                    _cursor += 1;
                    _next(success, failure);
                },
                failure,
            );

        } else {
            _cursor = 0;
            _db.executeSql(
                'UPDATE version SET version = :version',
                [_currentVersion],
                success,
                failure,
            );
        }

    } catch(err) {
        failure(err);
    }
}

async function migrate() {
    if(_currentVersion === undefined) {
        return;
    }

    if(_cursor === 0) {
        const verIndex = _versions.findIndex(ver => ver > (_currentVersion || 0));
        _cursor = verIndex === -1 ? _versions.length : verIndex;
    }

    return new Promise<void>(_next)
}

async function initAndMigrate (db: AnylogsDatabase) {
    await init(db);
    await migrate();
}

const Migrator = {
    init,
    migrate,
    initAndMigrate,
}

export default Migrator;
