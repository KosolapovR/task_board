import React from "react";
import { connect } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Grid } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditForm from "../components/EditForm";
import {changeTaskStatus, updateTaskBody} from "../state/task_board/actions";

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
  }
}));

const EditTaskModal = ({ task, hideModal, pristine, updateTaskBody }) => {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render

  const handleClose = () => {
    hideModal();
  };

  const handleSubmit = values => {
    const updatedTask = {...task, body: values.body};

    updateTaskBody(updatedTask);
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
            <Grid item>
              <h2 id="simple-modal-title">{task.header}</h2>
            </Grid>
            <Grid item>
              <AddIcon className={classes.closeIcon} onClick={handleClose} />
            </Grid>
          </Grid>
          <EditForm onSubmit={handleSubmit} task={task} />
        </div>
      </Modal>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    // dispatching plain actions
    updateTaskBody: (task) => dispatch(updateTaskBody(task))
  };
};

export default connect(null, mapDispatchToProps)(EditTaskModal);
