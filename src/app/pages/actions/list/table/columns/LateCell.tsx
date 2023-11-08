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
    // Eğer dateStr bir string değilse, hemen hata döndür.
    if (typeof dateStr !== 'string') {
      return { error: 'Tarih string türünde olmalıdır.' };
    }
  
    const regexPattern = /^\d{2}\.\d{2}\.\d{4}$/;
    if (!regexPattern.test(dateStr)) {
      return { error: 'Tarih string\'i "GG.AA.YYYY" formatında olmalıdır.' };
    }
  
    const [day, month, year] = dateStr.split('.').map(Number);
  
    if (month < 1 || month > 12) {
      return { error: 'Ay 1 ile 12 arasında olmalıdır.' };
    }
    if (year < 1000 || year > 3000) {
      return { error: 'Yıl 1000 ile 3000 arasında olmalıdır.' };
    }
  
    const date = new Date(year, month - 1, day);
  
    if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
      return { error: 'Geçersiz tarih.' };
    }
  
    return { date };
  }
  
  
  useEffect(() => {
    const today = new Date();
    let lastDateTime;
    let endDateTime;
    let lastDateError;
    let endDateError;
  
    if (item?.lastDate) {
      const result = parseDate(item.lastDate);
      if (result.error) {
        lastDateError = result.error;
      } else {
        lastDateTime = result.date;
      }
    }
  
    if (item?.endDate) {
      const result = parseDate(item.endDate);
      if (result.error) {
        endDateError = result.error;
      } else {
        endDateTime = result.date;
      }
    }
  
    if (lastDateError || endDateError) {
      console.error(lastDateError || endDateError);
      setIsLate('Error'); // Burada kullanıcıya gösterilecek bir hata mesajı ayarlayabilirsiniz.
    } else if (lastDateTime && endDateTime) {
      setIsLate(lastDateTime < endDateTime ? 'YES' : 'No');
    } else {
      setIsLate('-');
    }
  }, [item]);
  
  

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        <span className='text-gray-800 text-hover-primary'>{isLate}</span>
      </div>
    </div>
  )
}

export {LateCell}
