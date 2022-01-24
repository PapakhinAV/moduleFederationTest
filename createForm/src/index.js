/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable no-console */
import './style.scss';
import { v4 as uuid } from 'uuid';

const block = document.querySelector('.block');

const form = document.createElement('div');
form.className = 'inputForm';

const message = document.createElement('div');
message.className = 'message';
message.textContent = 'Введите новую задачу';

const input = document.createElement('input');
input.className = 'inputField';

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
    if (response.ok) {
        input.value = '';
    } else {
        console.log('ERROR', response);
    }
}

const btn = document.createElement('button');
btn.className = 'btn';
btn.textContent = 'Добавить';
btn.onclick = () => addData(input.value);

form.append(message, input, btn);

block.append(form);
