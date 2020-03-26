import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    marginLeft: 0,
    fontSize: "13px",
    textTransform: "inherit",
    "&:$hover": {
      background: "#C4C4C4"
    }
  },
  icon: {
    transform: "rotate(45deg)"
  }
}));

function CancelButton(props) {
  const classes = useStyles();
  return (
    <Button
        onClick={props.onClick}
      variant="text"
      color="secondary"
      className={classes.button}
      startIcon={<AddIcon className={classes.icon} />}
    >
      Отменить
    </Button>
  );
}

export default CancelButton;
