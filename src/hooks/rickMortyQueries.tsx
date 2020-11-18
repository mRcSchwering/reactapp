import { gql } from "apollo-boost";
import { useQuery } from "@apollo/react-hooks";

type CharacterType = {
  id: string;
  name: string;
  species: string;
  type: string;
  gender: string;
  origin: {
    name: string;
    dimension: string;
  };
  status: string;
};

type CharactersDataType = {
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

type CharacterNamesDataType = {
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
