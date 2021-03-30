import Database from 'database';

const DEFAULT_PAGE_SIZE = 10;

type CreateParams = {
    content: string
    writtenAt?: number
}
async function create(params: CreateParams) {
    const createdAt = new Date().getTime();
    const result = await Database.insert('writing', {
        ...params,
        createdAt,
        updatedAt: createdAt,
    });
    if(!result.success) {
        return null;
    }
    const created = await Database.find('writing', result.data.id);
    return created;
}

function update() {

}

function remove() {

}

async function find(id: number) {
    const result = await Database.find('writing', id);
    return result;
}

type GetParams = {
    pageSize?: number
    page?: number
}
async function get({
    pageSize: _pageSize,
    page: _page,
}: GetParams = {}) {
    const pageSize = _pageSize || DEFAULT_PAGE_SIZE;
    const page = _page || 0;

    const limit = pageSize;
    const offset = (page || 0) * (pageSize || 0);
    const result = await Database.select('writing', {
        limit,
        offset,
        orderBy: { field: 'id', desc: true }
    });

    return {
        pageSize,
        page,
        data: result.map(res => ({
            ...res,
            writtenAt: res.writtenAt ? new Date(res.writtenAt) : null,
            createdAt: new Date(res.createdAt),
            updatedAt: new Date(res.updatedAt),
        })),
    };
}

const Writing = {
    create,
    update,
    remove,
    find,
    get,
};

export default Writing;
