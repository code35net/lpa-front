import {useIntl} from 'react-intl'
import {useEffect, useState} from 'react'
import {MenuComponent} from '../../../../../../_metronic/assets/ts/components'
import {
  initialQueryState,
  KTSVG,
  QUERIES,
  stringifyRequestQuery,
} from '../../../../../../_metronic/helpers'
import {useQueryRequest} from '../../core/QueryRequestProvider'
import {useQueryResponse} from '../../core/QueryResponseProvider'
import {useQuery} from 'react-query'
import {listThings as listAuditCategories} from '../../../../audit-categories/list/core/_requests'
import {listThings as listQuestionCategories} from '../../../../question-groups/list/core/_requests'
import {listThings as listDepartments} from '../../../../units/list/core/_requests'
import {listOtherThings as listSections} from '../../../../units/list/core/_requests'
import {listSomeUsers2} from '../../../../user-management/list/core/_requests'
import {listUnits} from '../../../../audits/list/core/_requests'

const ListFilter = () => {
  const intl = useIntl()
  const {updateState} = useQueryRequest()
  const {isLoading} = useQueryResponse()
  const {refetch} = useQueryResponse()

  const [auditcategories, setAuditCategories] = useState([])
  const [questioncategories, setQuestionCategories] = useState([])
  const [departments, setDepartments] = useState([])
  const [sections, setSections] = useState([])
  const [filterunits, setFilterunits] = useState([])

  const [selectedAuditCategories, setSelectedAuditCategories] = useState('')
  const [selectedQuestionCategories, setSelectedQuestionCategories] = useState('')
  const [selectedDepartments, setSelectedDepartments] = useState('')
  const [selectedSections, setSelectedSections] = useState('')
  const [units, setUnits] = useState<any>([])
  const [selectedUnits, setSelectedUnits] = useState('')
  const [users, setUsers] = useState([])
  const [selectedUsers, setSelectedUsers] = useState('')
  const [selectedUsersName, setSelectedUsersName] = useState('')
  const [status, setStatus] = useState([
    {name: `${intl.formatMessage({id: 'Open'})}`, id: 0},
    // {name: `${intl.formatMessage({id: 'ACTION.TABLE.PROGRESS'})}`, id: 1},
    {name: `${intl.formatMessage({id: 'Close'})}`, id: 2},
    // {name: `${intl.formatMessage({id: 'ACTION.TABLE.Canceled'})}`, id: 3},
  ])
  const [selectedStatus, setSelectedStatus] = useState('')

  useEffect(() => {
    Promise.all([listAuditCategories(), listQuestionCategories(), listDepartments()]).then(
      (responses) => {
        const audits: Array<any> = responses?.[0]?.data || []
        const questions: Array<any> = responses?.[1]?.data || []
        const departments: Array<any> = responses?.[2]?.data || []

        if (departments.length > 0) {
          listSections(departments[0]?.id).then((response) => {
            setSections(response.data)
          })
        }

        setAuditCategories([...(audits as never[])])
        setQuestionCategories([...(questions as never[])])
        setDepartments([...(departments as never[])])
      }
    )
  }, [])

  useEffect(() => {
    MenuComponent.reinitialization()
    listUnits(setFilterunits)
  }, [])

  const resetData = () => {
    setSelectedAuditCategories('')
    setSelectedQuestionCategories('')
    setSelectedDepartments('')
    setSelectedSections('')
    setSelectedUnits('')
    setSelectedStatus('')
  }

  useEffect(() => {
    filterData()
  }, [selectedStatus, selectedSections, selectedUnits, selectedDepartments])

  useEffect(() => {
    if (selectedDepartments) {
      listSections(parseInt(selectedDepartments)).then((response) => {
        setSections(response.data)
      })
    } else {
      setSections([])
    }
    if (selectedSections) {
      listSections(parseInt(selectedSections)).then((response) => {
        setUnits(response.data)
      })
    } else {
      setUnits([])
    }
  }, [selectedDepartments, selectedSections])

  const filterData = () => {
    let filter: any = {}

    if (selectedStatus) {
      filter.status = selectedStatus
    }

    if (selectedUnits) {
      filter.unitId = selectedUnits
    } else if (selectedSections) {
      filter.unitId = selectedSections
    } else if (selectedDepartments) {
      filter.unitId = selectedDepartments
    }

    updateState({filter: filter})
  }

  const handleAuditCategoryId = async (id: any) => {
    setSelectedAuditCategories(id)
    listSomeUsers2(id).then((res3) => {
      setUsers(res3.data)
    })
  }

  const handleStatus = async (name: any) => {
    setSelectedStatus(name)
  }

  const UserInfo = (item: any) => {
    setSelectedUnits(item.target.value)
    setSelectedUsersName(item.target.selectedOptions[0].label)
  }
  return (
    <>
      {/* begin::Filter Button */}
      <button
        disabled={isLoading}
        type='button'
        className='btn btn-sm btn-white btn-active-dark me-3'
        data-kt-menu-trigger='click'
        data-kt-menu-placement='bottom-end'
      >
        <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-2' />
        {intl.formatMessage({id: 'TOOLBAR.FILTER'})}
      </button>
      {/* end::Filter Button */}
      {/* begin::SubMenu */}
      <div className='menu menu-sub menu-sub-dropdown w-300px w-md-325px ' data-kt-menu='true'>
        {/* begin::Header */}
        <div className='px-7 py-5'>
          <div className='fs-5 text-dark fw-bolder'>
            {intl.formatMessage({id: 'FILTER.OPTIONS'})}
          </div>
        </div>
        {/* end::Header */}

        {/* begin::Separator */}
        <div className='separator border-gray-200'></div>
        {/* end::Separator */}
        <div
          className='px-7 py-5'
          data-kt-item-table-filter='form'
          style={{overflowX: 'scroll', maxHeight: '400px'}}
        >
          <div
            className='px-7 py-5'
            data-kt-item-table-filter='form'
            style={{overflowX: 'scroll', maxHeight: '400px'}}
          >
            <label className='form-label fs-6 fw-bold'>
              {intl.formatMessage({id: 'AUDITS.LIST.STATUS'})}
            </label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-item-table-filter='role'
              data-hide-search='true'
              // onChange={(e) => setSelectedAuditCategories(e.target.value)}
              onChange={(e) => handleStatus(e.target.value)}
              value={selectedStatus}
            >
              <option value=''>{intl.formatMessage({id: 'QUESTIONS.LIST.HEADER'})}</option>

              {status.map((item: any) => {
                return (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                )
              })}
            </select>
          </div>
          <div className='px-7 py-5'>
            <label className='form-label fs-6 fw-bold'>
              {intl.formatMessage({id: 'FILTER.AUDIT.UNITS'})}
            </label>
            <select
              className='form-select form-select-solid fw-bolder'
              data-kt-select2='true'
              data-placeholder='Select option'
              data-allow-clear='true'
              data-kt-item-table-filter='role'
              data-hide-search='true'
              onChange={(e) => {
                setSelectedDepartments(e.target.value)
                setSelectedSections('')
              }}
              value={selectedDepartments}
            >
              <option value=''>{intl.formatMessage({id: 'QUESTIONS.LIST.HEADER'})}</option>

              {departments.map((item: any) => {
                return (
                  <option key={item?.id} value={item?.id}>
                    {item?.name}
                  </option>
                )
              })}
            </select>
          </div>

          {selectedDepartments ? (
            <div className='px-7 py-5'>
              <label className='form-label fs-6 fw-bold'>
                {intl.formatMessage({id: 'FILTER.AUDIT.UNITS'})}
              </label>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-kt-item-table-filter='role'
                data-hide-search='true'
                onChange={(e) => setSelectedSections(e.target.value)}
                value={selectedSections}
              >
                <option value=''>{intl.formatMessage({id: 'QUESTIONS.LIST.HEADER'})}</option>

                {sections.map((item: any) => {
                  return (
                    <option key={item?.id} value={item?.id}>
                      {item?.name}
                    </option>
                  )
                })}
              </select>
            </div>
          ) : (
            <></>
          )}
          {units.length > 0 && units[0]?.unitType == null && selectedSections ? (
            <div className='px-7 py-5'>
              <label className='form-label fs-6 fw-bold'>
                {intl.formatMessage({id: 'FILTER.AUDIT.UNITS'})}
              </label>
              <select
                className='form-select form-select-solid fw-bolder'
                data-kt-select2='true'
                data-placeholder='Select option'
                data-allow-clear='true'
                data-kt-item-table-filter='role'
                data-hide-search='true'
                onChange={(e) => setSelectedUnits(e.target.value)}
                value={selectedUnits}
              >
                <option value=''>{intl.formatMessage({id: 'DROPDOWN_SELECT'})}</option>

                {units.map((item: any) => {
                  return (
                    <option key={item?.id} value={item?.id}>
                      {item?.name}
                    </option>
                  )
                })}
              </select>
            </div>
          ) : (
            <></>
          )}
          {/* begin::Content */}
          <div
            className='px-7 py-5'
            data-kt-item-table-filter='form'
            style={{overflowX: 'scroll', maxHeight: '400px'}}
          >
            {/* end::Input group */}

            {/* begin::Actions */}
            <div className='d-flex justify-content-end'>
              <button
                type='button'
                disabled={isLoading}
                onClick={resetData}
                className='btn btn-light btn-active-light-primary fw-bold me-2 px-6'
                data-kt-menu-dismiss='true'
                data-kt-item-table-filter='reset'
              >
                {intl.formatMessage({id: 'FILTER.RESET'})}
              </button>
              <button
                disabled={isLoading}
                type='button'
                onClick={filterData}
                className='btn btn-dark fw-bold px-6'
                data-kt-menu-dismiss='true'
                data-kt-item-table-filter='filter'
              >
                {intl.formatMessage({id: 'FILTER.APPLY'})}
              </button>
            </div>
            {/* end::Actions */}
          </div>
        </div>
        {/* end::Content */}
      </div>
      {/* end::SubMenu */}
    </>
  )
}

export {ListFilter}
