/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { FC, useState, useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import DualListBox from 'react-dual-listbox'
import 'react-dual-listbox/lib/react-dual-listbox.css'
import {PageLink, PageTitle} from '../../../_metronic/layout/core'
import {useIntl} from 'react-intl'
import qs from 'qs'
import PdfLayout from '../../modules/apps/pdf/pdflayout'
import VideoLayout from '../../modules/apps/video/videolayout'
import { getLessonUrl, setLessonPosition, getLessonPosition, getLessonType } from './list/core/_requests'
// Core viewer

// Create new plugin instance

  const Breadcrumbs: Array<PageLink> = [
    {
      title: 'Home',
      path: '/dashboard',
      isSeparator: false,
      isActive: false,
      
    },
   
    {
      title: '',
      path: '',
      isSeparator: true,
      isActive: false,
    },
  ]
    
  const LessonViewer: FC = () => {
    const intl = useIntl()
      const navigate = useNavigate()

      const [searchParams, setSearchParams] = useSearchParams();

      const [lid, setLid] = React.useState(searchParams.get("lid"))
      const [lessonUrl, setLessonUrl] = React.useState("")
      const [lP, setLP] = React.useState(1)
      const [type, setType] = React.useState(1)

      function setLessonP(position: any) {
          setLessonPosition(parseInt(lid || "0"), position)
      }

      useEffect(() => {
          getLessonUrl(parseInt(lid || "0")).then((res: any) =>
          {
              console.log(res)
              setLessonUrl(res)
          })
          getLessonPosition(parseInt(lid || "0")).then((res: any) => {
              console.log(res)
              setLP(res)
          })
          getLessonType(parseInt(lid || "0")).then((res: any) => {
              console.log(res)
              setType(res)
          })
        }, [lid])
  
        return (
            type == 0 ? <PdfLayout fileUrl={lessonUrl} setLessonPosition={setLessonP} lessonPosition={lP} />
                : type == 1 ? <VideoLayout fileUrl={lessonUrl} setLessonPosition={setLessonP} lessonPosition={lP} /> : <div></div>         
                )
  }
  
export { LessonViewer }