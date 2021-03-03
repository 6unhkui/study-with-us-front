export default class Pagination {
    constructor(page, size, direction) {
        this.page = page ? page : 1;
        this.size = size ? size : 6;
        this.direction = direction ? direction : 'ASC';
    }
}