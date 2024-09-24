import {
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
    FormControl,
    MenuItem,
    InputLabel,
    Select
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';
import { Autocomplete } from '@material-ui/lab';

export default function AddEditLandingChannels({ pageMode = 'add' }) {
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const { register, handleSubmit, setValue, control } = useForm();
    const [enabled, setEnabled] = useState(true);
    const [customerData, setCustomerData] = useState([]);
    const [userIds, setUserId] = useState(null);

    const onSubmit = ({ }) => {
        const is_landing = "1";
        const apiCall =
            pageMode === 'add'
                ? apis.addLandingChannels(userIds, is_landing)
                : apis.editLandingChannels(userIds, is_landing);

        apiCall
            .then(res => {
                toastMessage(
                    pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
                );
                history.push('/LandingChannel');
            })
            .catch(err => {
                failureNotification('Network error');
            });
    };

    useEffect(() => {
        console.log('Location state:', location.state);
        if (location.state) {
            let params = location.state.state.data;
            console.log('Edit params:', params);
            setUserId(params.channel_id);
        } else {
            history.push('/AddLandingChannels');
        }
    }, [location.state, setValue, history]);


    // useEffect(() => {
    //     if (location.state) {
    //         let params = location.state.state.data;
    //         setValue('contact_url', params.contact_url);
    //         setValue('id', params.id);

    //     } else {
    //         history.push('/AddLandingChannels');
    //     }
    // }, []);

    const handleGetChannels = () => {
        apis.getChannelStream().then(res => {
            setCustomerData(res.data);
        });
    };

    useEffect(() => {
        handleGetChannels();
    }, []);


    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                {pageMode === 'add' ? 'ADD' : 'EDIT'} LANDING CHANNELS
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Autocomplete
                                id="Vendor_id"
                                options={customerData}
                                getOptionLabel={option => option?.channel_id + ' - ' + option?.name}
                                value={customerData.find(c => c.channel_id === userIds) || null}
                                onChange={(event, newValue) => {
                                    if (newValue) {
                                        setUserId(newValue.channel_id);
                                    } else {
                                        setUserId(null);
                                    }
                                }}
                                renderInput={params => (
                                    <TextField
                                        {...params}
                                        label="Channel Name"
                                        variant="outlined"
                                        helperText="Please select your Channel Name"
                                        autoFocus
                                    />
                                )}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    justifyContent: 'flex-end',
                                }}
                            >
                                <div>
                                    <Button
                                        type="submit"
                                        required
                                        fullWidth
                                        variant="contained"
                                        style={{ backgroundColor: GREEN, width: 150 }}
                                    >
                                        {pageMode === 'add' ? 'CREATE' : 'UPDATE'}
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        required
                                        fullWidth
                                        variant="contained"
                                        style={{ backgroundColor: LIGHT_GREY.length, width: 150 }}
                                        onClick={() => {
                                            history.push('/LandingChannel');
                                        }}
                                    >
                                        BACK
                                    </Button>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </Container>
    );
}
