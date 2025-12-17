import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Component from '/Users/adrian-phan.team-mint.io/work-projects/global-teammint-widget/my-mcp-server/resources/product-search-result/widget.tsx'

const container = document.getElementById('widget-root')
if (container && Component) {
  const root = createRoot(container)
  root.render(<Component />)
}
