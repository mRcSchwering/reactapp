import React, { useState } from 'react';
import { useGlobal } from 'reactn';
import { Form, Button } from 'react-bootstrap';
import useFetchHackerNewsData from '../hooks/useFetchHackerNewsData';
 

export default function HomePage() {
    const setErrorModal = useGlobal('errorModal')[1];
    const [query, setQuery] = useState(8863);
    const data = useFetchHackerNewsData(query);

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