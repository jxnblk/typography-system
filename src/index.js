import React, { useMemo, useEffect, useContext } from 'react'
import Typography from 'typography'
import { ThemeContext } from '@emotion/core'
import { ThemeProvider } from 'emotion-theming'
import {
  space,
  fontFamily,
  fontSize,
  fontWeight,
  lineHeight,
  color
} from 'styled-system'
import styled from '@emotion/styled'
import merge from 'lodash.merge'
import get from 'lodash.get'
import upperFirst from 'lodash.upperfirst'

export const Root = styled.div(
  color
)

export const useTypography = () => {
  return useContext(ThemeContext)
}

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

export const createTheme = (baseTheme, typography) => {
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
  }, baseTheme.colors)

  const space = [
    0,
    typography.rhythm(1/4),
    typography.rhythm(1/2),
    typography.rhythm(1),
    typography.rhythm(2),
    typography.rhythm(4),
    typography.rhythm(8),
    typography.rhythm(16),
  ]

  const theme = {
    fonts,
    fontSizes,
    fontWeights,
    lineHeights,
    colors,
    space,
    ...baseTheme,
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
    const systemTheme = createTheme(theme, typography)
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

const elements = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'a',
  'p',
  'img',
  'ul',
  'ol',
  'li',
  'dl',
  'dd',
  'code',
  'pre',
  'blockquote',
  'strong',
  'b',
  'hr',
]

export const createComponents = (baseTheme, options = {}) => {
  const typography = new Typography({
    ...baseTheme,
    includeNormalize: false,
    ...options
  })
  const theme = createTheme(baseTheme, typography)
  const styles = typography.toJSON()
  const Provider = ({ theme: _theme, ...props }) =>
    <ThemeProvider
      {...props}
      theme={{ ...theme, ..._theme }}
    />
  const components = {}
  elements.forEach(tag => {
    components[tag] = styled(tag)(styles[tag],
      space,
      fontFamily,
      fontSize,
      fontWeight,
      lineHeight,
      color
    )
    components[upperFirst(tag)] = components[tag]
  })

  return {
    ThemeProvider: Provider,
    ...components
  }
}
