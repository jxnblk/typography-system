import React from 'react'
import renderer from 'react-test-renderer'
import { TypographyProvider } from '../src'
import { themes } from '../docs/themes'

const renderJSON = el => renderer.create(el).toJSON()

test.each([
  ...Object.keys(themes)
])('renders %s', (key) => {
  const theme = themes[key]
  const json = renderJSON(
    <TypographyProvider theme={theme}>
      <h1>Hello</h1>
    </TypographyProvider>
  )
  expect(json).toMatchSnapshot()
})
