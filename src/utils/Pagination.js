export default class Pagination {
    constructor(page = 1, size = 6, direction = "ASC") {
        this.page = page;
        this.size = size;
        this.direction = direction;
    }
}
