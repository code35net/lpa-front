/* eslint-disable react-hooks/exhaustive-deps */
import {useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import {initialQueryState, KTSVG, useDebounce} from '../../../../../../_metronic/helpers'
import {Languages} from '../../../../../../_metronic/partials/layout/header-menus/Languages'
import {useQueryRequest} from '../../core/QueryRequestProvider'

const ListSearchComponent = () => {
  const intl = useIntl()
  const {updateState} = useQueryRequest()
  const [searchTerm, setSearchTerm] = useState<string>('')
  // Debounce search term so that it only gives us latest value ...
  // ... if searchTerm has not been updated within last 500ms.
  // The goal is to only have the API call fire when user stops typing ...
  // ... so that we aren't hitting our API rapidly.
  const debouncedSearchTerm = useDebounce(searchTerm, 150)
  // Effect for API call
  useEffect(
    () => {
      if (debouncedSearchTerm !== undefined && searchTerm !== undefined) {
        updateState({search: debouncedSearchTerm, ...initialQueryState})
      }
    },
    [debouncedSearchTerm] // Only call effect if debounced search term changes
    // More details about useDebounce: https://usehooks.com/useDebounce/
  )

  return (
    <div className='card-title'>
      {/* begin::Search */}
      <div className='d-flex align-items-center position-relative my-1'>
        <KTSVG
          path='/media/icons/duotune/general/gen021.svg'
          className='svg-icon-1 position-absolute ms-6'
        />
        <input
          type='text'
          data-kt-item-table-filter='search'
          className='form-control form-control-solid w-250px ps-14  bg-white '
          placeholder={intl.formatMessage({id: 'LIST.SEARCH.PLACEHOLDER'})}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      {/* end::Search */}
    </div>
  )
}

export {ListSearchComponent}
