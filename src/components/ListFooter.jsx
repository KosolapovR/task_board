import React, {useState} from "react";
import SecondaryButton from "./buttons/SecondaryButton";
import AddForm from "./AddForm";
import {connect} from "react-redux";
import {addCompletedTask, addInWorkTask, addOnCheckTask} from "../state/task_board";

const ListFooter = ({type, addInWorkTask, addOnCheckTask, addCompletedTask}) => {

    const [editMode, setEditMode] = useState(false);

    const submit = ({taskHeader}) => {

        if (taskHeader) {
            switch (type) {
                case 'inWork': {
                    addInWorkTask(taskHeader);
                    setEditMode(false);
                    break;
                }
                case 'onCheck': {
                    addOnCheckTask(taskHeader);
                    setEditMode(false);
                    break;
                }
                case 'completed': {
                    addCompletedTask(taskHeader);
                    setEditMode(false);
                    break;
                }
                default: {
                    break;
                }

            }
        }
    };

    return (
        <>
            {editMode ? (
                <>
                    <AddForm form={`addTask${type}`} onSubmit={submit} handleClose={() => {
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
};

const mapStateToProps = state => ({
    state
});

const mapDispatchToProps = dispatch => ({
    addInWorkTask: (header) => dispatch(addInWorkTask(header)),
    addOnCheckTask: (header) => dispatch(addOnCheckTask(header)),
    addCompletedTask: (header) => dispatch(addCompletedTask(header))
});

export default connect(mapStateToProps, mapDispatchToProps)(ListFooter);
