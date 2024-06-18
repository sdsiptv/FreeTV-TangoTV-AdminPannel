import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { toastMessage } from 'utils/helper';
import useStyles from './styles';

function not(a, b) {
  return a.filter(value => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter(value => b.indexOf(value) !== -1);
}

export default function EditChannelPackage() {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [name, setName] = useState();
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);
  const [enabled, setEnabled] = useState(false);
  const [listChannel, setListChannel] = useState([]);
  const [packageId, setPackageId] = useState('');

  useEffect(() => {
    if (location.state) {
      let params = location.state.state.data;
      setPackageId(params.package_id);
      handleChannelPackageDetails(params.package_id);
      setName(params.name);
      setEnabled(params.enabled);
    }
  }, []);

  const handleChannelPackageDetails = id => {
    apis.getChannelStream().then(res => {
      let leftResult = res.data;
      setListChannel(leftResult);

      apis.getChannelPackageDetails(id).then(res => {
        let rightResult = res.data;

        const difference = leftResult.filter(
          leftChan =>
            rightResult.findIndex(
              rightChan => rightChan.channel_id === leftChan.channel_id,
            ) === -1,
        );

        setLeft(difference);
        setRight(rightResult);
      });
    });
  };

  const handleUpdatePackage = () => {
    let channel_id = [];
    channel_id = right.map(item => item?.channel_id);

    apis.editChannelPackage(name, enabled, channel_id, packageId).then(res => {
      toastMessage('Successfully Updated');
      history.push('/ManagePackageStreams');
    });
  };

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    setRight([]);
  };

  // for search input field

  const [filteredDataL, setFilteredDataL] = useState([]);
  const [wordEnteredL, setWordEnteredL] = useState('');

  const [filteredDataR, setFilteredDataR] = useState([]);
  const [wordEnteredR, setWordEnteredR] = useState('');

  const handleFilterL = event => {
    const searchWord = event.target.value;
    setWordEnteredL(searchWord);
    const newFilter = left.filter(value => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredDataL([]);
    } else {
      setFilteredDataL(newFilter);
    }
  };

  const handleFilterR = event => {
    const searchWord = event.target.value;
    setWordEnteredR(searchWord);
    const newFilter = right.filter(value => {
      return value.toLowerCase().includes(searchWord.toLowerCase());
    });

    if (searchWord === '') {
      setFilteredDataR([]);
    } else {
      setFilteredDataR(newFilter);
    }
  };

  const customList = (items, filteredData) => {
    return (
      <Paper className={classes.paper_list}>
        <List dense component="div" role="list">
          {filteredData.length !== 0
            ? filteredData.map(value => {
                const labelId = `transfer-list-item-${value}-label`;
                return (
                  <ListItem
                    key={value}
                    role="listitem"
                    button
                    onClick={handleToggle(value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={value.channel_id + '-' + value.name}
                    />
                  </ListItem>
                );
              })
            : items.map(value => {
                const labelId = `transfer-list-item-${value}-label`;

                return (
                  <ListItem
                    key={value}
                    role="listitem"
                    button
                    onClick={handleToggle(value)}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={checked.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                    <ListItemText
                      id={labelId}
                      primary={value.channel_id + '-' + value.name}
                    />
                  </ListItem>
                );
              })}
          <ListItem />
        </List>
      </Paper>
    );
  };

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <div className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography component="h1" variant="h5" className={classes.title}>
              Edit Channel Package
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <TextField
              autoComplete="name"
              name="name"
              variant="outlined"
              required
              fullWidth
              id="name"
              label="name"
              type="text"
              autoFocus
              value={name}
              size="small"
              onChange={e => {
                setName(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={enabled}
                  onChange={e => {
                    setEnabled(Number(e.target.checked));
                  }}
                  name="enabled"
                  color="primary"
                  style={{ marginLeft: 20 }}
                />
              }
              label="Enabled"
            />
          </Grid>

          <Grid item xs={5}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid>
                <SearchIcon />
              </Grid>
              <Grid>
                <TextField
                  id="standard-search"
                  label="Search field"
                  type="search"
                  value={wordEnteredL}
                  onChange={handleFilterL}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <Grid container spacing={1} alignItems="flex-end">
              <Grid>
                <SearchIcon />
              </Grid>
              <Grid>
                <TextField
                  id="standard-search"
                  label="Search field"
                  type="search"
                  value={wordEnteredR}
                  onChange={handleFilterR}
                />
              </Grid>
            </Grid>
          </Grid>

          <Grid item xs={5}>
            <Typography className={classes.Subtitle}>
              List of Channel
            </Typography>
          </Grid>
          <Grid item xs={2}></Grid>
          <Grid item xs={5}>
            <Typography className={classes.Subtitle}>
              Package Channel
            </Typography>
          </Grid>

          <Grid item xs={5}>
            {customList(left, filteredDataL)}
          </Grid>
          <Grid item xs={2}>
            <Grid container direction="column" alignItems="center">
              <Button
                variant="outlined"
                className={classes.button}
                onClick={handleAllRight}
                disabled={left.length === 0}
                aria-label="move all right"
              >
                ≫
              </Button>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={handleCheckedRight}
                disabled={leftChecked.length === 0}
                aria-label="move selected right"
              >
                &gt;
              </Button>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={handleCheckedLeft}
                disabled={rightChecked.length === 0}
                aria-label="move selected left"
              >
                &lt;
              </Button>
              <Button
                variant="outlined"
                className={classes.button}
                onClick={handleAllLeft}
                disabled={right.length === 0}
                aria-label="move all left"
              >
                ≪
              </Button>
            </Grid>
          </Grid>
          <Grid item xs={5}>
            {customList(right, filteredDataR)}
          </Grid>

          <Grid item xs={12}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}
            >
              <div style={{ paddingRight: '10px' }}>
                <Button
                  variant="contained"
                  style={{ backgroundColor: GREEN, width: 200 }}
                  onClick={handleUpdatePackage}
                >
                  Update
                </Button>
              </div>
              <div>
                <Button
                  variant="contained"
                  style={{ backgroundColor: LIGHT_GREY, width: 200 }}
                  onClick={() => {
                    history.push('/ManagePackageStreams');
                  }}
                >
                  Back
                </Button>
              </div>
            </div>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
}
