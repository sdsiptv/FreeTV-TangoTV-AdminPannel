import {
    Button,
    Checkbox,
    Container,
    CssBaseline,
    FormControlLabel,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from './styles';
import { failureNotification, toastMessage } from 'utils/helper';

export default function AddEditTuneVersion({ pageMode = 'add' }) {
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const { register, handleSubmit, setValue, control } = useForm();
    const [enabled, setEnabled] = useState(true);

    const onSubmit = ({ vod, mod, sod, livetv, id }) => {
        const apiCall =
            pageMode === 'add'
                ? apis.addTuneVersion(vod, mod, sod, livetv)
                : apis.editTuneVersion(vod, mod, sod, livetv,id);

        apiCall
            .then(res => {
                toastMessage(
                    pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
                );
                history.push('/viewTuneversion');
            })
            .catch(err => {
                failureNotification('Network error');
            });
    };

    useEffect(() => {
        if (location.state) {
            let params = location.state.state.data;
            setValue('vod', params.vod);
            setValue('sod', params.sod);
            setValue('mod', params.mod);
            setValue('livetv', params.livetv);
            setValue('id', params.id);
        } else {
            history.push('/AddTuneVersion');
        }
    }, []);

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                {pageMode === 'add' ? 'ADD' : 'EDIT'} TUNE VERSION
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="vod"
                                label="VOD"
                                type="number"
                                InputLabelProps={{ shrink: true }}
                                id="vod"
                                {...register('vod', { required: true })}
                                helperText={"VOD will be Only in Number"}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="sod"
                                label="SOD"
                                type="number"
                                InputLabelProps={{ shrink: true }}
                                id="sod"
                                {...register('sod', { required: true })}
                                helperText={"SOD will be Only in Number"}

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="mod"
                                label="MOD"
                                type="number"
                                InputLabelProps={{ shrink: true }}
                                id="mod"
                                {...register('mod', { required: true })}
                                helperText={"MOD will be Only in Number"}

                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="livetv"
                                label="LIVE TV"
                                type="number"
                                InputLabelProps={{ shrink: true }}
                                id="livetv"
                                {...register('livetv', { required: true })}
                                helperText={"LIVETV will be Only in Number"}

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
                                            history.push('/viewTuneVersion');
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
