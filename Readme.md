### About

This is a small "one-endpoint" api to calculate the total salary of a tennis player, based on:

- € 500,- for every match played.
- € 200,- per game won.
- € 750,- per set won.
- € 2500,- per match won.
- € 100,- for each ace made.
- € -500,- for each smashed racket.
- € -100,- for each double fault.

### Assumptions

- no tiebreaks in results, but sets can have two games difference (7-5).
- all matches in the data are finished matches

The data consists of a static json file, located here: `src/data/player_data_v1.json`

### How to run

Start the project with `npm run dev`

Find total salary via `/salary/player/:id`, which will return the total in the following JSON format

```json
{
  "id": 1,
  "name": "Novak Djokovic",
  "salary": "The players salary (number)"
}
```

### Tests

Run tests with `npm test`
