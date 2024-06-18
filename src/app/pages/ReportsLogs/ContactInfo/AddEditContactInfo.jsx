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

export default function AddEditContactInfo({ pageMode = 'add' }) {
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const { register, handleSubmit, setValue, control } = useForm();
    const [enabled, setEnabled] = useState(true);

    const onSubmit = ({ contact_person_name, contact_person_number, contact_mail, customer_care_number, id }) => {
        const apiCall =
            pageMode === 'add'
                ? apis.addContactInfo(contact_person_name, contact_person_number, contact_mail, customer_care_number)
                : apis.editContactInfo(contact_person_name, contact_person_number, contact_mail, customer_care_number, id);

        apiCall
            .then(res => {
                toastMessage(
                    pageMode === 'add' ? `Successfully Added ` : `Successfully updated`,
                );
                history.push('/listContactInfo');
            })
            .catch(err => {
                failureNotification('Network error');
            });
    };

    useEffect(() => {
        if (location.state) {
            let params = location.state.state.data;
            setValue('contact_person_name', params.contact_person_name);
            setValue('contact_person_number', params.contact_person_number);
            setValue('contact_mail', params.contact_mail);
            setValue('customer_care_number', params.customer_care_number);
            setValue('id', params.id);
        } else {
            history.push('/AddContactInfo');
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
                                {pageMode === 'add' ? 'ADD' : 'EDIT'} CONTACT INFO
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="contact_person_name"
                                label="Contact Person Name"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="contact_person_name"
                                {...register('contact_person_name', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="contact_person_number"
                                label="Contact Person Number"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="contact_person_number"
                                {...register('contact_person_number', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="contact_mail"
                                label="Contact Mail"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="contact_mail"
                                {...register('contact_mail', { required: true })}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="customer_care_number"
                                label="Customer Care Number"
                                type="text"
                                InputLabelProps={{ shrink: true }}
                                id="customer_care_number"
                                {...register('customer_care_number', { required: true })}
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
                                            history.push('/listContactInfo');
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
