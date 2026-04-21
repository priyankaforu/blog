'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs'

interface PdfViewerProps {
  url: string
  title?: string
}

export default function PdfViewer({ url, title }: PdfViewerProps) {
  const [numPages, setNumPages] = useState<number>(0)
  const [error, setError] = useState<string | null>(null)
  const [containerWidth, setContainerWidth] = useState<number>(0)

  const proxyUrl = `/api/pdf?url=${encodeURIComponent(url)}`

  return (
    <div className="my-8" ref={(el) => {
      if (el) {
        const observer = new ResizeObserver((entries) => {
          setContainerWidth(entries[0].contentRect.width)
        })
        observer.observe(el)
      }
    }}>
      <div className="flex items-center justify-between mb-4">
        {title && (
          <h3 className="text-lg font-semibold">{title}</h3>
        )}
        <a
          href={proxyUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm px-4 py-2 rounded-full transition-all hover:border-blue-500 shrink-0"
          style={{ backgroundColor: 'var(--muted)', color: 'var(--foreground)', borderWidth: '1px', borderColor: 'var(--border)' }}
        >
          <i className="bi bi-download" />
          Download PDF
        </a>
      </div>
      <Document
        file={proxyUrl}
        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
        onLoadError={(err) => {
          console.error('PDF load error:', err)
          setError(err.message)
        }}
        loading={
          <div className="flex items-center justify-center py-20 text-sm" style={{ color: 'var(--muted-foreground)' }}>
            Loading PDF…
          </div>
        }
        error={
          <div className="flex flex-col items-center justify-center py-20 text-sm text-red-500 gap-2">
            <p>Failed to load PDF.</p>
            {error && <p className="text-xs opacity-60">{error}</p>}
          </div>
        }
      >
        {Array.from({ length: numPages }, (_, i) => (
          <div key={i} className="mb-4 rounded-lg overflow-hidden border" style={{ borderColor: 'var(--border)' }}>
            <Page
              pageNumber={i + 1}
              width={containerWidth || undefined}
              renderTextLayer={true}
              renderAnnotationLayer={true}
            />
          </div>
        ))}
      </Document>
    </div>
  )
}
