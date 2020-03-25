import React from 'react';
import SecondaryButton from "./buttons/SecondaryButton";
import PrimaryButton from "./buttons/PrimaryButton";

function ListFooter({editMode = false}) {
    return (
        <>
            {editMode ? (<PrimaryButton/>) : (<SecondaryButton/>)}
        </>
    );
}

export default ListFooter;