import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import withApollo from '../../utils/withApollo';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../components/GlobalStyles';
import MainMenu from '../../components/MainMenu';
import { GET_PROFILE, Profile } from '../../queries/clientQueries';

const theme = {
    colors: {
        primary: 'rgb(15, 23, 42)',
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

const LoginStatus = styled.p`
    color: #ffffff;
`;

const SignInOutButton = styled.button`
    color: #ffffff;
    padding: 0.5rem;
    cursor: pointer;
    margin: 2rem 0;
`;

const ContentContainer = styled.div`
    display: flex;
    flex-flow: column wrap;
`;

const Content = styled.p`
    color: #ffffff;
    font-size: 1.4rem;
    margin-top: 2rem;
`;

const ClientProtectPage: React.FC = () => {
    const { data: session, status } = useSession();
    const { loading, error, data } = useQuery(GET_PROFILE);
    const userEmail = session?.user?.email;

    if (status === 'loading') {
        return <Content>Hang on there...</Content>;
    }

    if (loading) {
        return <Content>Loading...</Content>;
    }

    if (error) {
        return <Content>Something went wrong</Content>;
    }

    if (status === 'authenticated') {
        return (
            <ThemeProvider theme={theme}>
                <GlobalStyle />
                <MainMenu />
                <MainContainer>
                    <PageTitle>Profile</PageTitle>
                    <LoginStatus>Signed in as {userEmail}</LoginStatus>
                    <SignInOutButton onClick={() => signOut()}>Sign out</SignInOutButton>
                    {!loading && !error && data.profile && (
                        <ContentContainer>
                            {data.profile.map((account: Profile) => (
                                <ContentContainer key={account.id}>
                                    <Content>{account.bio}</Content>
                                </ContentContainer>
                            ))}
                        </ContentContainer>
                    )}
                </MainContainer>
            </ThemeProvider>
        );
    }

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <MainMenu />
            <MainContainer>
                <PageTitle>Profile</PageTitle>
                <LoginStatus>Not signed in. Sign in to view your profile.</LoginStatus>
                <SignInOutButton onClick={() => signIn()}>Sign in</SignInOutButton>
            </MainContainer>
        </ThemeProvider>
    );
};

export default withApollo(ClientProtectPage);
