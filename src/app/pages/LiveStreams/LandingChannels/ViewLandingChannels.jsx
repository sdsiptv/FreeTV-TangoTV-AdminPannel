import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    CssBaseline,
    Container,
    IconButton,
    Tooltip,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import { failureNotification, toastMessage } from 'utils/helper';
import EditIcon from '@material-ui/icons/Edit';

import useStyles from 'styles/globalStyles';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function ViewLandingChannels() {
    const classes = useStyles();
    const history = useHistory();
    const [LandingCategory, setLandingCategory] = useState([]);
    const [isEditMode, setIsEditMode] = useState(false);

    const columns = [
        { field: 'channel_id', title: 'Channel ID' },
        { field: 'name', title: 'Name' },
        {
            field: 'actions',
            title: 'Actions',
            sorting: false,
            render: rowData => (
                <Tooltip title="Edit">
                    <IconButton
                        variant="contained"
                        size="small"
                        color="secondary"
                        onClick={() => {
                            setIsEditMode(true);
                            history.push('EditLandingChannels', {
                                state: { data: rowData },
                            });
                        }}
                    >
                        <EditIcon />
                    </IconButton>
                </Tooltip>
            ),
        },
    ];

    const getLandingChannels = () => {
        apis
            .getLandingChannels()
            .then(res => {
                setLandingCategory(res?.data);
            })
            .catch(() => {
                failureNotification('Network error');
            });
    };

    useEffect(() => {
        getLandingChannels();
    }, []);

    const deleteHandler = data => {
        let filter = data.map(obj => obj.id);
        if (filter.length > 0) {
            apis.deleteWEBURL(filter).then(res => {
                toastMessage('Successfully Deleted');
                getwebURL();
            });
        }
    };

    return (
        <Container component="main" maxWidth="xl">
            <CssBaseline />
            <div className={classes.paper}>
                <Grid container spacing={1}>
                    <Grid item xs={9}>
                        <Grid container spacing={1} alignItems="flex-end"></Grid>
                    </Grid>
                    <Grid item xs={3}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            {(!isEditMode && LandingCategory.length === 0) && (
                                <Button
                                    variant="contained"
                                    style={{ backgroundColor: GREEN }}
                                    onClick={() => {
                                        history.push('/AddLandingChannels');
                                    }}
                                >
                                    Add Landing channel
                                </Button>
                            )}
                        </div>
                    </Grid>


                    <Grid item xs={12}>
                        <DRMWaitListTable
                            title={'LANDING CHANNELS'}
                            columns={columns}
                            data={LandingCategory}
                            deleteHandler={deleteHandler}
                        />
                    </Grid>
                </Grid>
            </div>
        </Container>
    );
}
