# building Clue 
#projects/fun



## eng notes

- probably should've gone with a more OOP approach but wanted to just finish it.


## How to use
- since you may want to edit things (eg you may type in the suggestion incorrectly) 
 (and out of laziness in development), I elected to not interact via CLI, but instead 
 just edit the index.ts directly as the in-game interface. Just re-run the file
 to get up to date clues.

💡Everything below this was written before implementation, so it may be out of date.


### Core Strategy
- remember who answered what suggestions (and who didn’t eg who had to pass)
	- there is actually a lot to glean from passing, it can eliminate previous answers
- keep track of known clues
- after each suggestion, input the answers and non-answers (skips)
- analyze the current state by…
	- for each player
		- for each suggestion they answered:
			- eliminate any of the three that are known clues
			- eliminate any of the three that they passed on
			- if only one is left, then we know that was the clue they answered with
				- in this case, cut this analyze() short, add the clue to known clues, and re-start analysis

## initialize
- Input:
	- All players in order
- logic:
	- initialize `knownClues`  as { person: [], place: [], weapon: [] }
	- initialize each players `answered` and `skipped` arrays as []
	- store the player order
- invoke `addClue()`  on each of my starter clues

## gameplay
-  `addSuggestion()`
	- notes:
		- Invoke on any player’s suggestion (including me) 
	- arguments: 
		- asked: player
		- answered: player
		- items: {person, place, weapon}
	- logic:
		- add the three items to the answered persons “answered”
		- for each person in between the asker and the answerer, add the three items to their “passed on”
		- invoke `analyze()`
		- print out current `knownClues`
-  `addClue()`
	- notes:
		- do this manually if its my turn and I see a clue
	- arguments:
		- item: { type: Person | Place | Weapon, name: string }
	- logic:
		- add the clue to `knownClues`
		- invoke `analyze()`
- `analyze()`
	- notes:
		- to be run at the end of `addClue()` and `addSuggestion()`. Since this function can invoke `addClue()`  itself, its co-recursive.
		- core logic here
	- arguments:
		- `this`
	- logic:
		-  for each player
			- for each suggestion in `player.answered`:
				- eliminate any of the three that are in `knownClues`
				- eliminate any of the three that are in `player.skipped`
				- if only one is left, then we have a new clue
					- exit this `analyze()` runtime by invoking `addClue` with the new clue
					- potentially add this to a `player.heldClues` array for error-checking
				- if none are left, then we already knew about this clue **or** they’re a dirty, stinking liar
					- if all three are in `player.skipped` they definitely lied
					- if none are in `player.heldClues` then they lied