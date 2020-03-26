import React, {useState} from "react";
import SecondaryButton from "./buttons/SecondaryButton";
import AddForm from "./AddForm";

const ListFooter = (props) => {

    const [editMode, setEditMode] = useState(false);

    return (
        <>
            {editMode ? (
                <>
                    <AddForm form={`addTask${props.type}`} handleClose={() => {
                        setEditMode(false)
                    }}/>
                </>
            ) : (
                <SecondaryButton onClick={() => {
                    setEditMode(true)
                }}/>
            )}
        </>
    );
}

export default ListFooter;
