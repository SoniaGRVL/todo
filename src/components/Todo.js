import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from "@fortawesome/free-regular-svg-icons";


function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export default function Todo(props) {
    const [isEditing, setEditing] = useState(false);
    const [newName, setNewName] = useState('');

    const editFieldRef = useRef(null);
    const editButtonRef = useRef(null);

    const wasEditing = usePrevious(isEditing);

    function handleChange(e) {
        setNewName(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!newName.trim()) {
            return;
        }
        props.editTask(props.id, newName);
        setNewName("");
        setEditing(false);
    }

    const editingTemplate = (
        <li className="todo">
            <form className="todoEdit" onSubmit={handleSubmit}>
                <div className="editInput">
                    <input
                        id={props.id}
                        placeholder={props.name}
                        className="todoinput"
                        type="text"
                        value={newName}
                        onChange={handleChange}
                        ref={editFieldRef}
                    />
                </div>
                <div className="editBtn">

                    <button
                        type="button"
                        className="editBtnContent danger"
                        onClick={() => setEditing(false)}
                    >
                        <FontAwesomeIcon icon={faXmark} />
                    </button>
                    <button type="submit" className="editBtnContent">
                    <FontAwesomeIcon icon={faCheck} />
                    </button>
                </div>
            </form>
        </li>
    );

    const viewTemplate = (
        <li className="todo">
            <div className="todoContent">
                <input
                    id={props.id}
                    type="checkbox"
                    defaultChecked={props.completed}
                    onChange={() => props.toggleTaskCompleted(props.id)}
                />
                <label className="todoLabel" htmlFor={props.id}>
                    {props.name}
                </label>
                <div>
                    <button
                        type="button"
                        className="todoBtn"
                        onClick={() => setEditing(true)}
                        ref={editButtonRef}
                    >
                        <FontAwesomeIcon icon={faPen} />
                    </button>
                    <button
                        type="button"
                        className="todoBtn danger"
                        onClick={() => props.deleteTask(props.id)}
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            </div>
        </li>
    );


    useEffect(() => {
        if (!wasEditing && isEditing) {
            editFieldRef.current.focus();
        }
        if (wasEditing && !isEditing) {
            editButtonRef.current.focus();
        }
    }, [wasEditing, isEditing]);


    return (isEditing ? editingTemplate : viewTemplate);
}