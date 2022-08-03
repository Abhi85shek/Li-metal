import React from 'react';
import PDFJS from 'pdfjs'
import { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

function PdfView(props) {

    const [pdfDoc,setContentpdf]=useState()
    let pageNum,ctx

useEffect(()=>{
   const res= axios.post('http://localhost:4000/getPOpdf')
   if(res.status==200)
   {
    setContentpdf(res.data)
    renderPDF(res.data.data)
}
    
},[])

    const  renderPDF=(url)=> {
        pdfDoc = null;
        pageNum = 1;
        scale = 1.5;
        canvas = document.getElementById('the-canvas');
        ctx = canvas.getContext('2d');
        PDFJS.disableWorker = true;
        PDFJS.getDocument(url).then(function getPdf(_pdfDoc) {
        pdfDoc = _pdfDoc;
        renderPage(pageNum);
        });
        }


        const renderPage=(num)=> {
            // Using promise to fetch the page
            pdfDoc.getPage(num).then(function (page) {
            var viewport = page.getViewport(scale);
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            // Render PDF page into canvas context
            var renderContext = {
            canvasContext: ctx,
            viewport: viewport
            };
            page.render(renderContext);
            });
            // Update page counters
         
            }
            
            }

    return (
        <div>
            
        </div>
    );
}

export default PdfView;