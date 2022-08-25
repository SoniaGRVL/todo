import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function Form(props) {
    const [name, setName] = useState('');


    function handleSubmit(e) {
        e.preventDefault();
        if (!name.trim()) {
            return;
        }
        props.addTask(name);
        setName("");
    }


    function handleChange(e) {
        setName(e.target.value);
    }

    return (
        <form className="addTask" onSubmit={handleSubmit}>
            <input
                type="text"
                id="new-todo-input"
                className="inputAdd"
                name="text"
                autoComplete="off"
                value={name}
                onChange={handleChange}
            />
            <button type="submit" className="btnAdd">
                <FontAwesomeIcon icon={faPlus} />
            </button>
        </form>
    );
}

export default Form;