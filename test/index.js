import React from 'react'
import renderer from 'react-test-renderer'
import Typography from 'typography'
import {
  TypographyProvider,
  createTheme
} from '../src'
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

test('creates a styled-system theme based on a typography.js theme', () => {
  const typography = new Typography({
    baseFontSize: '16px',
    baseLineHeight: 1.5,
    rhythmUnit: 'px',
  })
  const theme = createTheme(typography)
  expect(typeof theme).toBe('object')
  expect(Array.isArray(theme.space)).toBe(true)
  expect(Array.isArray(theme.fontSizes)).toBe(true)
  expect(typeof theme.colors).toBe('object')
  expect(typeof theme.fonts).toBe('object')
  expect(theme).toMatchSnapshot()
})
