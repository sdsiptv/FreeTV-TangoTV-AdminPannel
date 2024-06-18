import React, { useEffect } from 'react';
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

export default function AddEditEducationBoard({ pageMode = 'add' }) {
    const history = useHistory();
    const classes = useStyles();
    const location = useLocation();
    // const [enabled, setEnabled] = useState(false);

    const { register, handleSubmit, setValue, getValues, watch, control } = useForm({
        defaultValues: { enabled: false },
    });

    useEffect(() => {
        if (location.state) {
            let params = location.state.state.data;
            setValue('board_name', params.board_name);
            setValue('id', params.id);
        }
    }, []);

    const onSubmit = ({ id, board_name }) => {
        const apiCall =
            pageMode === 'add'
                ? apis.addEDUCATIONBoard(board_name)
                : apis.editEDUCATIONBoard(id, board_name);

        apiCall
            .then(res => {
                toastMessage('Successfully added');
                history.push('/Board');
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
                                {pageMode === 'add' ? 'Add' : 'Edit'} Education Board
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                required
                                fullWidth
                                name="board_name"
                                label="Board Name"
                                type="text"
                                id="board_name"
                                {...register('board_name', { required: true })}
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
                                        variant="contained"
                                        style={{ backgroundColor: GREEN, width: 200 }}
                                    >
                                        {pageMode === 'add' ? 'Create' : 'Update'}
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                                        onClick={() => {
                                            history.push('/Board');
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
