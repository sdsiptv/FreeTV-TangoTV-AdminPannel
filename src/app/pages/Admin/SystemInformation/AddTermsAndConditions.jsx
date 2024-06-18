import {
    Button,
    Container,
    CssBaseline,
    Grid,
    TextField,
    Typography,
} from '@material-ui/core';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import useStyles from 'styles/globalStyles';
import { failureNotification, toastMessage } from 'utils/helper';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

export default function AddTermsAndCondition({ pageMode = 'add' }) {
    const hiddenFileInput = React.useRef(null);
    const history = useHistory();
    const location = useLocation();
    const classes = useStyles();
    const [imageObj, setImageObj] = useState(undefined);
    const [image, setImage] = useState('');
    const { register, handleSubmit, setValue } = useForm();
    const buttonStyle = { backgroundColor: '#63acf0', margin: '9px' };
    const [imageType, setimageType] = useState('');
    const [imageList, setImageList] = useState([]);

    const handleImageChange = event => {
        const fileUploaded = event.target.files[0];
        setImageObj(fileUploaded);
    };

    const onSubmit = ({ fullname }) => {
        let data = new FormData();

        imageList.forEach(file => {
            data.append('images', file);
        });
    
        apis.addTermsAndCondition(data).then(res => {
            toastMessage('Successfully added');
            history.push('/');
        });
    };
    

    const props = {
        onRemove: file => {
            const index = imageList.indexOf(file);
            const newFileList = imageList.slice();
            newFileList.splice(index, 1);
            setImageList(newFileList);
        },
        beforeUpload: (file, fileList) => {
            setImageList(fileList);
            return false;
        },
        fileList: imageList,
    };

    return (
        <Container component="main" maxWidth="sm">
            <CssBaseline />
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.paper}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Typography component="h1" variant="h5" className={classes.title}>
                                {pageMode === 'add' ? 'ADD' : 'EDIT'} CATEGORY
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Upload listType="picture" maxCount={10} multiple {...props}>
                                <Button style={buttonStyle} icon={<UploadOutlined />}>
                                    Terms And Condition Upload (Max: 10)
                                </Button>
                            </Upload>
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
                                        {pageMode === 'add' ? 'Create' : 'Update'}
                                    </Button>
                                </div>
                                <div>
                                    <Button
                                        required
                                        fullWidth
                                        variant="contained"
                                        style={{ backgroundColor: LIGHT_GREY.length, width: 150 }}
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
