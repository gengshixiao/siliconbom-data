// 工作台逻辑

document.addEventListener('DOMContentLoaded', () => {
  // 初始化图表
  initCharts();
});

// 初始化图表
function initCharts() {
  initQueryTrendChart();
  initQueryResultChart();
}

// 初始化查询次数趋势图
function initQueryTrendChart() {
  const chartDom = document.getElementById('queryTrendChart');
  if (!chartDom) return;
  
  // 确保 ECharts 已加载
  if (typeof echarts === 'undefined') {
    console.error('ECharts 未加载');
    return;
  }
  
  const myChart = echarts.init(chartDom);
  
  // 生成30天的模拟数据
  const dates = [];
  const successData = [];
  const emptyData = [];
  const failData = [];
  const totalData = [];
  
  const now = new Date();
  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    dates.push(date.toISOString().split('T')[0]);
    
    // 生成模拟数据，基于原SVG图表的趋势
    const baseSuccess = 2000 + Math.random() * 500;
    const baseEmpty = 600 + Math.random() * 200;
    const baseFail = 300 + Math.random() * 100;
    
    successData.push(Math.round(baseSuccess));
    emptyData.push(Math.round(baseEmpty));
    failData.push(Math.round(baseFail));
    totalData.push(Math.round(baseSuccess + baseEmpty + baseFail));
  }
  
  // 获取CSS变量的实际值
  const getCSSVariable = (varName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  };
  
  // 根据主题获取颜色
  const getColors = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return {
      text: getCSSVariable('--text') || (isLight ? '#1d1d1f' : '#e9e9ea'),
      muted: getCSSVariable('--muted') || (isLight ? '#6e6e73' : '#a8aaad'),
      stroke: getCSSVariable('--stroke') || (isLight ? '#e5e5e7' : '#3a3b3e'),
      stroke2: getCSSVariable('--stroke2') || (isLight ? '#d1d1d3' : '#343538'),
      panel2: getCSSVariable('--panel2') || (isLight ? '#fafafa' : '#252628'),
      a1: getCSSVariable('--a1') || (isLight ? '#5a8a96' : '#7aa7b3'),
      isLight: isLight
    };
  };
  
  const createOption = () => {
    const colors = getColors();
    const isLight = colors.isLight;
    
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        backgroundColor: isLight ? '#ffffff' : '#2a2b2d',
        borderColor: colors.stroke,
        textStyle: {
          color: colors.text
        },
        confine: true,
        position: function (point, params, dom, rect, size) {
          // point: 鼠标位置
          // size: 提示框大小 {contentSize: [width, height], viewSize: [width, height]}
          const x = point[0];
          const y = point[1];
          const viewWidth = size.viewSize[0];
          const viewHeight = size.viewSize[1];
          const boxWidth = size.contentSize[0];
          const boxHeight = size.contentSize[1];
          
          let posX = x + 10;
          let posY = y + 10;
          
          // 如果右侧空间不够，显示在左侧
          if (posX + boxWidth > viewWidth) {
            posX = x - boxWidth - 10;
          }
          
          // 如果下方空间不够，显示在上方
          if (posY + boxHeight > viewHeight) {
            posY = y - boxHeight - 10;
          }
          
          // 确保不超出边界
          posX = Math.max(5, Math.min(posX, viewWidth - boxWidth - 5));
          posY = Math.max(5, Math.min(posY, viewHeight - boxHeight - 5));
          
          return [posX, posY];
        }
      },
      legend: {
        data: ['成功（非空）', '空值', '失败', '总查询'],
        textStyle: {
          color: colors.text,
          fontSize: 12
        },
        top: 10,
        itemGap: 16,
        itemWidth: 14,
        itemHeight: 10
      },
      grid: {
        left: 60,
        right: 30,
        bottom: 90,
        top: 50
      },
      dataZoom: [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: 100,
          height: 26,
          bottom: 20,
          textStyle: {
            color: colors.text,
            fontSize: 11
          },
          borderColor: colors.stroke,
          fillerColor: isLight ? 'rgba(90,138,150,0.15)' : 'rgba(122,167,179,0.2)',
          handleStyle: {
            color: colors.a1,
            borderWidth: 1
          },
          moveHandleSize: 10,
          showDetail: true,
          showDataShadow: true,
          zoomLock: false,
          brushSelect: false,
          dataBackground: {
            areaStyle: {
              color: colors.panel2
            },
            lineStyle: {
              color: colors.stroke
            }
          },
          selectedDataBackground: {
            areaStyle: {
              color: isLight ? 'rgba(90,138,150,0.1)' : 'rgba(122,167,179,0.1)'
            },
            lineStyle: {
              color: colors.a1
            }
          }
        },
        {
          type: 'inside',
          xAxisIndex: [0],
          start: 0,
          end: 100
        }
      ],
      xAxis: {
        type: 'time',
        boundaryGap: false,
        axisLabel: {
          color: colors.muted,
          fontSize: 11,
          margin: 10,
          formatter: function(value) {
            const date = new Date(value);
            return (date.getMonth() + 1) + '/' + date.getDate();
          }
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: colors.stroke,
            width: 1
          }
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: false
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: colors.muted,
          fontSize: 11,
          margin: 8
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: colors.stroke2,
            type: 'dashed',
            width: 1
          }
        }
      },
      series: [
        {
          name: '失败',
          type: 'line',
          stack: 'total',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: isLight ? 'rgba(166,91,91,0.25)' : 'rgba(198,123,123,0.3)' },
                { offset: 1, color: isLight ? 'rgba(166,91,91,0)' : 'rgba(198,123,123,0)' }
              ]
            }
          },
          lineStyle: {
            color: isLight ? 'rgba(166,91,91,0.75)' : 'rgba(198,123,123,0.75)',
            width: 2
          },
          itemStyle: {
            color: isLight ? 'rgba(166,91,91,0.75)' : 'rgba(198,123,123,0.75)'
          },
          smooth: true,
          data: dates.map((date, index) => [date, failData[index]])
        },
        {
          name: '空值',
          type: 'line',
          stack: 'total',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: isLight ? 'rgba(160,133,75,0.2)' : 'rgba(192,165,107,0.3)' },
                { offset: 1, color: isLight ? 'rgba(160,133,75,0)' : 'rgba(192,165,107,0)' }
              ]
            }
          },
          lineStyle: {
            color: isLight ? 'rgba(160,133,75,0.78)' : 'rgba(192,165,107,0.78)',
            width: 2
          },
          itemStyle: {
            color: isLight ? 'rgba(160,133,75,0.78)' : 'rgba(192,165,107,0.78)'
          },
          smooth: true,
          data: dates.map((date, index) => [date, emptyData[index] + failData[index]])
        },
        {
          name: '成功（非空）',
          type: 'line',
          stack: 'total',
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: isLight ? 'rgba(90,138,150,0.25)' : 'rgba(122,167,179,0.3)' },
                { offset: 1, color: isLight ? 'rgba(90,138,150,0)' : 'rgba(122,167,179,0)' }
              ]
            }
          },
          lineStyle: {
            color: isLight ? 'rgba(90,138,150,0.65)' : 'rgba(122,167,179,0.65)',
            width: 2
          },
          itemStyle: {
            color: isLight ? 'rgba(90,138,150,0.65)' : 'rgba(122,167,179,0.65)'
          },
          smooth: true,
          data: dates.map((date, index) => [date, successData[index] + emptyData[index] + failData[index]])
        },
        {
          name: '总查询',
          type: 'line',
          lineStyle: {
            color: isLight ? 'rgba(29,29,31,0.55)' : 'rgba(233,233,234,0.55)',
            width: 2.2
          },
          itemStyle: {
            color: isLight ? 'rgba(29,29,31,0.55)' : 'rgba(233,233,234,0.55)'
          },
          symbol: 'none',
          smooth: true,
          data: dates.map((date, index) => [date, totalData[index]])
        }
      ]
    };
  };
  
  // 设置初始配置
  myChart.setOption(createOption());
  
  // 监听主题变化
  const observer = new MutationObserver(() => {
    setTimeout(() => {
      myChart.setOption(createOption(), true);
    }, 50);
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
  
  // 响应式调整
  window.addEventListener('resize', () => {
    myChart.resize();
  });
}

// 初始化查询结果分布饼图
function initQueryResultChart() {
  const chartDom = document.getElementById('queryResultChart');
  if (!chartDom) return;
  
  // 确保 ECharts 已加载
  if (typeof echarts === 'undefined') {
    console.error('ECharts 未加载');
    return;
  }
  
  const myChart = echarts.init(chartDom);
  
  // 获取CSS变量的实际值
  const getCSSVariable = (varName) => {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  };
  
  // 根据主题获取颜色
  const getColors = () => {
    const isLight = document.documentElement.getAttribute('data-theme') === 'light';
    return {
      text: getCSSVariable('--text') || (isLight ? '#1d1d1f' : '#e9e9ea'),
      success: isLight ? 'rgba(90,138,150,0.85)' : 'rgba(122,167,179,0.85)',
      empty: isLight ? 'rgba(160,133,75,0.85)' : 'rgba(192,165,107,0.85)',
      fail: isLight ? 'rgba(166,91,91,0.85)' : 'rgba(198,123,123,0.85)',
      isLight: isLight
    };
  };
  
  const createOption = () => {
    const colors = getColors();
    
    return {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)',
        backgroundColor: colors.isLight ? '#ffffff' : '#2a2b2d',
        borderColor: getCSSVariable('--stroke'),
        textStyle: {
          color: colors.text
        }
      },
      legend: {
        orient: 'horizontal',
        bottom: 0,
        left: 'center',
        textStyle: {
          color: colors.text,
          fontSize: 11
        },
        itemWidth: 10,
        itemHeight: 10,
        itemGap: 12
      },
      series: [
        {
          name: '查询结果',
          type: 'pie',
          radius: ['45%', '70%'],
          center: ['50%', '45%'],
          avoidLabelOverlap: true,
          itemStyle: {
            borderRadius: 4,
            borderColor: colors.isLight ? '#ffffff' : '#2a2b2d',
            borderWidth: 2
          },
          label: {
            show: true,
            position: 'outside',
            formatter: '{d}%',
            fontSize: 12,
            color: colors.text,
            fontWeight: 'bold'
          },
          labelLine: {
            show: true,
            length: 8,
            length2: 8,
            lineStyle: {
              color: colors.text,
              width: 1
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: 14,
              fontWeight: 'bold'
            },
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.3)'
            }
          },
          data: [
            { 
              value: 61324, 
              name: '成功',
              itemStyle: { color: colors.success }
            },
            { 
              value: 21106, 
              name: '空值',
              itemStyle: { color: colors.empty }
            },
            { 
              value: 10180, 
              name: '失败',
              itemStyle: { color: colors.fail }
            }
          ]
        }
      ]
    };
  };
  
  // 设置初始配置
  myChart.setOption(createOption());
  
  // 监听主题变化
  const observer = new MutationObserver(() => {
    setTimeout(() => {
      myChart.setOption(createOption(), true);
    }, 50);
  });
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme']
  });
  
  // 响应式调整
  window.addEventListener('resize', () => {
    myChart.resize();
  });
}


