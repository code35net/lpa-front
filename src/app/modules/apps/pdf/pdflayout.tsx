import React, { useState, useEffect } from 'react';
import { Document, Page, Outline } from 'react-pdf';

interface Props {
    fileUrl: string;
    setLessonPosition: Function;
    lessonPosition: number;
}

const PdfLayout: React.FC<Props> = ({ fileUrl, setLessonPosition, lessonPosition }) => {
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [zoom, setZoom] = useState(1100);


    useEffect(() => {
        setPageNumber(lessonPosition)
    }, [lessonPosition])

    function onDocumentLoadSuccess({ numPages }: { numPages: any }) {
        setNumPages(numPages);
    }
    function changePage(offset: any) {
        setPageNumber(prevPageNumber => prevPageNumber + offset);        
    }
    
    function previousPage() {
        changePage(-1);
        setLessonPosition(pageNumber-1);
    }

    function nextPage() {
        changePage(1);
        setLessonPosition(pageNumber+1);
    }

    function changeZoom(offset: any) {
        setZoom(prevZoom => prevZoom + offset);
    }

    function zoomOut() {
        changeZoom(-100);
    }

    function zoomIn() {
        changeZoom(100);
    }

    return (
        <>
            <div style={{ bottom:'20px', left:'50%', background:'wheat', position: 'fixed', zIndex:'999', textAlign: 'center' }}>
                <p>
                    Page {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
                </p>
                <button
                    type="button"
                    disabled={pageNumber <= 1}
                    onClick={previousPage}
                >
                    Previous
                </button>
                <button
                    type="button"
                    disabled={pageNumber >= (numPages || 0)}
                    onClick={nextPage}
                >
                    Next
                </button>
                <button
                    type="button"
                    disabled={zoom <= 800}
                    onClick={zoomOut}
                >
                    Zoom Out
                </button>
                <button
                    type="button"
                    disabled={zoom >= 1600}
                    onClick={zoomIn}
                >
                    Zoom In
                </button>
            </div>

            <Document  file={ fileUrl } onLoadSuccess={onDocumentLoadSuccess}>
                <Page pageNumber={pageNumber} renderTextLayer={false} width={zoom} />               
            </Document>            
        </>
    );
}

export default PdfLayout;