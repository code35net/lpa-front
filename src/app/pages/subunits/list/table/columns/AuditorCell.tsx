

/* eslint-disable jsx-a11y/anchor-is-valid */
 import clsx from 'clsx'
 import {FC,useEffect,useState} from 'react'
 import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
 import {Model} from '../../core/_models'
 import { Link } from 'react-router-dom'
 import qs from 'qs'
 import {useNavigate} from "react-router-dom"
 type Props = {
   item: Model
 }


 
const qsd = qs.parse(window.location.search, { ignoreQueryPrefix: true }).sectionId
const qsd2 = qs.parse(window.location.search, { ignoreQueryPrefix: true }).parentUnitId
// console.log(qs.parse(window.location.search))
 const AuditorCell: FC<Props> = ({item}) => (
  
   <div className='d-flex align-items-center'>
     <div className='d-flex flex-column'>
       <span  className='text-gray-800 text-primary'>
       
         {item.leaderName}
       
       
       
       
      </span>
     </div>
    
  </div>
  
 )

 export {AuditorCell}


// item.unitType == 2 ? <Link   to={`/units/list?sectionId=${qsd}&unitId=${item.id}`}  >{item.name}</Link> : item.name

