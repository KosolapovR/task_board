import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    background: "#0C7CD5",
    marginLeft: 0,
    fontSize: "13px",
    textTransform: "inherit"
  }
}));

function PrimaryButton({ label, handleSubmit }) {
  const classes = useStyles();
  return (
    <Button
      type="submit"
      onSubmit={handleSubmit}
      variant="contained"
      color="primary"
      className={classes.button}
    >
      {label}
    </Button>
  );
}

export default PrimaryButton;
