import React from 'react'
import { createRoot } from 'react-dom/client'
import './styles.css'
import Component from '/Users/adrian-phan.team-mint.io/work-projects/global-teammint-widget/resources/kanban-board.tsx'

const container = document.getElementById('widget-root')
if (container && Component) {
  const root = createRoot(container)
  root.render(<Component />)
}
