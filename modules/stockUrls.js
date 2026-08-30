class StockUrls {
    constructor() {
        this.baseUrl = window.location.origin;
    }

    getStocks(title = '') {
        const url = new URL(`${this.baseUrl}/stocks`);

        if (title) {
            url.searchParams.set('title', title);
        }

        return url.toString();
    }

    getStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    createStock() {
        return `${this.baseUrl}/stocks`;
    }

    removeStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }

    updateStockById(id) {
        return `${this.baseUrl}/stocks/${id}`;
    }
}

export const stockUrls = new StockUrls();
