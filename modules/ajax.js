class Ajax {
    /**
     * GET запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    get(url, callback) {
        this._request(url, { method: "GET" }, callback);
    }

    /**
     * POST запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для отправки
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    post(url, data, callback) {
        this._request(
            url,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            },
            callback,
        );
    }

    /**
     * PATCH запрос
     * @param {string} url - Адрес запроса
     * @param {object} data - Данные для обновления
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    patch(url, data, callback) {
        this._request(
            url,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            },
            callback,
        );
    }

    /**
     * DELETE запрос
     * @param {string} url - Адрес запроса
     * @param {function} callback - Функция обратного вызова (data, status)
     */
    delete(url, callback) {
        this._request(url, { method: "DELETE" }, callback);
    }

    async _request(url, options, callback) {
        try {
            const response = await fetch(url, options);
            const data = await this._parseResponse(response);
            callback(data, response.status);
        } catch (e) {
            console.error("Ошибка запроса:", e);
            callback({ error: "Не удалось подключиться к серверу." }, 0);
        }
    }

    async _parseResponse(response) {
        const text = await response.text();

        if (!text) {
            return null;
        }

        try {
            return JSON.parse(text);
        } catch (e) {
            console.error("Ошибка парсинга JSON:", e);
            return null;
        }
    }
}

export const ajax = new Ajax();
