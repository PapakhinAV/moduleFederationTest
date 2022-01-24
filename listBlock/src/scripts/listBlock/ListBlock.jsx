import React, { useState, useEffect } from 'react';
import './style.scss';

export function ListBlock() {
    async function getData() {
        const response = await fetch('http://127.0.0.1:4444');
        const result = await response.json();
        return result;
    }

    const [list, setList] = useState([]);
    useEffect(async () => {
        const result = await getData();
        setList(result);
    }, []);

    return (
        <div className="block">
            <ul className="todoList">
                {
                    list.map((el) => (
                        <li className="row">
                            <div>{el.item}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}
