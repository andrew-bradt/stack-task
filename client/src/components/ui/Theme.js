import { createTheme, responsiveFontSizes } from '@material-ui/core/styles';
let theme = createTheme({
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