import {
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton,
  Modal,
  Tooltip,
} from '@material-ui/core';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import SelectedTable from 'app/components/MaterialTables/SelectedTables';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import useStyles from './styles';
import { toastMessage } from 'utils/helper';
import SingleMaterialTables from 'app/components/SingleDeleteTable2';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';


export default function EPG() {
  const history = useHistory();
  const classes = useStyles();
  const Role = localStorage.getItem("roles");

  const [epgData, setEpgData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();
  const [channelEpg, setChannelEpg] = useState([]);

  const selectedColumns = [
    { field: 'title', title: 'Title' },
    {
      field: 'startAt',
      title: 'StartAt',
      render: rowData =>
        moment(rowData?.startAt, 'YYYY-MM-DDTHH:mm:ssZ')?.format(
          'YYYY-MM-DD HH:mm',
        ),
    },
    {
      field: 'endAt',
      title: 'EndAt',
      render: rowData =>
        moment(rowData?.endAt, 'YYYY-MM-DDTHH:mm:ssZ')?.format(
          'YYYY-MM-DD HH:mm',
        ),
    },
    {
      field: 'duration',
      title: 'Duration (Minutes)',
      render: rowData => moment.duration(rowData?.duration).asMinutes(),
    },

    {
      field: 'actions',
      title: 'Actions',
      sorting: false,
      render: rowData => (
        <Tooltip title="Record">
          <IconButton
            variant="contained"
            color="secondary"
            size="small"
            onClick={() => {
              // setSelectedRow(rowData);
              // getChannelEpg(rowData?.channel_id);
            }}
          >
            <VisibilityIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];
  const columns = [
    { field: 'name', title: 'Name' },
    { field: 'channel_name', title: 'Channel' },
    {
      field: 'source',
      title: 'Source',
    },
    // { field: 'allowRecord', title: 'Allow Record' },
    // { field: 'timing', title: 'Catchup timing' },

    {
      field: 'actions',
      title: 'Actions',
      sorting: false,
      render: rowData => (
        <>
          <Tooltip title="Details">
            <IconButton
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                setSelectedRow(rowData);
                getChannelEpg(rowData?.channel_id);
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Edit">
            <IconButton
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                history.push('EditEpg', {
                  state: { data: rowData },
                });
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const getChannelEpg = id => {
    apis.getDetailedEpgData(id).then(res => {
      setChannelEpg(res?.data);
      setOpenModal(true);
    });
  };

  const getEpgData = () => {
    apis.getEpgData().then(res => {
      setEpgData(res?.data);
    });
  };

  useEffect(() => {
    getEpgData();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.channel_id);
    if (filter.length > 0) {
      apis.deleteEPG(filter).then(res => {
        toastMessage('Successfully deleted');
        getEpgData();
      });
    }
  };

  return (
    <Container>
      <CssBaseline />
      {Role === 'admin' && (
        <div>
          <div>
            <Modal
              className={classes.modal}
              open={openModal}
              onClose={() => {
                setOpenModal(false);
              }}
            >
              <Grid className={classes.modalDiv} container>
                <SelectedTable
                  title={
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      {selectedRow?.channel_name}
                    </div>
                  }
                  columns={selectedColumns}
                  data={channelEpg}
                />
              </Grid>
            </Modal>
          </div>

          <div className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={10}>
                <Grid container spacing={1} alignItems="flex-end"></Grid>
              </Grid>
              <Grid item xs={2}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={() => {
                      history.push('/AddEpg');
                    }}
                  >
                    Add EPG
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12}>
                <MaterialTables
                  title={'EPG'}
                  columns={columns}
                  data={epgData}
                  deleteHandler={deleteHandler}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      )}

      {Role === 'maintenance' && (
        <div>
          <div>
            <Modal
              className={classes.modal}
              open={openModal}
              onClose={() => {
                setOpenModal(false);
              }}
            >
              <Grid className={classes.modalDiv} container>
                <SelectedTable
                  title={
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      {selectedRow?.channel_name}
                    </div>
                  }
                  columns={selectedColumns}
                  data={channelEpg}
                />
              </Grid>
            </Modal>
          </div>

          <div className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={10}>
                <Grid container spacing={1} alignItems="flex-end"></Grid>
              </Grid>
              <Grid item xs={2}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={() => {
                      history.push('/AddEpg');
                    }}
                  >
                    Add EPG
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12}>
                <DRMWaitListTable
                  title={'EPG'}
                  columns={columns}
                  data={epgData}
                  deleteHandler={deleteHandler}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      )}

      {Role === 'maintenance2' && (
        <div>
          <div>
            <Modal
              className={classes.modal}
              open={openModal}
              onClose={() => {
                setOpenModal(false);
              }}
            >
              <Grid className={classes.modalDiv} container>
                <SelectedTable
                  title={
                    <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
                      {selectedRow?.channel_name}
                    </div>
                  }
                  columns={selectedColumns}
                  data={channelEpg}
                />
              </Grid>
            </Modal>
          </div>

          <div className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={10}>
                <Grid container spacing={1} alignItems="flex-end"></Grid>
              </Grid>
              <Grid item xs={2}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={() => {
                      history.push('/AddEpg');
                    }}
                  >
                    Add EPG
                  </Button>
                </div>
              </Grid>

              <Grid item xs={12}>
                <MaterialTables
                  title={'EPG'}
                  columns={columns}
                  data={epgData}
                  deleteHandler={deleteHandler}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      )}
    </Container>
  );
}
