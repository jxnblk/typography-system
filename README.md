
# typography-system

The unholy union of [styled-system][] and [typography.js][]

**WIP - NOT READY FOR PRIMETIME**

```sh
npm i typography-system
```

Typography System is intended for use with React and Emotion.
Start by adding the `TypographyProvider` component to the root of your application
and adding a Typography.js theme.

```jsx
import React from 'react'
import { TypographyProvider } from 'typography-system'
import wp2016 from 'typography-theme-wordpress-2016'

export default props =>
  <TypographyProvider theme={wp2016}>
    <h1>Hello</h1>
  </TypographyProvider>
```

Typography System will generate a Styled System-compatible theme based on the Typography.js theme.
Use Styled System components within your application.

```jsx
import React from 'react'
import styled from '@emotion/styled'
import { space, color } from 'styled-system'

const Box = styled('div')(
  space,
  color
)

export default props =>
  <Box
    p={3}
    mb={3}
    bg='tomato'>
    <h1>Hello</h1>
  </Box>
```

MIT License

[typography.js]: https://github.com/KyleAMathews/typography.js
[styled-system]: https://styled-system.com/
[react]: https://reactjs.org/
[emotion]: https://emotion.sh
