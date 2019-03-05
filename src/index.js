import React, { useMemo, useEffect } from 'react'
import Typography from 'typography'
import { Global, css } from '@emotion/core'
import styled from '@emotion/styled'
import { ThemeProvider } from 'emotion-theming'
import { color } from 'styled-system'
import merge from 'lodash.merge'
import get from 'lodash.get'

export const Root = styled.div(
  color
)

const stackFonts = (fonts = []) =>
  fonts.map(font => `"${font}"`).join(', ')

const getFontSizes = styles => {
  const {
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
  } = styles
  const arr = [ h6, h5, h4, h3, h2, h1 ].map(style => style.fontSize)
  return arr
}

export const createTheme = (typography) => {
  const {
    bodyFontFamily,
    headerFontFamily,
    bodyWeight,
    boldWeight,
    headerWeight,
    baseLineHeight,
    headerLineHeight
  } = typography.options
  const styles = typography.toJSON()
  const fonts = {
    body: stackFonts(bodyFontFamily),
    heading: stackFonts(headerFontFamily),
  }
  const fontWeights = [
    bodyWeight,
    boldWeight,
  ]
  fontWeights.heading = headerWeight
  const fontSizes = getFontSizes(styles)
  const lineHeights = {
    body: baseLineHeight,
    heading: headerLineHeight,
  }
  const colors = merge({
    text: get(styles, 'body.color'),
    link: get(styles, 'a.color'),
  }, typography.options.colors)

  const scale = [
    1, 2, 3, 4, 5, 6, 7, 8
  ].map(n => Math.pow(2, n))
  const space = [
    0,
    ...scale.map(n => typography.rhythm(n / 6))
  ]

  const theme = {
    ...typography.options,
    fonts,
    fontSizes,
    fontWeights,
    lineHeights,
    colors,
    space,
  }
  return theme
}

export const GoogleFont = props => {
  useEffect(() => {
    if (!props.theme.googleFonts) return
    const link = document.head.appendChild(
      document.createElement('link')
    )
    const fonts = props.theme.googleFonts.map(font => {
      let str = ''
      str += font.name.split(' ').join('+')
      str += ':'
      str += font.styles.join(',')
      return str
    }).join('|')
    link.href = '//fonts.googleapis.com/css?family=' + fonts
    link.setAttribute('rel', 'stylesheet')

    return () => {
      link.remove()
    }
  })

  return false
}

export const TypographyProvider = ({
  theme,
  options = {},
  ...props
}) => {
  const [ styles, systemTheme ] = useMemo(() => {
    const typography = new Typography({
      ...theme,
      includeNormalize: false,
      ...options
    })
    const systemTheme = createTheme(typography)
    const styles = typography.toString()
    return [ styles, systemTheme ]
  }, [ theme ])


  return (
    <ThemeProvider theme={systemTheme}>
      <GoogleFont theme={theme} />
      <style
        dangerouslySetInnerHTML={{
          __html: styles
        }}
      />
      <Root {...props} />
    </ThemeProvider>
  )
}
