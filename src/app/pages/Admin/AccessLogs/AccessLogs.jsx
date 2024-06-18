import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    CssBaseline,
    Container,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import { failureNotification, toastMessage } from 'utils/helper';

import GetAppIcon from '@material-ui/icons/GetApp';

import useStyles from 'styles/globalStyles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function ListAccessLogs() {
    const classes = useStyles();
    const history = useHistory();
    const [AccessLogs, setAccessLogs] = useState([]);

    const columns = [
        { field: 'id', title: 'SNO' },
        {
            field: 'userId',
            title: 'User ID',
        },
        {
            field: 'name',
            title: 'Name',
        },
        {
            field: 'ip',
            title: 'Ip',
        },
        {
            field: 'mac',
            title: 'Mac',
        },
        {
            field: 'created_at',
            title: 'Create At',
        },
        {
            field: 'actions',
            title: 'Download Logs File',
            sorting: false,
            render: rowData => (
                <>
                    <Tooltip title="Download">
                        <IconButton
                            variant="contained"
                            size="small"
                            color="secondary"
                            onClick={() => {
                                downloadTxtFile();
                            }}
                        >
                            <GetAppIcon />
                        </IconButton>
                    </Tooltip>
                </>
            ),
        },
    ];

    const getAccessLogs = () => {
        apis
            .getAccessLogs()
            .then(res => {
                setAccessLogs(res?.data);
            })
            .catch(() => {
                failureNotification('Network error');
            });
    };

    const downloadTxtFile = () => {
        const data = AccessLogs.map(log => JSON.stringify(log)).join('\n');
        const element = document.createElement("a");
        const file = new Blob([data], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = "access_logs.txt";
        document.body.appendChild(element);
        element.click();
    };

    useEffect(() => {
        getAccessLogs();
    }, []);

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />

            <div className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {/* <Button
                                variant="contained"
                                color="primary"
                                onClick={downloadTxtFile}
                                startIcon={<GetAppIcon />}
                            >
                                Download All Logs
                            </Button> */}
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <DRMWaitListTable
                            title={'Access Logs'}
                            columns={columns}
                            data={AccessLogs}
                        />
                    </Grid>
                </Grid>
            </div>

        </Container>
    );
}
