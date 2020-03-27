import React, {useEffect, useState} from "react";
import PrimaryButton from "../components/buttons/PrimaryButton";
import {reduxForm, Field} from "redux-form";
import {makeStyles} from "@material-ui/core/styles";
import {Grid, Input, TextField} from "@material-ui/core";
import LinesEllipsis from "react-lines-ellipsis";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
    textArea: {
        marginTop: "16px",
        marginBottom: "16px",
        width: "100%",
        background: "#FFFFFF"
    },
    input: {
        width: '520px',
        background: "#FFFFFF",
        padding: '0 16px'
    },
    closeIcon: {
        cursor: "pointer",
        color: "#626262",
        transform: "rotate(45deg)",
        "&:hover": {
            color: "#323232"
        }
    },
    header: {
        boxOrient: 'vertical',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        height: 'content-fit',
        maxWidth: '520px',
    }
}));

const EditableHeader = field => {
    const classes = useStyles();
    return (
        <Input
            className={classes.input}
            variant="outlined"
            disableUnderline
            required
            {...field.input}
        />
    );
};

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

const EditForm = ({task, handleSubmit, handleClose, ...props}) => {
    const classes = useStyles();

    const [editableHeader, setEditableHeader] = useState(false);

    useEffect(() => {
        props.initialize({body: task.body, header: task.header});
    }, [task.body]);

    return (
        <form onSubmit={handleSubmit}>
            <Grid container justify="space-between">
                <Grid className={classes.header}
                      item
                      onPointerEnter={() => {
                          setEditableHeader(true)
                      }}>
                    {editableHeader
                        ?
                        (
                            <Field style={{width: '100%'}} name="header" component={EditableHeader} type="text"/>
                        )
                        :
                        (
                            <LinesEllipsis
                                text={task.header}
                                maxLine='2'
                                ellipsis='...'
                                trimRight
                                basedOn='letters'
                            />
                        )}

                </Grid>
                <Grid item>
                    <AddIcon className={classes.closeIcon} onClick={handleClose}/>
                </Grid>
            </Grid>
            <Field name="body" component={EditableField} type="text"/>
            <PrimaryButton label="Сохранить" type="submit"/>
        </form>
    );
};

export default reduxForm({
    form: "editTaskForm"
})(EditForm);
