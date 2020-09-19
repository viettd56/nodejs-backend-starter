import axios, { AxiosRequestConfig } from 'axios';

export interface RequestInterface extends AxiosRequestConfig {
    query?: any;
}

function request(request: RequestInterface): Promise<any> {
    let configOption: AxiosRequestConfig;
    return new Promise(async (resolve, reject) => {
        try {
            const injectHeaders = {};
            const headers = request.headers || {};

            configOption = {
                url: request.url,
                method: request.method,
                validateStatus: () => true,
                headers: {
                    ...injectHeaders,
                    ...headers,
                },
                params: request.params,
                data: request.data,
                auth: request.auth,
            };

            if (request.timeout) {
                configOption.timeout = request.timeout;
            }

            if (request.query) {
                configOption.params = request.query;
            }

            await axios(configOption).then(function (response) {
                if (!(response.status >= 200 && response.status < 300)) {
                    throw new Error(`${request.method} ${request.url} status: ${response.status}`);
                }
                return resolve(response.data);
            });
        } catch (err) {
            return reject(err);
        }
    });
}

export const MakeRequestHelper = {
    request,
};
