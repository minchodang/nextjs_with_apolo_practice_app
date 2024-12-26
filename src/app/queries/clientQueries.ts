import { gql } from 'src/src/__generated__/gql';

const GET_MENU = gql(`
    query GetMenu {
        menu {
            id
            name
            foodType
            description
        }
    }
`);
const GET_PROFILE = gql(``);
export { GET_MENU, GET_PROFILE };
