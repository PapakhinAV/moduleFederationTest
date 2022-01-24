/* eslint-disable no-console */
import './style.scss';

const block = document.querySelector('.block');
const todoList = document.createElement('ul');
todoList.className = 'todoList';

async function getData() {
    const response = await fetch('http://127.0.0.1:4444');
    const result = await response.json();
    return result;
}
const result = await getData();

result.forEach(((element) => {
    const row = document.createElement('li');
    row.className = 'row';

    const todo = document.createElement('div');
    todo.className = 'inputField';
    todo.textContent = element.item;

    row.append(todo);
    todoList.append(row);
}));

block.append(todoList);
