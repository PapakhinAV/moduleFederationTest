import React, { useState, useEffect } from "react"
import styles from './styles.module.scss'


export const MainPage = () => {
    const ListBlock = React.lazy(() => import("containerNameList/ListBlock"));
    const AddNew = React.lazy(() => import("containerNameForm/AddNew"));

    async function getData() {
        const response = await fetch('http://127.0.0.1:4444');
        const result = await response.json();
        return result;
    }

    const [list, setList] = useState([])

    useEffect(async () => {
        const result = await getData();
        setList(result);
    }, []);


    return (
        <React.Suspense fallback="Loading...">
            <div className={styles.mainBlock}>
                <AddNew setList={setList} />
                <ListBlock list={list} />
            </div>
        </React.Suspense>

    )
}
