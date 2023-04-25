/* eslint-disable jsx-a11y/anchor-is-valid */
import clsx from 'clsx'
import {FC, useState, useEffect} from 'react'
import {toAbsoluteUrl} from '../../../../../../_metronic/helpers'
import {Model} from '../../core/_models'

type Props = {
  item: string
}

const ImgCell2: FC<Props> = ({item}) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const openModal = () => {
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
  }
  useEffect(() => {
    setImageSrc(`data:image/jpeg;base64,${item}`)
  }, [item])

  return (
    <div className='d-flex align-items-center'>
      <div className='d-flex flex-column'>
        {imageSrc ? (
          <>
            <img
              src={imageSrc}
              width={150}
              alt='Görsel'
              style={{cursor: 'pointer'}}
              onClick={openModal}
            />
            {isModalOpen && (
              <div
                onClick={closeModal}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'rgba(0, 0, 0, 0.75)',
                  zIndex: 1000,
                }}
              >
                <img
                  src={imageSrc}
                  alt='Büyük Görsel'
                  style={{maxWidth: '90%', maxHeight: '90%'}}
                />
              </div>
            )}
          </>
        ) : (
          <p>Görsel yükleniyor...</p>
        )}
      </div>
    </div>
  )
}
export {ImgCell2}
