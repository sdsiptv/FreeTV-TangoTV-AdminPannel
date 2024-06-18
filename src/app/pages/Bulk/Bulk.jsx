import { UploadOutlined } from '@ant-design/icons';
import {
  Button,
  Container,
  CssBaseline,
  FormControl,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@material-ui/core';
import { Upload } from 'antd';
import apis from 'app/api';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import useStyles from 'styles/globalStyles';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { failureNotification, toastMessage } from 'utils/helper';
import ExcelJS from 'exceljs';

export default function Bulk() {
  const history = useHistory();
  const classes = useStyles();
  const { handleSubmit } = useForm();
  const buttonStyle = { backgroundColor: '#63acf0', margin: '9px' };
  const [contentType, setcontentType] = useState('');
  const [selectedOption, setSelectedOption] = useState('import');
  const [file, setFile] = useState(null);

  
  const handleOptionChange = event => {
    setSelectedOption(event.target.value);
  };

  const handleFileDownload = ({ file }) => { };
  const onSubmit = () => {
    if (selectedOption === 'import') {
      let contentTypeApi = { 
        vod: 'addBulkVod',
        mod: 'addBulkMod',
        sod: 'addBulkSod',
        ott: 'addBulkOtt',
        live: 'addBulkLivetv', 
      };
      let apiMethod = contentTypeApi[contentType];
      let data = new FormData();
      data.append('file', file);
      apis[apiMethod](data)
        .then(response => {
          toastMessage('Imported Successfully');
          history.push('/');
        })
        .catch(error => {
          if (error.response) {
            if (error.response.status === 409) {
              failureNotification('Resource Already Exists');
            } else if (error.response.status === 400) {
              failureNotification('All VOD Titles already exist');
            } else if (error.response.status === 500) {
              failureNotification('Internal Server Error');
            } else {
              failureNotification('Unknown Error');
            }
          } else if (error.request) {
            failureNotification('Network Error: Could not reach the server');
          } else {
            failureNotification('Error: ' + error.message);
          }
        });
    }
     else {
      let contentTypeApi = {
        vod: 'getBulkVod',
        mod: 'getBulkMod',
        // sod: 'http://localhost:3001/admin/bulkupdate/sod',
        ott: 'getBulkOtt',
        live:'getBulkLivetv',
      };

      let apiMethod = contentTypeApi[contentType];
      apis[apiMethod]()
        .then(response => {
          let data = response.data;
          const workbook = new ExcelJS.Workbook();
          const worksheet = workbook.addWorksheet('Data');

          // Add headers
          const headers = Object.keys(data[0]);
          worksheet.addRow(headers);

          // Add data
          data.forEach(row => {
            let rowData = [];
            headers.forEach(header => {
              rowData.push(row[header]);
            });
            worksheet.addRow(rowData);
          });

          workbook.xlsx.writeBuffer().then(buffer => {
            const blob = new Blob([buffer], {
              type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            });
            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);
            link.download = `${contentType}.xlsx`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toastMessage('File download started');
          });
        })
        .catch(error => {
          failureNotification('Network error');
        });
    }
  };

  const props = {
    onRemove: file => {
      // const index = imageList.indexOf(file);
      // const newFileList = imageList.slice();
      // newFileList.splice(index, 1);
    },
    beforeUpload: file => {
      setFile(file);
      return false;
    },
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                Bulk Operations
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <Grid item xs={6}>
                <TextField
                  id="type"
                  select
                  label="Type"
                  required
                  fullWidth
                  helperText="Please select the appropriate type"
                  variant="outlined"
                  size="small"
                  value={contentType}
                  type="text"
                  onChange={e => {
                    setcontentType(e.target.value);
                  }}
                >
                  <MenuItem key={'live'} value={'live'}>
                    Live Streams
                  </MenuItem>
                  <MenuItem key={'vod'} value={'vod'}>
                    Video On Demand
                  </MenuItem>
                  <MenuItem key={'sod'} value={'sod'}>
                    Series On Demand
                  </MenuItem>
                  <MenuItem key={'mod'} value={'mod'}>
                    Music On Demand
                  </MenuItem>
                  <MenuItem key={'ott'} value={'ott'}>
                    OTT
                  </MenuItem>
                </TextField>
              </Grid>
            </Grid>
            <div style={{ padding: '10px' }}>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-label="position"
                  name="position"
                  defaultValue="radioButton"
                  value={selectedOption}
                  onChange={handleOptionChange}
                >
                  <FormControlLabel
                    value="import"
                    control={<Radio color="primary" />}
                    label="Import"
                  />

                  <FormControlLabel
                    value="export"
                    control={<Radio color="primary" />}
                    label="Export"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            {selectedOption === 'import' && (
              <Grid item xs={12}>
                <Upload maxCount={1} {...props}>
                  <Button style={buttonStyle} icon={<UploadOutlined />}>
                    Upload
                  </Button>
                </Upload>
              </Grid>
            )}

            <Grid item xs={12}>
              <div>
                {selectedOption === 'import' && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      justifyContent: 'flex-end',
                    }}
                  >
                    <Button
                      type="submit"
                      required
                      fullWidth
                      variant="contained"
                      style={{ backgroundColor: GREEN, width: 200 }}
                    >
                      Submit
                    </Button>

                    <Button
                      required
                      fullWidth
                      variant="contained"
                      style={{ backgroundColor: LIGHT_GREY.length, width: 200 }}
                      onClick={() => {
                        history.push('/');
                      }}
                    >
                      Back
                    </Button>
                  </div>
                )}

                {selectedOption === 'export' && (
                  <Grid item xs={12}>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Button
                        type="submit"
                        required
                        fullWidth
                        variant="contained"
                        style={{ backgroundColor: GREEN, width: 200 }}
                        onClick={handleFileDownload}
                      >
                        Download
                      </Button>

                      <Button
                        required
                        fullWidth
                        variant="contained"
                        style={{
                          backgroundColor: LIGHT_GREY.length,
                          width: 200,
                        }}
                        onClick={() => {
                          history.push('/');
                        }}
                      >
                        Back
                      </Button>
                    </div>
                  </Grid>
                )}
              </div>
            </Grid>
          </Grid>
        </div>
      </form>
    </Container>
  );
}
