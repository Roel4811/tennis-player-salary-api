export const countPlayerAces = (aces: [number, number]): number => {
  const [playerAces] = aces
  return playerAces
}

export const countPlayerSetsWon = (scores: [number, number][]): number => {
  return scores.filter(([player]) => {
    return player >= 6
  }).length
}

export const countGamesWon = (scores: [number, number][]): number =>
  scores.reduce((acc, [player]) => acc + player, 0)
