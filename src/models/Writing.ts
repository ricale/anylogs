import Database from 'database';

type CreateParams = {
    content: string
    writtenAt?: number
}
function create(params: CreateParams) {
    Database.insert('writing', params);
}

function update() {

}

function remove() {

}

function find() {

}

type GetParams = {
    pageSize?: number
    page?: number
}
function get({
    pageSize,
    page,
}: GetParams = {}) {
    const limit = pageSize;
    const offset = (page || 0) * (pageSize || 0);
    Database.select('writing', { limit, offset });
}

const Writing = {
    create,
    update,
    remove,
    find,
    get,
}

export default Writing;
