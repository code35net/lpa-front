/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuUser() {
  const intl = useIntl()

  return (
    <>

<AsideMenuItem
        to='/audits'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.AUDITS'})}
        fontIcon='bi-layers'
      />
      
    </>
  )
}
