import { Button, Container, CssBaseline, Grid, Modal } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import EditIcon from '@material-ui/icons/Edit';
import apis from 'app/api';
import MaterialTables from 'app/components/MaterialTables';
import SingleMaterialTables from 'app/components/SingleDeleteTable2';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStyles from 'styles/globalStyles';
import { GREEN } from 'utils/constant/color';
import { failureNotification, toastMessage } from 'utils/helper';
import CategoriesList from 'app/components/DraggableLists/Categories';
import DRMWaitListTable from 'app/components/DrmWaitlistTable';

export default function ChannelCategories() {
  const classes = useStyles();
  const Role = localStorage.getItem("roles");
  const [channelCategories, setChannelCategories] = useState([]);
  const [dChannelCategories, setDChannelCategories] = useState([]);

  const [openMoveCategory, setOpenMoveCategory] = useState(false);
  const columns = [
    {
      field: 'categoryName',
      title: 'Name',
    },
    { field: 'channelCount', title: 'Channels Count' },
    { field: 'position', title: 'Positions' },
    {
      field: 'createdAt',
      title: 'Created At',
      render: rowData => moment(rowData.createdAt).format('YYYY-MM-DD HH:MM'),
    },
    { field: 'enabled', title: 'Enabled' },
    {
      title: 'Actions',
      sorting: false,
      render: rowData => (
        <Tooltip title="Edit">
          <IconButton
            variant="contained"
            size="small"
            color="secondary"
            onClick={() => {
              history.push('/EditChannelCategories', {
                state: { data: rowData },
              });
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
      ),
    },
  ];

  let history = useHistory();

  const getChannelCategories = () => {
    apis.getChannelCategory().then(res => {
      setChannelCategories(res?.data);
      setDChannelCategories(res?.data);
    });
  };

  useEffect(() => {
    getChannelCategories();
  }, []);

  const deleteHandler = data => {
    let filter = data.map(obj => obj.categoryId);
    apis.deleteCategory(JSON.stringify(filter)).then(res => {
      getChannelCategories();
      toastMessage('Successfully Deleted');
    });
  };

  const updateColumn = () => {
    let data = [];
    dChannelCategories?.map((categoryObj, index) =>
      data.push({ categoryId: categoryObj.categoryId, position: index + 1 }),
    );
    apis
      .editChannelCategoryPosition(data)
      .then(res => {
        toastMessage('Successfully Updated');
        getChannelCategories();
        setOpenMoveCategory(false);
      })
      .catch(() => {
        failureNotification('Network error');
      });
  };

  return (
    <Container component="main" maxWidth="xl">
      <CssBaseline />
      {Role === 'admin' && (
        <div>
          <Modal
            className={classes.modal}
            open={openMoveCategory}
            onClose={() => {
              setOpenMoveCategory(false);
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                margin: '10px',
                width: '300px',
              }}
            >
              <CategoriesList
                categories={dChannelCategories}
                setCategories={setDChannelCategories}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '10px',
                }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN, marginRight: 10 }}
                  onClick={() => setOpenMoveCategory(false)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    updateColumn();
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </Modal>

          <div className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN, marginRight: 10 }}
                    onClick={() => setOpenMoveCategory(true)}
                  >
                    Move Category
                  </Button>

                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={() => {
                      history.push('/AddChannelCategories');
                    }}
                  >
                    Add Category
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                <MaterialTables
                  title={'Channel Categories'}
                  columns={columns}
                  data={channelCategories}
                  deleteHandler={deleteHandler}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      )}

      {Role === 'maintenance' && (
        <div>
          <Modal
            className={classes.modal}
            open={openMoveCategory}
            onClose={() => {
              setOpenMoveCategory(false);
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                margin: '10px',
                width: '300px',
              }}
            >
              <CategoriesList
                categories={dChannelCategories}
                setCategories={setDChannelCategories}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '10px',
                }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN, marginRight: 10 }}
                  onClick={() => setOpenMoveCategory(false)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    updateColumn();
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </Modal>

          <div className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN, marginRight: 10 }}
                    onClick={() => setOpenMoveCategory(true)}
                  >
                    Move Category
                  </Button>

                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={() => {
                      history.push('/AddChannelCategories');
                    }}
                  >
                    Add Category
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                <DRMWaitListTable
                  title={'Channel Categories'}
                  columns={columns}
                  data={channelCategories}
                  deleteHandler={deleteHandler}
                />
              </Grid>
            </Grid>
          </div>
        </div>
      )}

      {Role === 'maintenance2' && (
        <div>
          <Modal
            className={classes.modal}
            open={openMoveCategory}
            onClose={() => {
              setOpenMoveCategory(false);
            }}
          >
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: 'white',
                margin: '10px',
                width: '300px',
              }}
            >
              <CategoriesList
                categories={dChannelCategories}
                setCategories={setDChannelCategories}
              />
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  padding: '10px',
                }}
              >
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN, marginRight: 10 }}
                  onClick={() => setOpenMoveCategory(false)}
                >
                  Cancel
                </Button>

                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN }}
                  onClick={() => {
                    updateColumn();
                  }}
                >
                  Save
                </Button>
              </div>
            </div>
          </Modal>

          <div className={classes.paper}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN, marginRight: 10 }}
                    onClick={() => setOpenMoveCategory(true)}
                  >
                    Move Category
                  </Button>

                  <Button
                    variant="contained"
                    style={{ backgroundColor: GREEN }}
                    onClick={() => {
                      history.push('/AddChannelCategories');
                    }}
                  >
                    Add Category
                  </Button>
                </div>
              </Grid>
              <Grid item xs={12}>
                <MaterialTables
                  title={'Channel Categories'}
                  columns={columns}
                  data={channelCategories}
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
