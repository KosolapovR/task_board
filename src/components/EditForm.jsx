import React, { useEffect } from "react";
import PrimaryButton from "../components/buttons/PrimaryButton";
import { reduxForm, Field } from "redux-form";
import { makeStyles } from "@material-ui/core/styles";
import { TextField } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  textArea: {
    marginTop: "16px",
    marginBottom: "16px",
    width: "100%",
    background: "#FFFFFF"
  }
}));

const EditableField = field => {
  const classes = useStyles();
  return (
    <TextField
      className={classes.textArea}
      rows={4}
      multiline
      variant="outlined"
      placeholder="Описание задачи"
      {...field.input}
    />
  );
};

const EditForm = ({ task, handleSubmit, ...props }) => {
  useEffect(() => {
    props.initialize({ body: task.body });
  }, [task.body]);

  return (
    <form onSubmit={handleSubmit}>
      <Field name="body" component={EditableField} type="text" />
      <PrimaryButton label="Сохранить" type="submit" />
    </form>
  );
};

export default reduxForm({
  form: "editTaskForm"
})(EditForm);
