import React from "react";
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

function ListFooter({ editMode = false }) {
  const classes = useStyles();
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
              <PrimaryButton />
            </Grid>
            <Grid item>
              <CancelButton />
            </Grid>
          </Grid>
        </>
      ) : (
        <SecondaryButton />
      )}
    </>
  );
}

export default ListFooter;
