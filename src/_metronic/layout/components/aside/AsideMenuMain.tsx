/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />

<AsideMenuItemWithSub
        to='/user-management'
        title={intl.formatMessage({id: 'MENU.USERS'})}
        icon='/media/icons/duotune/arrows/arr001.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem
          to='/user-management/'
          title="Users"
          hasBullet={true}
        />
        
        <AsideMenuItem
          to='/user-management/newuser'
          title="New User"
          hasBullet={true}
        />

        <AsideMenuItem
          to='/role-management/'
          title="Role Management"
          hasBullet={true}
        />
        
        
      </AsideMenuItemWithSub>

      
      

      <div className='menu-item'></div>

      

<AsideMenuItem
        to='/audits'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.AUDITS'})}
        fontIcon='bi-layers'
      />

<AsideMenuItem
        to='/actions'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.ACTIONS'})}
        fontIcon='bi-layers'
      />
      
      <AsideMenuItemWithSub
        to=''
        title={intl.formatMessage({id: 'MENU.REPORTS'})}
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/arrows/arr001.svg'
      >
      <AsideMenuItem
        to='/tablereport/list'
        title={`${intl.formatMessage({id: 'ASİDE.REPORT.ONE'})}`}
        hasBullet={true}
      />
        <AsideMenuItem
          to='/reports/graphics/actionreports'
          title={`${intl.formatMessage({id: 'ASİDE.REPORT.TWO'})}`}
          hasBullet={true}
        />
      <AsideMenuItem
        to='/questiontablereport/list'
        title={`${intl.formatMessage({id: 'ASİDE.REPORT.THREE'})}`}
        hasBullet={true}
      />
        <AsideMenuItem
          to='/questionreport/'
          title={`${intl.formatMessage({id: 'ASİDE.REPORT.FOUR'})}`}
          hasBullet={true}
        />
      </AsideMenuItemWithSub>

      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Definitions</span>
        </div>
      </div>

      <AsideMenuItem
        to='/questions'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.QUESTIONS'})}
        fontIcon='bi-layers'
      />

      <div className='menu-item'></div>
      <AsideMenuItemWithSub
        to='/definitions'
        title={intl.formatMessage({id: 'MENU.DEFINITIONS'})}
        icon='/media/icons/duotune/arrows/arr001.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem
          to='/departments'
          title={intl.formatMessage({id: 'MENU.DEPARTMENTS'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/staffs/'
          title={intl.formatMessage({id: 'MENU.STAFFLIST'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/positions'
          title={intl.formatMessage({id: 'MENU.POSITIONS'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/answertemplates'
          title={intl.formatMessage({id: 'MENU.ANSWERTEMPLATES'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/holidays'
          title="Holidays"
          hasBullet={true}
        />
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/categories'
        title={intl.formatMessage({id: 'MENU.CATEGORIES'})}
        icon='/media/icons/duotune/arrows/arr001.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem
          to='/auditcategories'
          title={intl.formatMessage({id: 'MENU.AUDITCATEGORIES'})}
          hasBullet={true}
        />
        <AsideMenuItem
          to='/questiongroups'
          title={intl.formatMessage({id: 'MENU.QUESTIONCATEGORIES'})}
          hasBullet={true}
        />
        
      </AsideMenuItemWithSub>

      
    </>
  )
}
