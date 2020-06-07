

/**
 * Wrapper for Primise that can raise timeout error
 * @param s seconds before timeout
 * @param promise Promise to wrap
 */
export function timeout(s: number, promise: Promise<any>): Promise<any> {
    return new Promise(function(resolve, reject) {
        setTimeout(function() {
            reject(new Error('timeout'))
        }, s * 1000);
        promise.then(resolve, reject);
    });
}


/**
 * Standard CORS GET request
 * @param url URL
 * @param seconds timeout in seconds 
 */
export async function get(url: string, seconds: number = 1): Promise<Response> {
    // add loading?
    try {
        const resp = await timeout(seconds, fetch(url, {
            method: 'GET',
            mode: 'cors', // no-cors, cors, *same-origin
        }));
        return resp;
    } finally {
        // remove loading
    }
}