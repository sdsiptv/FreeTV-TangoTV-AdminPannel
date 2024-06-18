import { Button, Container, CssBaseline, Grid, Modal } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import VisibilityIcon from '@material-ui/icons/Visibility';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import SelectedTable from 'app/components/MaterialTables/SelectedTables';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GREEN } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';

export default function ManagePackageStreams() {
  const classes = useStyles();
  let history = useHistory();
  const [channelPackage, setChannelPackage] = useState([]);
  const [packageChannels, setPackageChannels] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedRow, setSelectedRow] = useState();

  const columns = [
    {
      field: 'package_id',
      title: 'Package ID',
    },
    { field: 'name', title: 'Name' },
    { field: 'enabled', title: 'Enable' },
    {
      field: 'count',
      title: 'Channel Count',
    },
    {
      field: 'actions',
      title: 'Actions',
      sorting: false,
      render: rowData => (
        <>
          <Tooltip title="Edit">
            <IconButton
              variant="contained"
              color="secondary"
              size="small"
              style={{ paddingRight: '20px' }}
              onClick={() => {
                history.push('/EditChannelPackage', {
                  state: { data: rowData },
                });
              }}
            >
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Details">
            <IconButton
              variant="contained"
              color="secondary"
              size="small"
              onClick={() => {
                setSelectedRow(rowData);
                getChannelDetailedPackage(rowData?.package_id);
              }}
            >
              <VisibilityIcon />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];
  const selectedColumns = [
    {
      field: 'channel_no',
      title: 'Channel No',
    },
    { field: 'name', title: 'Channel Name' },
  ];

  const getChannelPackages = () => {
    apis.getChannelPackage().then(res => {
      setChannelPackage(res?.data);
    });
  };

  const getChannelDetailedPackage = id => {
    apis.getChannelPackageDetails(id).then(res => {
      setPackageChannels(res?.data);
      setOpenModal(true);
    });
  };

  useEffect(() => {
    getChannelPackages();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.package_id);
    if (filter.length > 0) {
      apis.deleteChannelPackage(filter).then(res => {
        toastMessage('Successfully Deleted');
        getChannelPackages();
      });
    }
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
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
                  {selectedRow?.package_id}. {selectedRow?.name}
                </div>
              }
              columns={selectedColumns}
              data={packageChannels}
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
                  history.push('/AddChannelPackage');
                }}
              >
                Add Package
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <MaterialTables
              title={'Channel Package'}
              columns={columns}
              data={channelPackage}
              deleteHandler={deleteHandler}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
