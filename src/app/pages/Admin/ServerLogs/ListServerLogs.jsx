import React, { useEffect, useState } from 'react';
import {
    Grid,
    CssBaseline,
    Container,
} from '@material-ui/core';
import apis from 'app/api';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';
import { failureNotification } from 'utils/helper';
import useStyles from 'styles/globalStyles';

export default function ListServerLogs() {
    const classes = useStyles();
    const [ServerLogs, setServerLogs] = useState([]);

    const columns = [
        { field: 'ip', title: 'IP' },
        { field: 'time', title: 'Time' },
        { field: 'method', title: 'Method' },
        { field: 'endpoint', title: 'EndPoint' },
    ];

    const getServerLogs = () => {
        apis
            .getServerLogs()
            .then(res => {
                setServerLogs(res);
            })
            .catch(() => {
                failureNotification('Network error');
            });
    };

    useEffect(() => {
        getServerLogs();
    }, []);

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                    </Grid>

                    <Grid item xs={12}>
                        <DRMWaitListTable
                            title={'Server Logs'}
                            columns={columns}
                            data={ServerLogs}
                        />
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}
