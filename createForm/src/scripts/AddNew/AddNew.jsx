import React, { useState, useEffect } from 'react'
import styles from './styles.module.scss';
import { v4 as uuid } from 'uuid';


const AddNew = ({ setList }) => {

    useEffect(() => {
        let isMounted = true
        return isMounted = false
    }, [])

    async function addData(data) {
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
        const result = await response.json()
        if (result) {
            setList(result);
        } else {
            console.log('ERROR', response);
        }
        setInputText('');
    }

    const [inputText, setInputText] = useState('')

    function handlerInput(e) {
        setInputText(e.target.value)
    }

    function handlerButton() {
        addData(inputText, setInputText)
    }

    return (
        <div className={styles.block}>
            <div className={styles.inputForm}>
                <div className={styles.message}>Введите новую задачу</div>
                <input value={inputText} onChange={(e) => { handlerInput(e) }} className={styles.inputField} type="text" />
                <button onPointerDown={() => { handlerButton() }} className={styles.btn}>Добавить</button>
            </div>
        </div >
    )
}

export default AddNew
