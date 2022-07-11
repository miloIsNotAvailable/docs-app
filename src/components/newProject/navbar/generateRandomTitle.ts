import { adj, nouns } from "./dictionary"

export const genRandomTitle: () => string = () => {

    const rnadomAdj = adj[Math.floor( Math.random() * adj.length )]
    const randomNoun = nouns[Math.floor( Math.random() * nouns.length )]
    return rnadomAdj + " " + randomNoun
}