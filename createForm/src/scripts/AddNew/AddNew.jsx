import React, { useState } from 'react'
import './style.scss';
import { v4 as uuid } from 'uuid';


export const AddNew = () => {

    async function addData(data, clear) {
        const reqData = {
            id: uuid(),
            item: data,
        };
        const response = await fetch('http://127.0.0.1:4444', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reqData),
        });
        if (response.ok) {
            clear('');
        } else {
            console.log('ERROR', response);
        }
    }

    const [inputText, setInputText] = useState('')

    function handlerInput(e) {
        setInputText(e.target.value)
    }

    function handlerButton() {
        console.log('presss');
        addData(inputText, setInputText)
    }
    return (
        <div className='block'>
            <div className='inputForm'>
                <div className='message'>Введите новую задачу</div>
                <input value={inputText} onChange={(e) => { handlerInput(e) }} className='inputField' type="text" />
                <button onPointerDown={() => { handlerButton() }} className='btn'>Добавить</button>
            </div>
        </div >
    )
}
