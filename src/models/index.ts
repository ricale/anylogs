import { LocalStorage } from "utils";

namespace Model {
    const KEY_WRITING_IDS = 'writings.ids';
    const KEY_LAST_ID = 'writings.lastId';
    const KEY_WRITING = (id: string) => `writings:${id}`;

    let _writingIds: any[];
    let _writingLastId: string;

    async function getWritingIds() {
        if(_writingIds === undefined) {
            _writingIds = (await LocalStorage.getJson(KEY_WRITING_IDS)) || [];
        }
        return _writingIds;
    }

    async function addWritingId(id: string) {
        _writingIds.push(id);
        await LocalStorage.setJson(KEY_WRITING_IDS, _writingIds);
    }

    async function getLastId() {
        if(_writingLastId === undefined) {
            _writingLastId = (await LocalStorage.get(KEY_LAST_ID)) || `${0}`;
        }
        return _writingLastId;
    }

    async function getNewId() {
        return `${parseInt(await getLastId(),10)+1}`;
    }

    async function setLastId(id: string) {
        await LocalStorage.set(KEY_LAST_ID, id);
        _writingLastId = id;
    }

    async function save(writing: any) {
        await LocalStorage.setJson(KEY_WRITING(writing.id), writing);
    }

    async function get(id: string) {
        return await LocalStorage.getJson(KEY_WRITING(id));
    }

    export async function getWritings(page = 1, pageSize = 20) {
        const writingIds = await getWritingIds();
        const result = await Promise.all(
            [...Array(pageSize).keys()]
                .map(key => writingIds[key + (page - 1) * pageSize])
                .filter(id => !!id)
                .map(async (id) => await get(id))
        );
        console.log('getWritings writingIds', writingIds)
        console.log('getWritings result', result);
        return {
            data: result.filter(writing => !!writing),
            page,
            pageSize,
            totalCount: writingIds.length,
        }
    }

    export async function saveWriting(data: object): Promise<object>
    export async function saveWriting(id: string, data: object): Promise<object>
    export async function saveWriting(...args: any): Promise<object> {
        let id = (typeof args[0] === 'string') ? args[0] : await getNewId();
        const data = (typeof args[0] === 'string') ? args[1] : args[0];

        const writing = {id: id, ...data};

        console.log('saveWriting writing', writing);

        await addWritingId(id);
        await save(writing);
        await setLastId(id);

        return writing;
    }
}

export default Model;