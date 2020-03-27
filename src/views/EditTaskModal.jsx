import React, {useEffect} from "react";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import EditForm from "../components/EditForm";
import {getCurrentTask, updateTaskBody} from "../state/task_board/actions";
import {useParams} from "react-router-dom";

const useStyles = makeStyles(theme => ({
    paper: {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        minWidth: "600px",
        minHeight: "224px",
        backgroundColor: "#D4D4D4",
        border: "0px",
        borderRadius: "5px",
        padding: "16px",
        outline: 0
    },
}));

const EditTaskModal = ({currentTask, hideModal, updateTaskBody, getCurrentTask}) => {
    const classes = useStyles();

    let { id } = useParams();

    const task = {id: `item-${id}`};

    console.log(task);

    useEffect(()=> {
        getCurrentTask(task)
    }, [task]);

    const handleClose = () => {
        hideModal();
    };

    const handleSubmit = values => {
        console.log(values);
        const updatedTask = {...currentTask, body: values.body, header: values.header};
        updateTaskBody(updatedTask);
        hideModal();
    };

    return (
        <div>
            <Modal
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                open={true}
                onClose={handleClose}
            >
                <div className={classes.paper}>
                    <EditForm onSubmit={handleSubmit} handleClose={handleClose} task={currentTask}/>
                </div>
            </Modal>
        </div>
    );
};

const mapStateToProps = state => ({
    currentTask: state.task_board.currentTask
});

const mapDispatchToProps = dispatch => {
    return {
        updateTaskBody: (task) => dispatch(updateTaskBody(task)),
        getCurrentTask: (task) => dispatch(getCurrentTask(task))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditTaskModal);
