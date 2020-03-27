import React from "react";
import PrimaryButton from "../components/buttons/PrimaryButton";
import {reduxForm, Field} from "redux-form";
import {makeStyles} from "@material-ui/core/styles";
import {Grid, TextField} from "@material-ui/core";
import CancelButton from "./buttons/CancelButton";


const useStyles = makeStyles(theme => ({
    textarea: {
        background: "#ffffff",
        width: "100%",
    }
}));

const EditableField = field => {
    const classes = useStyles();
    return (
        <TextField
            className={classes.textarea}
            rows={2}
            multiline
            variant="outlined"
            placeholder="Название задачи"
            {...field.input}
        />
    );
};

const AddForm = (props) => {

    const {handleSubmit, handleClose} = props;

    return (<>
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
                <Field name='taskHeader' type='text' component={EditableField}/>
                <Grid container>
                    <Grid item>
                        <PrimaryButton label='Добавить'/>
                    </Grid>
                    <Grid item>
                        <CancelButton onClick={handleClose}/>
                    </Grid>
                </Grid>
            </form>
        </>
    );
};

export default reduxForm({})(AddForm);
