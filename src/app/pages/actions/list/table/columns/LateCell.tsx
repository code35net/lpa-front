/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'
import {FC, useState, useEffect} from 'react'
import {useIntl} from 'react-intl'

type Props = {
  item: any
}

const LateCell: FC<Props> = ({item}) => {
  const intl = useIntl()
  const [isLate, setIsLate] = useState<any>(`${intl.formatMessage({id: 'No'})}`)

  function parseDate(dateStr: any) {
    console.log('Gelen tarih string:', dateStr)
    // İlk olarak, gelen string'in formatını kontrol ediyoruz.
    const regexPattern = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!regexPattern.test(dateStr)) {
      throw new Error('Tarih string\'i "GG.AA.YYYY" formatında olmalıdır.');
    }
  
    // Daha sonra, gelen string'i ayırıyoruz ve sayılara çeviriyoruz.
    const [day, month, year] = dateStr.split('.').map(Number);
  
    // Ay ve yıl için geçerlilik kontrolü yapıyoruz.
    if (month < 1 || month > 12) {
      throw new Error('Ay 1 ile 12 arasında olmalıdır.');
    }
    if (year < 1000 || year > 3000) {
      throw new Error('Yıl 1000 ile 3000 arasında olmalıdır.');
    }
  
    // JavaScript Date objesi ile tarih objesini oluşturuyoruz.
    const date = new Date(year, month - 1, day);
  
    // Gün, ay ve yılın doğru olup olmadığını kontrol ediyoruz.
    console.log('Oluşturulan Date objesi:', date);
    console.log('Kontroller:', date.getFullYear(), year, date.getMonth() + 1, month, date.getDate(), day);
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      throw new Error('Geçersiz tarih.');
    }
  
    // Eğer her şey doğruysa, oluşturulan Date objesini döndürüyoruz.
    return date;
  }

  useEffect(() => {
    const today = new Date(); // Şu anki tarih ve saat
    let lastDateTime;
    let endDateTime;
  
    if (item?.lastDate) {
      lastDateTime = parseDate(item.lastDate); // lastDate tarih ve saati
    }
  
    if (item?.endDate) {
      endDateTime = parseDate(item.endDate); // endDate tarih ve saati
    }
  
    console.log('Item:', item);
    if (lastDateTime && endDateTime) {
      console.log('Son tarih (lastDateTime):', lastDateTime);
      console.log('Bitiş tarihi (endDateTime):', endDateTime);
      
      if (lastDateTime < endDateTime) {
        setIsLate(`${intl.formatMessage({id: 'YES'})}`);
      } else {
        setIsLate(`${intl.formatMessage({id: 'No'})}`);
      }
    } else {
      setIsLate(`${intl.formatMessage({id: '-'})}`);
    }
  }, [item, intl]);
  

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <span className='text-gray-800 text-hover-primary'>{isLate}</span>
      </div>
    </div>
  )
}

export {LateCell}
