import React from 'react'
import {makeStyles} from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import CircularProgress from '@material-ui/core/CircularProgress'

import {Chart} from '../../components/chart'
import {Deposits} from '../../components/deposits'
import {Orders} from '../../components/orders'
import {getOrdersService} from '../../services/orders-services'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  signoutButton: {
    marginLeft: 36,
  },
  title: {
    flexGrow: 1,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}))

export const DashboardPage = () => {
  const classes = useStyles()
  const [orders, setOrders] = React.useState([])
  const [isFetchingOrders, setIsFetchingOrders] = React.useState(true)

  React.useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await getOrdersService()

        const {orders} = response.data

        setOrders(orders)
      } catch (e) {
        console.log(e)
      } finally {
        setIsFetchingOrders(false)
      }
    }
    fetchOrders()
  }, [])

  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Typography
            component="h1"
            variant="h6"
            color="inherit"
            className={classes.title}
          >
            Dashboard
          </Typography>
          <Typography>John Doe</Typography>
          <Button
            color="secondary"
            variant="contained"
            className={classes.signoutButton}
          >
            Sign out
          </Button>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <Paper className={`${classes.paper} ${classes.fixedHeight}`}>
                <Chart />
              </Paper>
            </Grid>
            <Grid item xs={12} md={4} lg={3}>
              <Paper className={`${classes.paper} ${classes.fixedHeight}`}>
                <Deposits />
              </Paper>
            </Grid>

            <Grid item xs={12}>
              <Paper className={`${classes.paper} ${classes.fixedHeight}`}>
                {isFetchingOrders && <CircularProgress />}
                {!isFetchingOrders && <Orders data={orders} />}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  )
}
