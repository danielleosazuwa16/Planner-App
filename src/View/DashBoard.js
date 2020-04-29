import { makeStyles } from '@material-ui/core';
import { AppBar, Box, Container, CssBaseline, IconButton, Link, Toolbar, Typography } from '@material-ui/core';
import { LibraryBooks, DashboardSharp } from '@material-ui/icons';
import { default as React } from 'react';
import EditableTable from '../Components/EditableTable';
import CreatePlanDialog from './CreatePlanDialog';
import PreviousPlans from './PreviousPlans.js';

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
  footer: {
    position: 'fixed',
    height: 50,
    bottom: 0,
    left: 0,
    right: 0,
    marginBottom: 20,
  }, 
  body: {
    marginButtom: 70
  }
}));

export default function Dashboard(props) {
  const classes = useStyles();
  const [showPrev, setShowPrev] = React.useState(false);

  const showPrevious = () => {
    setShowPrev(true);
  }

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
            <IconButton color="inherit" onClick={() => setShowPrev(true)}>
              <LibraryBooks />
            </IconButton>

            {/* Active Plans */}
            <IconButton color="inherit" onClick={() => setShowPrev(false)}>
              <DashboardSharp />
            </IconButton>
          </div>

        </Toolbar>
      </AppBar>

      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          <Container className={classes.body}>
            {!showPrev && props.plan && <EditableTable
              plan={props.plan}
              activePlan={props.activePlan}
              handleAddGoal={props.handleAddGoal}
              handleDeleteGoal={props.handleDeleteGoal}
              hanldeCompleteGoal={props.hanldeCompleteGoal}
              editPlan={props.editPlan}
              finishPlan={props.finishPlan}
            />}

            {showPrev && <PreviousPlans
              previousPlans={props.previousPlans}
            />}
          </Container>

          <Box pt={4} className={classes.footer}>
            <Copyright />
          </Box>
        </Container>
      </main>

    </div>
  );
}