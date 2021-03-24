import { ResultSet } from 'react-native-sqlite-storage';

import { AnylogsDatabase, Transaction } from './types';

class Migration {
    version: number
    sqls: string[]

    constructor(version: number, sqls: string | string[]) {
        this.version = version;
        this.sqls = typeof sqls === 'string' ? [sqls] : sqls;

        console.log('Migration', {version: this.version, sqls: this.sqls})
    }

    _executeSqls = async (txn: Transaction, result: ResultSet) => {
        const promises = !result.rows.length ? this.sqls.map(s => txn.executeSql(s)) : []
        await Promise.all([
            ...promises,
            txn.executeSql('INSERT INTO executed_migration (migration) VALUES (:migration)', [this.version]),
        ]);
    }

    execute = (
        db: AnylogsDatabase,
        success: () => void,
        failure: (err?: any) => void,
    ) => {
        console.log('Migration.execute', this.version);
        db.transaction(
            txn => {
                const q1 = (
                    'SELECT migration'+
                    ' FROM executed_migration'+
                    ' WHERE migration=:migration;'
                );
                txn.executeSql(
                    q1,
                    [this.version],
                    (tx, result) => {
                        this._executeSqls(tx, result)
                            .then(success)
                            .catch(failure)
                    },
                    failure
                );
            },
        )
    }
}

export default Migration;