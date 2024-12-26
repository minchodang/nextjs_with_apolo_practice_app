import { gql } from '@apollo/client';

export interface Menu {
    id: string;
    name: string;
    foodType: string;
    description: string;
}

export interface Profile {
    id: string;
    bio: string;
}

const GET_MENU = gql`
    query {
        menu {
            id
            name
            foodType
            description
        }
    }
`;

const GET_PROFILE = gql`
    query {
        profile {
            id
            bio
        }
    }
`;

export { GET_MENU, GET_PROFILE };
