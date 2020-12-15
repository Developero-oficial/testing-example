import {unstable_createMuiStrictModeTheme} from '@material-ui/core/styles'
import {orange, deepOrange} from '@material-ui/core/colors'

export const darkTheme = unstable_createMuiStrictModeTheme({
  palette: {
    type: 'dark',
    primary: {
      main: orange[500],
    },
    secondary: {
      main: deepOrange[900],
    },
  },
})
