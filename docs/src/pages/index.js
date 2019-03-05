import React, { useState } from 'react'
import { ThemeContext } from '@emotion/core'
import styled from '@emotion/styled'
import {
  space,
  width,
  fontSize,
  fontFamily,
  lineHeight,
  fontWeight,
  alignItems,
  justifyContent,
  color
} from 'styled-system'
import {
  TypographyProvider,
  createComponents
} from 'typography-system'
import GettingStarted from './getting-started.mdx'
import { themes } from '../themes'

const Box = styled.div(
  space,
  width,
  fontSize,
  color
)
const Flex = styled(Box)({
  display: 'flex',
}, alignItems, justifyContent)

const Text = styled(Box)(
  fontFamily,
  lineHeight,
  fontWeight,
)

const themeNames = Object.keys(themes)

const Container = props =>
  <div
    {...props}
    style={{
      maxWidth: 768,
      marginLeft: 'auto',
      marginRight: 'auto',
      padding: 32
    }}
  />

export default props => {
  const [ themeName, setTheme ] = useState('funston')
  const theme = themes[themeName]
  const T = createComponents(theme)

  return (
    <TypographyProvider theme={theme}>
      <Container>
        <Flex p={3} mb={3} alignItems='center' color='white' bg='black'>
          <Box mx='auto' />
          <Text
            as='label'
            mr={2}
            fontSize={1}
            fontWeight='bold'
            htmlFor='theme'>
            Theme
          </Text>
          <select
            id='theme'
            name='theme'
            value={themeName}
            onChange={e => {
              setTheme(e.target.value)
            }}>
            {themeNames.map(name => (
              <option
                key={name}
                label={name}
                value={name}
              />
            ))}
          </select>
        </Flex>
        <h1>typography-system</h1>
        <GettingStarted />
        <Box p={3} bg='lightgray'>
          <Text
            as='p'
            fontFamily='heading'
            fontSize={4}
            fontWeight='bold'>
            Text Component
          </Text>
          <T.h1 color='tomato'>T.h1 component</T.h1>
        </Box>
        <ThemeContext.Consumer>
          {system => (
            <pre children={JSON.stringify(system, null, 2)} />
          )}
        </ThemeContext.Consumer>
      </Container>
    </TypographyProvider>
  )
}
