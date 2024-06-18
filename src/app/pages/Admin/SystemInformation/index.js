import apis from 'app/api';
import React, { useEffect, useState } from 'react';
import useStyles from 'styles/globalStyles';
import { useHistory, useLocation } from 'react-router-dom';
import { Button, Container, CssBaseline, Grid } from '@material-ui/core';
import { GREEN } from 'utils/constant/color';import SingleMaterialTables from 'app/components/SingleDeleteTable2';

function SystemInformation() {
  const classes = useStyles();
  const history = useHistory();
  const [info, setInfo] = useState(null);
  const [Advertisment, setAdvertisment] = useState([]);

  const columns = [
    {
      field: 'url',
      title: 'Logo',
      render: rowData =>
        typeof rowData.url == 'string' ? (
          <img src={rowData.url} alt="" width={40} height={30} />
        ) : null,
    }]

  const getInfo = () => {
    apis.getSystemInfo().then(res => {
      let arr = res?.data;
      var object = arr.reduce(
        (obj, item) => Object.assign(obj, { [item.dataKey]: item.value }),
        {},
      );
      setInfo(object);
    });
  };

  useEffect(() => {
    getInfo();
    getTermsAndCondition();
  }, []);

  const getTermsAndCondition = () => {
    apis
      .getTermsAndCondition()
      .then(response => {
        setAdvertisment(response?.data);
      })
      .catch(error => {
        failureNotification('Network error');
      });
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
      }}
    >
      <div
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <div>
            <h3>System Information</h3>
            <hr />
          </div>
          <div
            style={{
              display: 'flex',
              flex: 0.6,
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: 0.5,
                  }}
                >
                  Product Name
                </div>
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                  }}
                >
                  : {info?.productName}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: 0.5,
                  }}
                >
                  DRM ID
                </div>
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                  }}
                >
                  : {info?.drmId}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: 0.5,
                    flexDirection: 'row',
                  }}
                >
                  Company Name
                </div>
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                  }}
                >
                  : {info?.companyName}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: 0.5,
                    flexDirection: 'row',
                  }}
                >
                  Software Version
                </div>
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                  }}
                >
                  : {info?.softwareVersion}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: 0.5,
                    flexDirection: 'row',
                  }}
                >
                  Installation Date
                </div>
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                  }}
                >
                  : {info?.installationDate}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: 0.5,
                    flexDirection: 'row',
                  }}
                >
                  Product Version
                </div>
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                  }}
                >
                  : {info?.productVersion}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flex: 0.4,
                flexDirection: 'row',
              }}
            >
              <div>
                <img
                  src={info?.companyLogo}
                  alt=""
                  style={{ paddingLeft: '10px', width: '100px' }}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
          }}
        >
          <div>
            <h3>Network Information</h3>
            <hr />
          </div>
          <div
            style={{
              display: 'flex',
              flex: 0.6,
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                display: 'flex',
                flex: 1,
                flexDirection: 'column',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: 0.5,
                  }}
                >
                  Network Id
                </div>
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                  }}
                >
                  : {info?.networkId}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: 0.5,
                    flexDirection: 'row',
                  }}
                >
                  Network Name
                </div>
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                  }}
                >
                  : {info?.networkName}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: 0.5,
                    flexDirection: 'row',
                  }}
                >
                  GST
                </div>
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                  }}
                >
                  : {info?.gst}
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 1,
                  flexDirection: 'row',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flex: 0.5,
                    flexDirection: 'row',
                  }}
                >
                  Address
                </div>
                <div
                  style={{
                    display: 'flex',
                    flex: 1,
                  }}
                >
                  : {info?.address}
                </div>
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                flex: 0.4,
                flexDirection: 'row',
              }}
            >
              <div>
                <img
                  src={info?.networkLogo}
                  alt=""
                  style={{ paddingLeft: '10px', width: '100px' }}
                />
              </div>
            </div>
          </div>
        </div>


        <div
          style={{
            display: 'flex',
            flex: 1,
            flexDirection: 'column',
            // backgroundColor:"blueviolet"
          }}
        >
          <div>
            <text style={{ fontSize: "16px", fontWeight: "600" }}>Terms and Conditions</text>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <Button
                variant="contained"
                style={{ backgroundColor: GREEN }}
                onClick={() => {
                  history.push('/TermsAndConditions');
                }}
              >
                Add Terms & Condition
              </Button>
            </div>
            <hr />
          </div>
          <div
            style={{
              display: 'flex',
              flex: 0.6,
              flexDirection: 'row',
            }}
          >
            <div
              style={{
                display: 'flex',
                flex: 0.9,
                flexDirection: 'row',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flex: 0.2,
                }}
              >
              </div>
              <div
                style={{
                  display: 'flex',
                  flex: 0.9,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
               
              >
              
              </div>

              <Grid item xs={12}>
                <SingleMaterialTables
                  title={' Terms & Condition'}
                  columns={columns}
                  data={Advertisment}
                />
              </Grid>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SystemInformation;
