import { useState } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ContactsTable} from './ContactsTable';
import Box from '@material-ui/core/Box';
import CircularProgress from '@material-ui/core/CircularProgress';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { useContacts } from "./useContacts";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      marginTop: theme.spacing(4),
    },
    headContainer: {
        marginBottom: theme.spacing(3),
    },
  })
);

const DATA_VIEW_MODES = {
    TABLE: "table",
    GRID: "grid",
  };


export const Contacts = () => {
    const classes = useStyles();
    const contacts = useContacts();
    const [dataViewMode, setDataViewMode] = useState(DATA_VIEW_MODES.TABLE);

    const handleChangeViewMode = (event, nextView) => {
        setView(nextView);
    };

    return (
    <Container className={classes.root}>
        <Grid container>
        <Grid item xs={12} className={classes.headContainer}>
                <Typography variant="h3" component="h1">
                    Contacts
                </Typography>
                <Box display="flex" justifyContent="space-between">
                    <ToggleButtonGroup 
                    value={dataViewMode} 
                    exclusive 
                    onChange={handleChangeViewMode}>
                        <ToggleButton 
                        value="DATA_VIEW_MODES.GRID" 
                        aria-label="DATA_VIEW_MODES.GRID">
                            <ViewListIcon />
                        </ToggleButton>
                        <ToggleButton 
                        value="DATA_VIEW_MODES.TABLE" 
                        aria-label="DATA_VIEW_MODES.TABLE">
                            <ViewModuleIcon />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Grid>
            <Grid item xs={12}>
                {(() => {
                    if(contacts.isLoading) {
                        return <CircularProgress/>;
                        }
                    
                    if(contacts.isError) {
                        return <div>...error</div>;
                    }
                    if (dataViewMode === DATA_VIEW_MODES.TABLE) {
                        return <ContactsTable data={contacts.data} />;
                    }
          
                    if (dataViewMode === DATA_VIEW_MODES.GRID) {
                        return <div data-testid="contacts-grid-container">grid</div>;
                    }
                    return null;
                })()}                
            </Grid>
        </Grid>
    </Container>
    );
}