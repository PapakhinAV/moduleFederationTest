/* eslint-disable react/prop-types */
import React from 'react';
import { v4 as uuid } from 'uuid';
import styles from './styles.module.scss';

function ListBlock({ list }) {
    return (
        <div className={styles.block}>
            <ul className={styles.todoList}>
                {
                    list.map((el) => (
                        <li key={uuid()} className={styles.row}>
                            <div>{el.item}</div>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}

export default ListBlock;
