import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
})

const today = new Date()

export const Deposits = () => {
  const classes = useStyles()
  return (
    <React.Fragment>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Recent Deposits
      </Typography>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        on {today.toLocaleDateString()}
      </Typography>
      <div>
        <Typography>Updated</Typography>
      </div>
    </React.Fragment>
  )
}
