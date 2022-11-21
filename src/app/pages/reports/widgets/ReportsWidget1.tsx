/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {useEffect, useRef, useState} from 'react'
import ApexCharts, {ApexOptions} from 'apexcharts'
import { KTSVG } from '../../../../_metronic/helpers'
import { Dropdown1 } from '../../../../_metronic/partials/content/dropdown/Dropdown1'
import { getCSS, getCSSVariableValue } from '../../../../_metronic/assets/ts/_utils'
import { useThemeMode } from '../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider'
import { getReport } from '../core/_requests'

type Props = {
  className: string
}

const ReportsWidget1: React.FC<Props> = ({ className }) => {
    const [selectedAuditCategories, setSelectedAuditCategories] = useState('')
    const [selectedQuestionCategories, setSelectedQuestionCategories] = useState('')
    const [selectedDepartments, setSelectedDepartments] = useState('')
    const [selectedSections, setSelectedSections] = useState('')
  const chartRef = useRef<HTMLDivElement | null>(null)
  const {mode} = useThemeMode()

  const [reportsInfo, setReportsInfo] = useState<any>([])

  useEffect(() => {
    const chart = refreshChart(reportsInfo)

    return () => {
      if (chart) {
        chart.destroy()
      }
    }
  }, [chartRef, mode, reportsInfo])

  useEffect(() => {
      getReport(selectedAuditCategories).then((res: any) => {
      setReportsInfo([...res?.data])
    })
  }, [])

  const refreshChart = (reportsInfo: any) => {
    if (!chartRef.current) {
      return
    }

    const height = parseInt(getCSS(chartRef.current, 'height'))

    const chart = new ApexCharts(chartRef.current, getChartOptions(height, reportsInfo))
    if (chart) {
      chart.render()
    }

    return chart
  }

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className='card-header border-0 pt-5'>
        {/* begin::Title */}
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Percentage Report</span>

          {/* <span className='text-muted fw-semibold fs-7'>This month</span> */}
        </h3>
        {/* end::Title */}
        
        {/* begin::Toolbar */}
        <div className='card-toolbar'>
          {/* end::Menu */}
        </div>
        {/* end::Toolbar */}
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className='card-body'>
        {/* begin::Chart */}
        <div ref={chartRef} id='kt_charts_widget_1_chart' style={{height: '350px'}} />
        {/* end::Chart */}
      </div>
      {/* end::Body */}
    </div>
  )
}

export { ReportsWidget1}

function getChartOptions(height: number, reportsInfo: any): ApexOptions {
  const labelColor = getCSSVariableValue('--kt-gray-500')
  const borderColor = getCSSVariableValue('--kt-gray-200')
  const baseColor = getCSSVariableValue('--kt-primary')
  const secondaryColor = getCSSVariableValue('--kt-gray-300')

  const series: any = []
  if (reportsInfo.length >= 12) {
    /*
    "finished": 0,
    "notStarted": 100,
    "inProgress": 0,
    "cancelled": 0,
    */
    series.push({
      name: 'Finished Percentage',
      data: [
        reportsInfo[0]?.finished || 0,
        reportsInfo[1]?.finished || 0,
        reportsInfo[2]?.finished || 0,
        reportsInfo[3]?.finished || 0,
        reportsInfo[4]?.finished || 0,
        reportsInfo[5]?.finished || 0,
        reportsInfo[6]?.finished || 0,
        reportsInfo[7]?.finished || 0,
        reportsInfo[8]?.finished || 0,
        reportsInfo[9]?.finished || 0,
        reportsInfo[10]?.finished || 0,
        reportsInfo[11]?.finished || 0,
      ],
    })
    series.push({
      name: 'Not Started',
      data: [
        reportsInfo[0]?.notStarted || 0,
        reportsInfo[1]?.notStarted || 0,
        reportsInfo[2]?.notStarted || 0,
        reportsInfo[3]?.notStarted || 0,
        reportsInfo[4]?.notStarted || 0,
        reportsInfo[5]?.notStarted || 0,
        reportsInfo[6]?.notStarted || 0,
        reportsInfo[7]?.notStarted || 0,
        reportsInfo[8]?.notStarted || 0,
        reportsInfo[9]?.notStarted || 0,
        reportsInfo[10]?.notStarted || 0,
        reportsInfo[11]?.notStarted || 0,
      ],
    })
    series.push({
      name: 'In Progress',
      data: [
        reportsInfo[0]?.inProgress || 0,
        reportsInfo[1]?.inProgress || 0,
        reportsInfo[2]?.inProgress || 0,
        reportsInfo[3]?.inProgress || 0,
        reportsInfo[4]?.inProgress || 0,
        reportsInfo[5]?.inProgress || 0,
        reportsInfo[6]?.inProgress || 0,
        reportsInfo[7]?.inProgress || 0,
        reportsInfo[8]?.inProgress || 0,
        reportsInfo[9]?.inProgress || 0,
        reportsInfo[10]?.inProgress || 0,
        reportsInfo[11]?.inProgress || 0,
      ],
    })
    series.push({
      name: 'Cancelled',
      data: [
        reportsInfo[0]?.cancelled || 0,
        reportsInfo[1]?.cancelled || 0,
        reportsInfo[2]?.cancelled || 0,
        reportsInfo[3]?.cancelled || 0,
        reportsInfo[4]?.cancelled || 0,
        reportsInfo[5]?.cancelled || 0,
        reportsInfo[6]?.cancelled || 0,
        reportsInfo[7]?.cancelled || 0,
        reportsInfo[8]?.cancelled || 0,
        reportsInfo[9]?.cancelled || 0,
        reportsInfo[10]?.cancelled || 0,
        reportsInfo[11]?.cancelled || 0,
      ],
    })
  }
  return {
    series: series,
    chart: {
      fontFamily: 'inherit',
      type: 'bar',
      height: height,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '30%',
        borderRadius: 5,
      },
    },
    legend: {
      show: false,
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent'],
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: labelColor,
          fontSize: '12px',
        },
      },
    },
    fill: {
      opacity: 1,
    },
    states: {
      normal: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      hover: {
        filter: {
          type: 'none',
          value: 0,
        },
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'none',
          value: 0,
        },
      },
    },
    tooltip: {
      style: {
        fontSize: '12px',
      },
      y: {
        formatter: function (val) {
          return val + ' %'
        },
      },
    },
    colors: [baseColor, secondaryColor],
    grid: {
      borderColor: borderColor,
      strokeDashArray: 4,
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  }
}
