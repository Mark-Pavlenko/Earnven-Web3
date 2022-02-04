import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';
import axios from 'axios';
import ApexCharts from 'apexcharts';
import './darkThemeChart.css';

export default class DarkThemeChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      account: '',
      // hideFilter: false,
      series: [],
      options: {
        chart: {
          id: 'area-datetime',
          type: 'line',
          height: 'auto',
          zoom: {
            autoScaleYAxis: true,
          },
          sparkline: {
            // enabled: true,
          },
          toolbar: {
            show: false,
          },
        },
        dataLabels: {
          enabled: false,
          style: {
            colors: ['#000000'],
          },
        },
        legend: {},
        xaxis: {
          type: 'datetime',
          axisBorder: {
            show: true,
            color: 'rgba(255,255,255, 0.03)',
            height: 1,
            width: '100%',
          },
          axisTicks: {
            show: true,
            borderType: 'solid',
            color: 'rgba(255,255,255, 0.03)',
          },
          labels: {
            // show: true,
            style: {
              fontSize: '10px',
              colors: 'white',
              fontWeight: 400,
              opacity: 0.7,
            },
          },
        },
        yaxis: {
          labels: {
            // show: true,
            formatter: function (val) {
              if (val > 999999) {
                return val / 1000000 + 'M';
              } else if (val < 1000000) {
                return val / 1000 + 'k';
              } else if (val < 1001 || val === 0) {
                return val;
              }
            },
            style: {
              fontSize: '10px',
              colors: 'white',
              fontWeight: 400,
              opacity: 0.7,
            },
          },
        },
        grid: {
          position: 'back',
          borderColor: 'rgba(255,255,255, 0.03)',
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        tooltip: {
          // enabled: false,
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
              '<div class="hover-info"><div class="hover-date">' +
              currentDate.toLocaleDateString() +
              '</div><div class="hover-price">' +
              '$' +
              CommaFormatted(series[seriesIndex][dataPointIndex]) +
              '</div ></div >'
            );
          },
        },
        stroke: {
          show: true,
          curve: 'smooth',
          lineCap: 'butt',
          colors: ['blue'],
          width: 3,
          dashArray: 0,
        },
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.3,
            opacityTo: 1,
            colorStops: [
              {
                offset: 0,
                color: '#B054A0',
                opacity: 0.3,
              },
              {
                offset: 50,
                color: '#B054A0',
                opacity: 0.6,
              },
              {
                offset: 60,
                color: '#B054A0',
                opacity: 1,
              },
              {
                offset: 100,
                color: '#1400FF',
                opacity: 1,
              },
            ],
          },
        },
        title: {
          text: this.props.totalValue,
          align: 'left',
          // margin: 20,
          offsetX: -10,
          offsetY: -15,
          floating: false,
          style: {
            fontSize: '40px',
            fontWeight: 600,
            fontFamily: 'saira',
            color: 'white',
          },
        },
        subtitle: {
          text: this.props.difValue,
          align: 'left',
          offsetX: this.props.totalValue.split('').length * 21 + 10,
          offsetY: -2,
          floating: false,
          style: {
            fontSize: '26px',
            fontWeight: 600,
            fontFamily: 'saira',
            color: '#00DFD1',
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
        selection: 'one_hour',
      },
    };
  }

  componentWillMount() {
    this.getTokenChartHistory();
  }

  componentDidUpdate() {
    if (this.state.account !== this.props.address) {
      this.getTokenChartHistory();
    }
    if (
      this.state.options.subtitle.text !== this.props.difValue ||
      this.state.options.title.text !== this.props.totalValue
    ) {
      this.setState(() => {
        return {
          ...this.state,
          options: {
            ...this.state.options,
            title: {
              ...this.state.options.title,
              text: this.props.totalValue,
            },
            subtitle: {
              ...this.state.options.subtitle,
              text: this.props.difValue,
              offsetX: this.props.totalValue.split('').length * 21 + 10,
            },
          },
        };
      });
    }
  }

  componentDidMount() {
    this.setState({
      selection: 'all',
    });
  }

  getTokenChartHistory = async () => {
    var data = [];
    let points = [];
    let result = [];
    let c = {};
    const path = `https://api.coingecko.com/api/v3/coins/${
      this.props.tokenId
    }/market_chart/range?vs_currency=usd&from=1200000000&to=${new Date().getTime()}`;
    await axios.get(path, {}).then(async (response) => {
      result = response.data.prices;
      console.log(response, new Date());
      if (result && result.length > 0) {
        for (let i = 0; i < result.length; i++) {
          var temp = [];
          temp.push(new Date(result[i][0]));
          temp.push(result[i][1].toFixed(2));
          data.push(temp);
        }
      }
      c = { data };
      // points
      points.push(c);
      this.setState({ series: points });
    });
  };

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
      const oneHourBackDate = new Date();
      const oneDayBackDate = new Date();
      const oneWeekBackDate = new Date();
      const oneMonthBackDate = new Date();
      const oneYearBackDate = new Date();

      oneHourBackDate.setTime(new Date(+lastDay.getTime() - 3600 * 1000));
      oneDayBackDate.setTime(new Date(+lastDay.getTime() - 24 * 3600 * 1000));
      oneWeekBackDate.setTime(new Date(+lastDay.getTime() - 24 * 7 * 3600 * 1000));
      oneMonthBackDate.setMonth(lastDay.getMonth() - 1);
      oneYearBackDate.setFullYear(lastDay.getFullYear() - 1);
      const accountAgeInMonths = this.monthDiff(firstDay, lastDay);

      this.setState({
        selection: timeline,
      });

      switch (timeline) {
        case 'one_hour':
          if (accountAgeInMonths >= 1) {
            ApexCharts.exec('area-datetime', 'zoomX', oneHourBackDate.getTime(), lastDay.getTime());
          } else {
            ApexCharts.exec('area-datetime', 'zoomX', firstDay.getTime(), lastDay.getTime());
          }

          break;

        case 'one_week':
          if (accountAgeInMonths >= 1) {
            ApexCharts.exec('area-datetime', 'zoomX', oneWeekBackDate.getTime(), lastDay.getTime());
          } else {
            ApexCharts.exec('area-datetime', 'zoomX', firstDay.getTime(), lastDay.getTime());
          }

          break;

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
      <div className="chart-wrapper" style={{ background: 'transparent', boxShadow: 'none' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div className="net-worth">Net worth</div>
          <div>
            <button
              id="one_hour"
              onClick={() => this.updateData('one_hour')}
              className={this.state.selection === 'one_hour' ? 'dark-active' : 'change-buttons'}>
              1H
            </button>
            &nbsp;
            <button
              id="ytd"
              onClick={() => this.updateData('ytd')}
              className={this.state.selection === 'ytd' ? 'dark-active' : 'change-buttons'}>
              1D
            </button>{' '}
            <button
              id="one_week"
              onClick={() => this.updateData('one_week')}
              className={this.state.selection === 'one_week' ? 'dark-active' : 'change-buttons'}>
              1W
            </button>{' '}
            &nbsp;
            <button
              id="one_month"
              onClick={() => this.updateData('one_month')}
              className={this.state.selection === 'one_month' ? 'dark-active' : 'change-buttons'}>
              1M
            </button>
            &nbsp;
            <button
              id="one_year"
              onClick={() => this.updateData('one_year')}
              className={this.state.selection === 'one_year' ? 'dark-active' : 'change-buttons'}>
              1Y
            </button>
            <button
              id="all"
              onClick={() => this.updateData('all')}
              className={this.state.selection === 'all' ? 'dark-active' : 'change-buttons'}>
              ALL
            </button>
            &nbsp;
          </div>
        </div>
        <div id="chart" className="chart">
          <div className="chart-timeline" style={{ float: 'left' }}>
            <ReactApexChart
              options={this.state.options}
              series={this.state.series}
              type="line"
              height={350}
            />
          </div>
        </div>
      </div>
    );
  }
}
