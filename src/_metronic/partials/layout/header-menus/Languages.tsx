/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC} from 'react'
import {toAbsoluteUrl} from '../../../helpers'
import { useLang, setLanguage } from '../../../i18n/Metronici18n'
import {useNavigate} from 'react-router-dom'

const languages = [
  {
    lang: 'en',
    name: 'English',
    flag: toAbsoluteUrl('/media/flags/united-states.svg'),
  },
  {
    lang: 'tr',
    name: 'Türkçe',
    flag: toAbsoluteUrl('/media/flags/turkey.svg'),
  },
//   {
//     lang: 'es',
//     name: 'Spanish',
//     flag: toAbsoluteUrl('/media/flags/spain.svg'),
//   },
//   {
//     lang: 'ja',
//     name: 'Japanese',
//     flag: toAbsoluteUrl('/media/flags/japan.svg'),
//   },
//   {
//     lang: 'de',
//     name: 'German',
//     flag: toAbsoluteUrl('/media/flags/germany.svg'),
//   },
//   {
//     lang: 'fr',
//     name: 'French',
//     flag: toAbsoluteUrl('/media/flags/france.svg'),
//   },
// 
]

type Props = {
  languageMenuPlacement?: 'left-start' | 'right-end'
}

const Languages: FC<Props> = ({languageMenuPlacement = 'left-start'}) => {
    const lang = useLang()
    const navigate = useNavigate()
  const currentLanguage = languages.find((x) => x.lang === lang)
  return (
    <div
      className='menu-item px-5'
      data-kt-menu-trigger='hover'
      data-kt-menu-placement={languageMenuPlacement}
      data-kt-menu-flip='bottom'
    >
      <a href='#' className='menu-link px-5'>
        <span className='menu-title position-relative'>
          Language
          <span className='fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0'>
            {currentLanguage?.name}{' '}
            <img
              className='w-15px h-15px rounded-1 ms-2'
              src={currentLanguage?.flag}
              alt='metronic'
            />
          </span>
        </span>
      </a>

      <div className='menu-sub menu-sub-dropdown w-175px py-4'>
        {languages.map((l) => (
          <div
            className='menu-item px-3'
            key={l.lang}
                onClick={() => {

                    const I18N_CONFIG_KEY = process.env.REACT_APP_I18N_CONFIG_KEY || 'i18nConfig'

                    localStorage.setItem(I18N_CONFIG_KEY, JSON.stringify({ selectedLang: lang }))
                    navigate(0)
              setLanguage(l.lang)
            }}
          >
            <a
              href='#'
              className={clsx('menu-link d-flex px-5', {active: l.lang === currentLanguage?.lang})}
            >
              <span className='symbol symbol-20px me-4'>
                <img className='rounded-1' src={l.flag} alt='metronic' />
              </span>
              {l.name}
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export {Languages}
