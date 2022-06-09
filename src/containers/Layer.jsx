import Stack from '@mui/material/Stack';


export const Layer = ({ children }) => <>
  <Stack direction='column'
    justifyContent='center'
    alignItems='center'
    textAlign='center'
    height='100vh'
  >
    {children}
  </Stack>
</>