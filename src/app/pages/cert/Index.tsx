import MyDocument from './CertDraft'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import ReactDOM from 'react-dom'
import { PDFViewer } from '@react-pdf/renderer'
import { getCertInfo } from './core/_requests'
import {Model} from './core/_models'


const Cert = () => {

    const [cert, setCert] = React.useState<Model>()

    const params = useParams()

    useEffect(() => {
        console.log(params)
        getCertInfo(params.certid || "").then((res) => {
            if (res != undefined) { setCert(res) }
        })
    }, [])

    return (
        <PDFViewer height={'100%'}>
            <MyDocument name={cert?.name || ""} date={cert?.date || ""} validuntil={cert?.validuntil || ""} duration={cert?.duration || ""} coursename={cert?.coursename || ""} identity={cert?.identity || ""} />
        </PDFViewer>
    )
}

export { Cert }