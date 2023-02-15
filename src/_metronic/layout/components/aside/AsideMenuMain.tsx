/* eslint-disable react/jsx-no-target-blank */
import {useIntl} from 'react-intl'
import {KTSVG} from '../../../helpers'
import {AsideMenuItemWithSub} from './AsideMenuItemWithSub'
import {AsideMenuItem} from './AsideMenuItem'
import { Console } from 'console'

export function AsideMenuMain(menus: Array<string>) {
    const intl = useIntl()
    const uniqueTags: string[] = []
    Object.keys(menus).map((fullstr: any) => {
        if (uniqueTags.indexOf(menus[fullstr].split('.')[0].split('_')[1]) === -1 && menus[fullstr].split('.')[0].split('_')[0] != "main") {
            uniqueTags.push(menus[fullstr].split('.')[0].split('_')[1])
        }
    });

   // console.log(uniqueTags)
  /*
  var usermanagementyetki = Object.keys(menus).some((key: any) => menus[key] == "useraction");
  var announcementyetki = Object.keys(menus).some((key: any) => menus[key] == "announcement");
  */
    //console.log(menus)
    //menus = ["main_MAIN.users_USERS", "main_MAIN.course_COURSE"]
    //console.log(menus)
  return (
      <>
          <AsideMenuItem
              to='/dashboard'
              icon='/media/icons/duotune/arrows/arr001.svg'
              title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
              fontIcon='bi-app-indicator'
          />
          {
              Object.keys(menus).map((fullstr: any) => {
                  return menus[fullstr].split('.')[0].split('_')[0] == "main" &&
                      <AsideMenuItem
                          to={"/" + menus[fullstr].split('.')[1].split('_')[0]}
                          icon='/media/icons/duotune/arrows/arr001.svg'
                          title={intl.formatMessage({ id: "MENU." + menus[fullstr].split('.')[1].split('_')[1] })}
                          fontIcon='bi-app-indicator'
                      />
              }
              )
          }
          {
           uniqueTags.map((tag: any) =>
           (
                <AsideMenuItemWithSub
                to='/library'
                   title={intl.formatMessage({ id: 'MENU.' + tag})}
                fontIcon='bi-sticky'
                icon='/media/icons/duotune/arrows/arr001.svg'
                >
                   {Object.keys(menus).map((fullstr: any) =>
                   (
                       menus[fullstr].split('.')[0].split('_')[1] == tag &&
                       <AsideMenuItem
                           to={"/" + menus[fullstr].split('.')[1].split('_')[0]}
                           icon='/media/icons/duotune/arrows/arr001.svg'
                           title={intl.formatMessage({ id: "MENU." + menus[fullstr].split('.')[1].split('_')[1] })}
                           fontIcon='bi-app-indicator'
                       />
                   )
                   )
                   }
                   
                </AsideMenuItemWithSub>                  
           )
               )
          }
          {/*
          <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.DASHBOARD'})}
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/user-management/users'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.USERS'})}
        fontIcon='bi-layers'
      />
      <AsideMenuItem
        to='/course'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.COURSE'})}
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/live'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.LIVE'})}
        fontIcon='bi-app-indicator'
      />

      <AsideMenuItem
        to='/quiz'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.QUIZ'})}
        fontIcon='bi-app-indicator'
      />

<AsideMenuItem
        to='/question-bank'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.QBANK'})}
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/reports'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.REPORTS'})}
        fontIcon='bi-app-indicator'
      />


      
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Tanımlar</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/library'
        title={intl.formatMessage({id: 'MENU.LIBRARY'})}
        fontIcon='bi-sticky'
        icon='/media/icons/duotune/arrows/arr001.svg'
      >
        <AsideMenuItem to='/library-category' title={intl.formatMessage({id: 'MENU.LIBRARYCATEGORY'})} hasBullet={true} />
        <AsideMenuItem to='/library' title={intl.formatMessage({id: 'MENU.IMAGELIBRARY'})} hasBullet={true} />
      </AsideMenuItemWithSub>

      <AsideMenuItem
        to='/answertemplate'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.ANSWERTEMPLATE'})}
        fontIcon='bi-app-indicator'
      />

      
          <AsideMenuItem
        to='/announcement'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.ANNOUNCEMENT'})}
        fontIcon='bi-app-indicator'
      />
      
      
     <AsideMenuItem
        to='/survey'
        icon='/media/icons/duotune/arrows/arr001.svg'
        title={intl.formatMessage({id: 'MENU.SURVEY'})}
        fontIcon='bi-app-indicator'
      />
     
      */}
    </>
  )
}
