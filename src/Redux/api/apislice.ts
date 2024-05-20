import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
        getPokemon: builder.query<{ count: number, next: string, previous: string, results: Array<{ name: string, url: string }> }, { offset?: number, count?: number }>({
            query: ({ offset = 0, count = 10 }) => `pokemon?offset=${offset}&&limit=${count}`,
        }),
        getPokemonDetailByName: builder.query({
            query: (id: number) => `pokemon/${id}`,
            transformResponse: (val: { abilities: Array<{ ability: { name: string } }>, id: string, name: string, weight: string, height: string, base_experience: string, types: Array<{ type: { name: string } }>, species: { url: string } },) => {
                return {
                    "abilities": val.abilities.reduce((acc: Array<string>, curr: { ability: { name: string } }) => {
                        acc.push(curr.ability.name);
                        return acc
                    }, []),
                    "id": val.id,
                    "name": val.name,
                    "weight": val.weight,
                    "height": val.height,
                    "base_experience": val.base_experience,
                    "type": val.types[0].type.name,
                    "species": val.species.url.split('/')[6]
                }
            }
        }),
        getEvolutionId: builder.query({
            query: (id: string) => `pokemon-species/${id}/`,
            transformResponse: (val: { evolution_chain: { url: string } }) => val.evolution_chain.url.split('/')[6]
        }),
        getEvolutions: builder.query({
            query: (id: string) => `evolution-chain/${id}/`
        })
    }),
})

export const { useGetPokemonQuery, useGetPokemonDetailByNameQuery, useLazyGetEvolutionIdQuery, useLazyGetEvolutionsQuery } = pokemonApi;