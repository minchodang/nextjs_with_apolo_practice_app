'use client';

import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import MainMenu from './components/MainMenu';
import GlobalStyle from './components/GlobalStyles';

const theme = {
    colors: {
        primary: 'rgb(15, 23, 42)',
        secondary: 'rgb(4, 120, 87)',
        accent: 'rgb(6, 78, 59)',
    },
};

const MainContainer = styled.div`
    margin: 2rem auto;
    max-width: 120rem;
    padding: 2rem;
    width: 100%;
`;

const PageTitle = styled.h1`
    color: #ffffff;
`;

const PageIntro = styled.p`
    color: #ffffff;
    font-size: 1.4rem;
`;

export default function NotFound() {
    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <MainMenu />
            <MainContainer>
                <PageTitle>Page Not Found</PageTitle>
                <PageIntro>Could not find requested page :(</PageIntro>
            </MainContainer>
        </ThemeProvider>
    );
}
