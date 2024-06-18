import {
  Button,
  Container,
  CssBaseline,
  Grid,
  MenuItem,
  TextField,
  Typography,
} from '@material-ui/core';
import apis from 'app/api';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { GREEN } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';

function GeneralSettings() {
  const classes = useStyles();
  const TimeZoneList = ['Kolkata', 'Timezone2', 'TimeZone3'];
  const LanguageList = ['English', 'Tamil'];
  const [ServerName, setServerName] = useState('');
  const [TimeZone, setTimeZone] = useState('');
  const [phone, setPhone] = useState();
  const [language, setLanguage] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState();
  const [imageObj, setImageObj] = useState(undefined);
  const [editorState, setEditorState] = useState();
  const [gst, setGst] = useState('');

  useEffect(() => {
    setEditorState(EditorState.createEmpty());
  }, []);

  const onEditorStateChange = editorState => {
    setEditorState(editorState);
  };

  const updateHandler = e => {
    e.preventDefault();
    let data = new FormData();
    data.append('server_name', ServerName);
    data.append('time_zone', TimeZone);
    data.append('company_phone', phone);
    data.append('vod_language', language);
    data.append('company_address', address);
    data.append('GST_number', gst);
    data.append(
      'about_us',
      draftToHtml(convertToRaw(editorState.getCurrentContent())),
    );
    if (typeof imageObj == 'object') {
      data.append('logo', imageObj);
    } else {
      data.append('logo', image);
    }
    apis.editGeneralSettings(data).then(data => {
      toastMessage('Successfully Updated');
    });
  };
  const hiddenFileInput = React.useRef(null);

  const handleImageChange = event => {
    const fileUploaded = event.target.files[0];
    setImageObj(fileUploaded);
  };

  useEffect(() => {
    apis.getGeneralSettings().then(res => {
      setServerName(res.data[0].server_name);
      setPhone(res.data[0].company_phone);
      setAddress(res.data[0].company_address);
      setTimeZone(res.data[0].time_zone);
      setLanguage(res.data[0].vod_language);
      setImage(res.data[0].logo);
      setGst(res.data[0].GST_number);

      const contentBlock = htmlToDraft(res.data[0].about_us);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks,
        );
        const localEditorState = EditorState.createWithContent(contentState);
        setEditorState(localEditorState);
      }
    });
  }, []);

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.title}>
              System Information
            </Typography>
          </Grid>

          <form className={classes.form} onSubmit={updateHandler}>
            <Grid container spacing={2} maxwidth="xs">
              <Grid item xs={6}>
                <TextField
                  autoComplete="ServerName"
                  name="ServerName"
                  variant="outlined"
                  required
                  fullWidth
                  id="ServerName"
                  label="ServerName"
                  type="text"
                  value={ServerName}
                  onChange={e => {
                    setServerName(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  select
                  label="Time Zone"
                  value={TimeZone}
                  onChange={e => {
                    setTimeZone(e.target.value);
                  }}
                  helperText="Please select your TimeZone"
                  variant="filled"
                  style={{ width: 500 }}
                >
                  {TimeZoneList.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  name="Phone"
                  variant="outlined"
                  required
                  fullWidth
                  id="Phone"
                  label="Company Phone"
                  type="tel"
                  value={phone}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={e => {
                    setPhone(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  id="filled-select-currency"
                  select
                  name="VODLanguage"
                  label="VOD Language"
                  value={language}
                  helperText="Please select your Language"
                  variant="filled"
                  onChange={e => {
                    setLanguage(e.target.value);
                  }}
                  style={{ width: 500 }}
                  type="text"
                >
                  {LanguageList.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="Address"
                  label="Company Address"
                  type="text"
                  id="address"
                  value={address}
                  onChange={e => {
                    setAddress(e.target.value);
                  }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="Gst"
                  label="GST Number"
                  type="text"
                  id="address"
                  value={gst}
                  onChange={e => {
                    setGst(e.target.value);
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <Typography>Upload System Logo</Typography>
                </div>
                <div>
                  <input
                    type="file"
                    accept="image/*"
                    ref={hiddenFileInput}
                    style={{ display: 'none' }}
                    onChange={handleImageChange}
                    id="contained-button-file"
                  />
                  <label htmlFor="contained-button-file">
                    <Button
                      variant="contained"
                      color="primary"
                      component="span"
                      htmlFor="contained-button-file"
                    >
                      Upload
                    </Button>
                  </label>

                  <img
                    src={
                      typeof imageObj == 'object'
                        ? URL.createObjectURL(imageObj)
                        : image
                    }
                    alt=""
                    style={{ paddingLeft: '10px', width: '100px' }}
                  />
                </div>
              </Grid>

              <Grid item xs={12}>
                <div style={{ paddingTop: 10, paddingBottom: 10 }}>
                  <Typography>About us</Typography>
                </div>
                <Editor
                  editorState={editorState}
                  toolbarClassName="toolbarClassName"
                  wrapperClassName="wrapperClassName"
                  editorClassName="editorClassName"
                  required
                  fullwidth
                  wrapperStyle={{
                    fontSize: 20,
                    border: '1px solid black',
                    backgroundColor: 'white',
                  }}
                  onEditorStateChange={onEditorStateChange}
                />
              </Grid>

              <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button style={{ backgroundColor: GREEN }} type={'submit'}>
                    Update
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </Grid>
      </div>
    </Container>
  );
}

export default GeneralSettings;
