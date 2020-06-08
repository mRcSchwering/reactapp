import { useState, useEffect } from 'react';
import { get } from '../requests';

const URL = 'https://hacker-news.firebaseio.com/v0/item/';


export default function useFetchHackerNewsData(queryId: number): { item: any } {
    const [data, setData] = useState({ item: null });

    useEffect(() => {
        async function fetchData() {
            const resp = await get(`${URL}${queryId}.json?print=pretty`);
            if (resp.ok){
                setData({item: await resp.json() });
            } else {
                setData({item: `Got ${resp.status} fetching data` });
            }
        }
        fetchData();
    }, [queryId]);

    return data;
}