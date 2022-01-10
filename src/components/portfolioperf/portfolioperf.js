import React, { Component } from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import './portfolioperf.css';
import axios from 'axios';
import { Button } from '@material-ui/core';

export default class PortfolioPerf extends Component {
  componentWillMount() {
    this.getAddressChartHistory();
  }

  componentDidUpdate() {
    if (this.state.account !== this.props.address) {
      this.getAddressChartHistory();
    }
    if (this.state.options.title.text !== this.props.totalValue) {
      this.setState(() => {
        return {
          ...this.state,
          options: {
            ...this.state.options,
            title: {
              ...this.state.options.title,
              text: this.props.totalValue,
            },
          },
        };
      });
    }
  }

  // Will return history of ethereum account address
  getAddressChartHistory = async () => {
    var data = [];
    let points = [];
    let result = [];
    let c = {};
    const accountAddress = this.props.address;
    this.setState({ account: this.props.address });
    const path =
      'https://api2.ethplorer.io/getAddressChartHistory/' +
      accountAddress +
      '?apiKey=ethplorer.widget';
    await axios.get(path, {}, {}).then(async (response) => {
      result = response.data.history.data;

      if (result && result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          var temp = [];
          temp.push(result[i].date);
          temp.push(result[i].max.toFixed(2));
          data.push(temp);
        }
      }
      c = { data };
      // points
      points.push(c);
      this.setState({ series: points });
    });
  };

  constructor(props) {
    super(props);
    this.state = {
      account: '',
      // hideFilter: false,
      series: [],
      options: {
        chart: {
          id: 'area-datetime',
          type: 'area',
          height: 'auto',
          zoom: {
            autoScaleYAxis: true,
          },
          sparkline: {
            enabled: true,
          },
          toolbar: {
            show: false,
          },
        },
        /* annotations: {
                            yaxis: [{
                                y: 30,
                                borderColor: '#999',
                                label: {
                                    show: true,
                                    text: 'Support',
                                    style: {
                                        color: "#fff",
                                        background: '#00E396'
                                    }
                                }
                            }],
                            xaxis: [{
                                x: new Date('14 Nov 2012').getTime(),
                                borderColor: '#999',
                                yAxisIndex: 0,
                                label: {
                                    show: true,
                                    text: 'Rally',
                                    style: {
                                        color: "#fff",
                                        background: '#775DD0'
                                    }
                                }
                            }]
                        }, */

        dataLabels: {
          enabled: false,
          style: {
            colors: ['#000000'],
          },
        },
        legend: {},
        markers: {
          size: 0,
          style: 'hollow',
        },
        xaxis: {
          type: 'datetime',
          // min: new Date('17 Jan 2020').getTime(),
          tickAmount: 0,
          labels: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },
        yaxis: {
          labels: {
            show: false,
          },
        },
        grid: {
          show: false,
          xaxis: {
            lines: {
              show: false,
            },
          },
          yaxis: {
            lines: {
              show: false,
            },
          },
        },

        tooltip: {
          // x: {
          //     format: 'dd MMM yyyy'
          // },
          // y: {
          //     formatter: undefined,
          //     title: {
          //         formatter: (seriesName) => '$',
          //     },
          // },

          custom: function ({ series, seriesIndex, dataPointIndex, w }) {
            function CommaFormatted(amount) {
              amount = amount.toString();
              var delimiter = ','; // replace comma if desired
              var ab = amount.split('.', 2);
              var d = [];
              if (ab[1] !== undefined) {
                d = ab[1];
              }
              let i = parseInt(ab[0]);
              if (isNaN(i)) {
                return '';
              }
              let minus = '';
              if (i < 0) {
                minus = '-';
              }
              i = Math.abs(i);
              var n = i.toString();
              var a = [];
              while (n.length > 3) {
                var nn = n.substr(n.length - 3);
                a.unshift(nn);
                n = n.substr(0, n.length - 3);
              }
              if (n.length > 0) {
                a.unshift(n);
              }
              n = a.join(delimiter);
              if (d.length < 1) {
                amount = n;
              } else {
                amount = n + '.' + d;
              }
              amount = minus + amount;
              return amount;
            }

            const currentDate = new Date(w.globals.seriesX[0][dataPointIndex]);
            return (
              '<div><h3>' +
              '$' +
              CommaFormatted(series[seriesIndex][dataPointIndex]) +
              '</h3 ><h5>' +
              currentDate.toLocaleDateString() +
              '</h5></div >'
            );
          },
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          colors: ['blue'],
          width: 2,
          dashArray: 0,
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            type: 'horizontal',
            shadeIntensity: 0.5,
            gradientToColors: ['gray', 'red'],
            colorStops: [
              {
                offset: 0,
                color: 'transparent',
                opacity: 1,
              },
              {
                offset: 50,
                color: 'transparent',
                opacity: 1,
              },
              {
                offset: 100,
                color: 'transparent',
                opacity: 1,
              },
            ], // optional, if not defined - uses the shades of same color in series
            inverseColors: true,
            opacityFrom: 1,
            opacityTo: 1,
            stops: [0, 50, 100],
          },
        },
        title: {
          text: this.props.totalValue,
          align: 'left',
          margin: 20,
          offsetX: 15,
          offsetY: -15,
          floating: false,
          style: {
            fontSize: '40px',
            fontWeight: 600,
            fontFamily: 'saira',
            color: '#4453AD',
          },
        },
        noData: {
          text: 'Your wallet is empty',
          align: 'center',
          verticalAlign: 'middle',
          offsetX: 0,
          offsetY: 0,
          style: {
            color: '#fff',
            fontSize: '14px',
            fontFamily: undefined,
          },
        },
        selection: 'one_month',
      },
    };
  }

  monthDiff(d1, d2) {
    var months;
    months = (d2.getFullYear() - d1.getFullYear()) * 12;
    months -= d1.getMonth();
    months += d2.getMonth();
    return months <= 0 ? 0 : months;
  }

  updateData(timeline) {
    if (this.state.series[0].data.length === 0) {
      // do smth.
    } else {
      const { length } = this.state.series[0].data;
      const firstDay = new Date(this.state.series[0].data[0][0]);
      const lastDay = new Date(this.state.series[0].data[length - 1][0]);
      const oneMonthBackDate = new Date();
      const oneDayBackDate = new Date();
      const oneYearBackDate = new Date();
      oneMonthBackDate.setMonth(lastDay.getMonth() - 1);
      oneDayBackDate.setDate(lastDay.getDate() - 2);
      oneYearBackDate.setFullYear(lastDay.getFullYear() - 1);
      const accountAgeInMonths = this.monthDiff(firstDay, lastDay);
      this.setState({
        selection: timeline,
      });

      switch (timeline) {
        case 'one_month':
          if (accountAgeInMonths >= 1) {
            ApexCharts.exec(
              'area-datetime',
              'zoomX',
              oneMonthBackDate.getTime(),
              lastDay.getTime()
            );
          } else {
            ApexCharts.exec('area-datetime', 'zoomX', firstDay.getTime(), lastDay.getTime());
          }

          break;

        case 'one_year':
          if (accountAgeInMonths >= 12) {
            ApexCharts.exec('area-datetime', 'zoomX', oneYearBackDate.getTime(), lastDay.getTime());
          } else {
            ApexCharts.exec('area-datetime', 'zoomX', firstDay.getTime(), lastDay.getTime());
          }
          break;
        case 'ytd':
          ApexCharts.exec('area-datetime', 'zoomX', oneDayBackDate.getTime(), lastDay.getTime());
          break;
        case 'all':
          ApexCharts.exec('area-datetime', 'zoomX', firstDay.getTime(), lastDay.getTime());
          break;
        default:
      }
    }
  }

  render() {
    return (
      <div
        style={{
          borderRadius: '10px',
          backgroundColor: 'rgba(255, 255, 255, 0.16',
          boxShadow: 'box-shadow: inset 2px 2px 4px rgba(255, 255, 255, 0.1)',
        }}>
        <div>
          <div style={{ textAlign: 'end' }}>
            {/* <button id="one_month"
                            onClick={() => this.updateData('one_month')} className={(this.state.selection === 'one_month' ? 'active' : '')}>
                            1M
                        </button> */}
            <Button
              id="one_month"
              variant="outlined"
              size="small"
              color="inherit"
              sx={{
                borderRadius: '10000px',
                border: 'none',
                minWidth: '34px',
                height: '20px',
                padding: '0px 8px',
                fontSize: '14px',
                color: '#1E1E20',
                fontWeight: 'normal',
              }}
              onClick={() => this.updateData('one_month')}
              className={this.state.selection === 'one_month' ? 'active' : ''}>
              1M
            </Button>
            &nbsp;
            <Button
              id="one_year"
              variant="outlined"
              size="small"
              color="inherit"
              sx={{
                borderRadius: '10000px',
                border: 'none',
                minWidth: '34px',
                height: '26px',
                padding: '0px 8px',
              }}
              onClick={() => this.updateData('one_year')}
              className={this.state.selection === 'one_year' ? 'active' : ''}>
              1Y
            </Button>
            &nbsp;
            <Button
              id="ytd"
              variant="outlined"
              size="small"
              color="inherit"
              sx={{
                borderRadius: '10000px',
                border: 'none',
                minWidth: '34px',
                height: '26px',
                padding: '0px 8px',
              }}
              onClick={() => this.updateData('ytd')}
              className={this.state.selection === 'ytd' ? 'active' : ''}>
              24H
            </Button>
            &nbsp;
            <Button
              id="all"
              variant="outlined"
              size="small"
              color="inherit"
              sx={{
                borderRadius: '10000px',
                border: 'none',
                minWidth: '34px',
                height: '26px',
                padding: '0px 8px',
              }}
              onClick={() => this.updateData('all')}
              className={this.state.selection === 'all' ? 'active' : ''}>
              ALL
            </Button>
            &nbsp;
          </div>
        </div>
        <div id="chart" className="chart">
          <div className="chart-timeline" style={{ float: 'left' }}>
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="area"
              height={250}
            />
          </div>
        </div>
      </div>
    );
  }
}
