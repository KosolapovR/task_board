import React from "react";
import {connect} from "react-redux";
import {makeStyles} from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import {Grid} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditForm from "../components/EditForm";
import {updateTaskBody} from "../state/task_board/actions";
import LinesEllipsis from "react-lines-ellipsis";

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
        padding: "16px"
    },
    closeIcon: {
        cursor: "pointer",
        color: "#626262",
        transform: "rotate(45deg)",
        "&:hover": {
            color: "#323232"
        }
    },
    header:{
        boxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: 'content-fit',
        maxWidth: '520px',
    }
}));

const EditTaskModal = ({task, hideModal, updateTaskBody}) => {
    const classes = useStyles();

    const handleClose = () => {
        hideModal();
    };

    const handleSubmit = values => {
        const updatedTask = {...task, body: values.body};
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
                    <Grid container justify="space-between">
                        <Grid className={classes.header} item>
                            <LinesEllipsis
                                text={task.header}
                                maxLine='2'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                            />
                        </Grid>
                        <Grid item>
                            <AddIcon className={classes.closeIcon} onClick={handleClose}/>
                        </Grid>
                    </Grid>
                    <EditForm onSubmit={handleSubmit} task={task}/>
                </div>
            </Modal>
        </div>
    );
};

const mapDispatchToProps = dispatch => {
    return {
        updateTaskBody: (task) => dispatch(updateTaskBody(task))
    };
};

export default connect(null, mapDispatchToProps)(EditTaskModal);
