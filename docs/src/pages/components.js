import React from 'react'
import { createComponents } from 'typography-system'
import funston from 'typography-theme-funston'

const Components = createComponents(funston)

const { H1 } = Components

export default props =>
  <>
    <H1>
      Hello, Typography System Components
    </H1>
  </>
