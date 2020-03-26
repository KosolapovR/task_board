import React, {useState} from "react";
import SecondaryButton from "./buttons/SecondaryButton";
import PrimaryButton from "./buttons/PrimaryButton";
import { Grid, TextField } from "@material-ui/core";
import CancelButton from "./buttons/CancelButton";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  textarea: {
    background: "#ffffff",
    width: "100%"
  }
}));

function ListFooter() {
  const classes = useStyles();
  const [editMode, setEditMode] = useState(false);
  return (
    <>
      {editMode ? (
        <>
          <form noValidate autoComplete="off">
            <TextField
              className={classes.textarea}
              id="outlined-basic"
              multiline
              variant="outlined"
              rows="2"
            />
          </form>
          <Grid container>
            <Grid item>
              <PrimaryButton label='Добавить'/>
            </Grid>
            <Grid item>
              <CancelButton onClick={()=> {setEditMode(false)}} />
            </Grid>
          </Grid>
        </>
      ) : (
        <SecondaryButton onClick={()=> {setEditMode(true)}}/>
      )}
    </>
  );
}

export default ListFooter;
