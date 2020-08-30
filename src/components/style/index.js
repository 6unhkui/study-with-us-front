import {createGlobalStyle} from 'styled-components';

export const GlobalStyle = createGlobalStyle`
    html, body {
        margin: 0;
        padding: 0;
        background-color: #fff;
        color: #464646;
        transition: all .2s;
    }

    ::selection {
        background-color: --primary-color;
        color: #fff;
    }

    .container {
        max-width: 1024px;
        margin : 0 auto;
    }
`


export const color = '#7D4CDB';

export const theme = {
    color
};
