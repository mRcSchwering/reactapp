import { useQuery, gql } from "@apollo/client";

export type CharacterType = {
  id: string;
  name: string;
  species: string;
  type: string;
  gender: string;
  image: string;
  origin: {
    name: string;
    dimension: string;
  };
  status: string;
};

export type CharactersDataType = {
  characters: {
    results: CharacterType[];
  };
};

const CHARACTERS_QUERY = gql`
  query Characters {
    characters {
      results {
        id
        name
        species
        type
        gender
        image
        origin {
          name
          dimension
        }
        status
      }
    }
  }
`;

/**
 * query all Rick&Morty characters
 */
export function useAllCharacters() {
  return useQuery<CharactersDataType>(CHARACTERS_QUERY);
}

export type CharacterNamesDataType = {
  characters: {
    results: { name: string; id: number }[];
  };
};

const CHARACTER_NAMES_QUERY = gql`
  query {
    characters {
      results {
        name
        id
      }
    }
  }
`;

/**
 * query the names and ids of all Rick&Morty characters
 */
export function useAllCharacterNames() {
  return useQuery<CharacterNamesDataType>(CHARACTER_NAMES_QUERY);
}
