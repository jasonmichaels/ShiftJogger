import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const style = theme => ({});

export const CardComponent = ({
  log,
  classes,
  returnDate,
  handleEdit,
  getTime,
  getDiff
}) => (
  <Card key={log._id} className={classes.card}>
    <CardContent>
      <Typography className={classes.title} color="textSecondary" gutterBottom>
        {log.title}
      </Typography>
      <Typography variant="h6" component="h4">
        {log.date && returnDate(log.date, log.shiftStart)}
        {log.dateEnd ? (
          <span> to {returnDate(log.dateEnd, log.shiftEnd)}</span>
        ) : null}
      </Typography>
      <Typography className={classes.pos} color="textSecondary">
        {getTime(log.shiftStart)} to{" "}
        {log.shiftEnd !== "" ? getTime(log.shiftEnd) : "In Progress"}
      </Typography>
      {log.shiftEnd !== "" ? (
        getDiff(
          { startTime: log.shiftStart, startDay: log.date },
          {
            endTime: log.shiftEnd,
            endDay: log.dateEnd !== null ? log.dateEnd : log.date
          }
        )
      ) : (
        <Typography className={classes.pos} color="textSecondary">
          Finish the log to track your completed hours!
        </Typography>
      )}
    </CardContent>
    <CardActions className={classes.actions}>
      <Button size="small" onClick={() => handleEdit(log._id)}>
        Edit Log
      </Button>
      <Button size="small">Send Log</Button>
    </CardActions>
  </Card>
);
