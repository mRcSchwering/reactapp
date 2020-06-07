import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import { Form, Button } from 'react-bootstrap';
import { get } from '../requests';


export default function HomePage() {
    const setErrorModal = useGlobal('errorModal')[1];
    const [data, setData] = useState({ item: null });
    const [query, setQuery] = useState(8863);

    useEffect(() => {
        async function fetchData() {
            const resp = await get(`https://hacker-news.firebaseio.com/v0/item/${query}.json?print=pretty`);
            if (resp.ok){
                setData({item: await resp.json() });
            } else {
                setData({item: `Got ${resp.status} fetching data` });
            }
        }
        fetchData();
    }, [query]);

    function handleInputChange(event: React.FormEvent<HTMLInputElement>) {
        setQuery(event.target.value);
    }

    function handleShowErrorModal() {
        setErrorModal({show: true, message: 'triggered modal'});
    }

    return (
        <div>
            <h2>Home Page</h2>
            <h4>Response</h4>
            <div style={{width: "200px", margin: "auto"}}>
                <Form.Control type="number" value={query} onChange={handleInputChange} />
            </div>
            <div>{JSON.stringify(data)}</div>
            <Button onClick={handleShowErrorModal}>show error modal</Button>
        </div>
    );
}