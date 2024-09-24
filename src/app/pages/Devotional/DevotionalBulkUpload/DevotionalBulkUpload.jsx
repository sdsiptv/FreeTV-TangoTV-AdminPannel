import React, { useEffect, useState } from 'react';
import {
    Grid,
    Button,
    CssBaseline,
    TextField,
    Typography,
    Container,
    Checkbox,
    FormControlLabel,
} from '@material-ui/core';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { Controller, useForm } from 'react-hook-form';
import apis from 'app/api';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';

export default function DevotionalBulkUpload({ pageMode = 'add' }) {
    const history = useHistory();
    const classes = useStyles();
    const location = useLocation();
    const [enabled, setEnabled] = useState(false);

    const { register, handleSubmit, setValue, getValues, watch, control } = useForm({
        defaultValues: { enabled: false },
    });

    useEffect(() => {
        if (location.state) {
            let params = location.state.state.data;
            setValue('url', params.url);
        }
    }, []);

    const onSubmit = data => {
        const apiCall =
            pageMode === 'add'
                ? apis.editDevotionalBulkUpload(data.url)
                : apis.editLocation(data.location_id, data.name, data.position, data.enabled);

        apiCall
            .then(res => {
                toastMessage('Successfully added');
                history.push('/');
            })
            .catch(err => {
                failureNotification('Network error');
            });
    };

    return (
        <Container component="main" maxWidth="lg">
            <CssBaseline />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.paper}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                 Bulk Upload
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="url"
                                label="Upload URL"
                                type="text"
                                id="url"
                                {...register('url', { required: true })}
                            />
                        </Grid>

                        {/* <Grid item xs={12}>
                            <Controller
                                name="enabled"
                                control={control}
                                defaultValue={false}
                                render={({ field }) => {
                                    return (
                                        <FormControlLabel
                                            label="Enabled"
                                            control={
                                                <Checkbox
                                                    checked={watch('enabled') === 1}
                                                    onChange={e => {
                                                        field.onChange(e);
                                                        setValue('enabled', Number(getValues('enabled')));
                                                    }}
                                                />
                                            }
                                        />
                                    );
                                }}
                            />
                        </Grid> */}

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
                                        variant="contained"
                                        style={{ backgroundColor: GREEN, width: 200 }}
                                    >
                                        {/* {pageMode === 'add' ? 'Create' : 'Update'} */}UPDATE
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                                        onClick={() => {
                                            history.push('/');
                                        }}
                                    >
                                        Back
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
