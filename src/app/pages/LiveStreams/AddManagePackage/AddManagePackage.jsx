import {
  Button,
  Checkbox,
  Container,
  CssBaseline,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  TextField,
  Typography,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GREEN, LIGHT_GREY } from 'utils/constant/color';
import { arraySetIntersection, arraySetNot } from 'utils/helper';
import useStyles from './styles';

export default function AddChannelPackage() {
  const classes = useStyles();
  const history = useHistory();
  const { register, handleSubmit, getValues } = useForm();

  const onSubmit = data => {};

  const [name, setName] = useState('');
  const [listChannel, setListChannel] = useState([]);
  const [checked, setChecked] = useState([]);
  const [left, setLeft] = useState([]);
  const [right, setRight] = useState([]);
  const [channel, setChannel] = useState([]);
  const [leftChecked, setLeftChecked] = useState([]);
  const [rightChecked, setRightChecked] = useState([]);

  useEffect(() => {
    apis.getChannelStream().then(res => {
      const result = res.data;
      setListChannel(result);

      setLeft(result);
    });
  }, []);
  const handleAddPackage = () => {
    let channel_id = [];
    for (var i = 0; i < listChannel.length; i++) {
      for (var j = 0; j < right.length; j++) {
        if (right[j].name === listChannel[i].name) {
          channel_id.push(listChannel[i].channel_id);
        }
      }
    }
    setChannel(channel_id);

    apis.addChannelPackage(getValues('Name'), 1, channel_id).then(res => {
      toast('Successfully added', {
        position: 'top-right',
        autoClose: 2000,
      });
      history.push('/ManagePackageStreams');
    });
  };

  const handleToggle = value => {
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
    const allChannels = [...left];
    const selectedChannels = [...right];
    setRight(selectedChannels.concat(allChannels));
    setLeft([]);
  };

  useEffect(() => {
    const allChannels = [...left];
    const selectedChannels = [...right];
    const checkedChannels = [...checked];
    setLeftChecked(arraySetIntersection(checkedChannels, allChannels));
    setRightChecked(arraySetIntersection(checkedChannels, selectedChannels));
  }, [left, right, checked]);

  const handleCheckedRight = () => {
    const allChannels = [...left];
    const selectedChannels = [...right];
    const checkedChannels = [...checked];

    setRight(selectedChannels.concat([...leftChecked]));
    setLeft(arraySetNot(allChannels, [...leftChecked]));
    setChecked(arraySetNot(checkedChannels, leftChecked));
  };

  const handleCheckedLeft = () => {
    const allChannels = [...left];
    const selectedChannels = [...right];
    const checkedChannels = [...checked];

    setLeft(allChannels.concat([...rightChecked]));
    setRight(arraySetNot(selectedChannels, [...rightChecked]));
    setChecked(arraySetNot(checkedChannels, [...rightChecked]));
  };

  const handleAllLeft = () => {
    const allChannels = [...left];
    const selectedChannels = [...right];
    setLeft(allChannels.concat(selectedChannels));
    setRight([]);
  };

  const [filteredDataL, setFilteredDataL] = useState([]);
  const [wordEnteredL, setWordEnteredL] = useState('');

  const [filteredDataR, setFilteredDataR] = useState([]);
  const [wordEnteredR, setWordEnteredR] = useState('');

  const handleFilterL = event => {
    const searchWord = event.target.value;
    setWordEnteredL(searchWord);
    const newFilter = [...left].filter(value => {
      return 'suresh';
    });

    // if (searchWord === '') {
    //   setFilteredDataL([]);
    // } else {
    //   setFilteredDataL(newFilter);
    // }
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

  const customList = (items, filteredData) => (
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
                  onClick={() => handleToggle(value)}
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
                  key={value.channel_id}
                  role="listitem"
                  button
                  onClick={() => handleToggle(value)}
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

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={classes.paper}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h5" className={classes.title}>
                Add Channel Package
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
                size="small"
                {...register('Name', { required: true })}
              />
            </Grid>

            <Grid item xs={5}>
              <Grid container spacing={1} alignItems="flex-end">
                <Grid>
                  <Search />
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
                  <Search />
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
              <Typography className={classes.Subtitle} required fullWidth>
                List of Channels
              </Typography>
            </Grid>

            <Grid item xs={2}></Grid>

            <Grid item xs={5}>
              <Typography className={classes.Subtitle} required fullWidth>
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
                  required
                  fullWidth
                  className={classes.button}
                  onClick={handleAllRight}
                  disabled={left.length === 0}
                  aria-label="move all right"
                >
                  ≫
                </Button>
                <Button
                  variant="outlined"
                  required
                  fullWidth
                  className={classes.button}
                  onClick={handleCheckedRight}
                  disabled={leftChecked?.length === 0}
                  aria-label="move selected right"
                >
                  &gt;
                </Button>
                <Button
                  variant="outlined"
                  required
                  fullWidth
                  className={classes.button}
                  onClick={handleCheckedLeft}
                  disabled={rightChecked.length === 0}
                  aria-label="move selected left"
                >
                  &lt;
                </Button>
                <Button
                  variant="outlined"
                  required
                  fullWidth
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
                    // type="submit"
                    required
                    fullWidth
                    variant="contained"
                    style={{ backgroundColor: GREEN, width: 200 }}
                    onClick={handleAddPackage}
                  >
                    Create
                  </Button>
                </div>
                <div>
                  <Button
                    required
                    fullWidth
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
      </form>
    </Container>
  );
}
