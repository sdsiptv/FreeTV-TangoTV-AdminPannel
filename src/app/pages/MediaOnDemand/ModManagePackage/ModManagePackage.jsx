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

export default function MODManagePackage() {
  const classes = useStyles();
  const history = useHistory();
  const [modPackage, setModPackage] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [packageDetail, setPackageDetail] = useState();
  const [selectedRow, setSelectedRow] = useState();

  const columns = [
    {
      field: 'package_id',
      title: 'package Id',
    },
    { field: 'name', title: 'Name' },
    {
      field: 'count',
      title: 'Channel Count',
    },
    {
      field: 'enabled',
      title: 'Enabled',
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
                history.push('EditMODPackage', {
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
                getMODDetailedPackage(rowData?.package_id);
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
      field: 'mod_id',
      title: 'MOD ID',
    },
    { field: 'title', title: 'MOD' },
  ];

  const getModPackages = () => {
    apis.getModPackage().then(res => {
      setModPackage(res?.data);
    });
  };

  const getMODDetailedPackage = id => {
    apis.getDetailedModPackage(id).then(res => {
      setPackageDetail(res?.data);
      setOpenModal(true);
    });
  };

  useEffect(() => {
    getModPackages();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.package_id);
    apis.deleteModPackage(filter).then(res => {
      toastMessage('Successfully deleted');
      getModPackages();
    });
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
              data={packageDetail}
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
                  history.push('/AddMODPackage');
                }}
              >
                Add Package
              </Button>
            </div>
          </Grid>

          <Grid item xs={12}>
            <MaterialTables
              title={'MOD Manage Package'}
              columns={columns}
              data={modPackage}
              deleteHandler={deleteHandler}
            />
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
