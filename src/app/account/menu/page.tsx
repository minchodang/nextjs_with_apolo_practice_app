import React from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { useQuery } from '@apollo/client';
import styled, { ThemeProvider } from 'styled-components';
import GlobalStyle from '../../components/GlobalStyles';
import { GET_MENU } from '../../queries/clientQueries';
import MainMenu from '../../components/MainMenu';
import withApollo from '../../utils/withApollo';

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
`;

const ItemContainer = styled.div`
    display: flex;
    flex-flow: row nowrap;
    margin: 2rem 0;
    border: 0.1rem solid black;
`;

const ItemDescription = styled.div`
    margin-left: 1rem;
`;

const Menu: React.FC = () => {
    const { data: session, status } = useSession();
    const { loading, error, data } = useQuery(GET_MENU);
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

    return (
        <ThemeProvider theme={theme}>
            <GlobalStyle />
            <MainMenu />
            <MainContainer>
                <PageTitle>Menu</PageTitle>
                <LoginStatus>{userEmail ? `Signed in as ${userEmail}` : 'Not Signed in'}</LoginStatus>
                {userEmail ? (
                    <SignInOutButton onClick={() => signOut()}>Sign out</SignInOutButton>
                ) : (
                    <SignInOutButton onClick={() => signIn()}>Sign in</SignInOutButton>
                )}
                {!loading && !error && data?.menu && (
                    <ContentContainer>
                        {data.menu.map(item => (
                            <ItemContainer key={item.id}>
                                <ItemDescription>
                                    <Content>{item.name}</Content>
                                    <Content>{item.foodType}</Content>
                                    <Content>{item.description}</Content>
                                </ItemDescription>
                            </ItemContainer>
                        ))}
                    </ContentContainer>
                )}
            </MainContainer>
        </ThemeProvider>
    );
};

export default withApollo(Menu);
