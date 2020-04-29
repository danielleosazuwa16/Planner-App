import { makeStyles } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import IconButton from '@material-ui/core/IconButton';
import Link from '@material-ui/core/Link';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import { default as React } from 'react';
import EditableTable from '../../Components/Table/EditableTable';
import CreatePlanDialog from '../CreatePlan/CreatePlanDialog';
import './DashBoard.css';

//based off of material Drawer Docs https://material-ui.com/components/drawers/
function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Danielle Osazuwa | '}
      <Link color="inherit" href="https://github.com/danielleosazuwa16/Planner-App">
        GitHub
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },

  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(9),
    },
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
}));

export default function Dashboard(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar>
        <Toolbar>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            My Life Is In Shambles
          </Typography>

          <div align="right">
            {/* Create New Plan */}
            <IconButton color="inherit">
              <CreatePlanDialog
                createPlan={props.handleCreatePlan}
              />
            </IconButton>
            {/* Previous Plans */}
            <IconButton color="inherit">
              <LibraryBooksIcon />
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>

          {/*we add the components we want here*/}
          <EditableTable
            plan={props.plan}
            activePlan={props.activePlan}
            handleAddGoal={props.handleAddGoal}
            handleDeleteGoal={props.handleDeleteGoal}
            hanldeCompleteGoal={props.hanldeCompleteGoal}
            editPlan={props.editPlan}
          />
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>

    </div>
  );
}