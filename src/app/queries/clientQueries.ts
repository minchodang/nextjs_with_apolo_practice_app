import { graphql } from 'src/src/__generated__';

const GET_MENU = graphql(`
    query GetMenu {
        menu {
            id
            name
            foodType
            description
        }
    }
`);
const GET_PROFILE = graphql(`
    query GetProfile {
        profile {
            id
            bio
        }
    }
`);
export { GET_MENU, GET_PROFILE };
