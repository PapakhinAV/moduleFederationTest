import './style.scss';

console.log('hi');

const arr = [1, 2, [3, 4, [5, 6]]];

const newArr = arr.flat(2);

console.log(newArr);
