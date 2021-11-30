import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
let theme = createTheme({
    palette:{
        primary:{
            main:'#3460c4'
        }
    },
    typography:{
        header:{
            textDecoration:'underline',
            marginBottom:'20px',
            marginTop:'20px'
        },
    },
});
theme=responsiveFontSizes(theme);
export default theme;