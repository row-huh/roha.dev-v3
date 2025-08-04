---
title: "How Computers Play Games - And Why are They so Good at it?"
description: "An in-depth look at the algorithms that make computers unbeatable"
date: "Aug 1, 2024"
image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/cyberpunk-anime-girl-sci-fi-4k-wallpaper-uhdpaper.com-468%405%40c.jpg-ae1SMvR1soRNtvSstJphuUvsqX1QMY.jpeg"
category: "highlights"
---


Computers are pretty amazing at playing games, whether it's a simple one like Tic-Tac-Toe or more challenging ones like Go or Chess. Behind the scenes, they use some really clever algorithms, with one of the main ones being minimax!

### Minimax
Minimax is a popular algorithm used in games like Tic-Tac-Toe, Chess, Go, and many others. But before we get into the details, let's break down what minimax is all about. It's an algorithm that carefully explores all possible moves before making a decision. So, since I have the opportunity, let me tell you all about it!

### How Minimax works
To keep things clear, we'll use Tic-Tac-Toe as our example, but remember, the same principles apply to any other game. Before we dive in, I'll introduce some terminology to help you follow along and make the text sound a bit more engaging.

**Agent** - This term generally refers to the AI that is playing the game.

**State** - A state is a snapshot of the game's current configuration. 

Minimax is an algorithm which is used in adversarial games: which are games in which you are playing against another player. Mortal Kombat is an adversarial game, while games such are overcooked and minecraft are not adversarial in nature

The main principle of minimax is representing states using numbers. That is, we assign numbers to three possible outcomes of the game, such as
1 = agent's opponent winning , 
0 = the game ending in a draw, 
-1 = agent winning

These numerical values are referred to as 'utility'. Now, which utility is best for the AI? It's -1 (agent wins), which is also the lowest value. The agent aims for the lowest possible score because that means it's winning or to ensure that the opponent isn't winning. This role makes the AI a "minimizing player." However, if you switch the roles, the AI becomes a "maximizing player" and aims to achieve a higher score. The principle remains the same.

For the sake of this explanation, let's focus on the AI being a "minimizing player." The main goal of the minimizing player isn't just to achieve a -1 but to minimize the score as much as possible. So, the AI would prefer a score of 0 over 1, and if there's an opportunity to get a -1, it would choose that over a 0.

Here's the logic:
1.  **Base Case:**
  
  -   If the game is over in the current `state`:
      -   Return the utility of the `state`.
2.  **Maximizing Player's Turn (`isMaximizingPlayer = true`):**
  
  -   Initialize `maxEval` to `-infinity`.
  -   For each possible move in `state`:
      -   Calculate `eval` as `minimax(newState, depth + 1, false)`.
      -   Update `maxEval` to `max(maxEval, eval)`.
  -   Return `maxEval`.
3.  **Minimizing Player's Turn (`isMaximizingPlayer = false`):**
  
  -   Initialize `minEval` to `+infinity`.
  -   For each possible move in `state`:
      -   Calculate `eval` as `minimax(newState, depth + 1, true)`.
      -   Update `minEval` to `min(minEval, eval)`.
  -   Return `minEval`.

#### Function: `findBestMove(state)`

**Inputs:**

-   `state`: The current game state.

**Output:**

-   Returns the best move for the maximizing player (AI).

#### Steps:

1.  Initialize `bestEval` to `-infinity`.
2.  Initialize `bestMove` to `null`.
3.  For each possible move in `state`:
  -   Calculate `eval` as `minimax(newState, 0, false)`.
  -   If `eval > bestEval`:
      -   Update `bestEval` to `eval`.
      -   Update `bestMove` to `move`.
4.  Return `bestMove`.

That's the gist of Minimax, but here's a big issue: Minimax checks out all possible game states before making a decision. It's fine for simple games like Tic-Tac-Toe where there aren't too many states to look at. But think about Chess – there are tons of possible states, so using regular Minimax just isn't practical. That's where Alpha-Beta pruning comes in. It's a trick to speed things up by skipping some of the calculations. I know you might be thinking why alpha? why beta? Guess we need another crash course on more jargons!

1.  **Alpha**: The best value that the maximizing player currently can guarantee at that level or above.
2.  **Beta**: The best value that the minimizing player currently can guarantee at that level or above.

Here's how the pruning works:

### Maximizing Player (AI) Perspective:

-   **Alpha** starts at negative infinity.
-   When evaluating child nodes, if a node's value is greater than Alpha, then Alpha is updated to this new value.
-   If Alpha becomes greater than or equal to Beta, there's no need to evaluate further nodes in this branch, as the minimizing player will not choose this branch (because there's a better option available).

### Minimizing Player (Opponent) Perspective:

-   **Beta** starts at positive infinity.
-   When evaluating child nodes, if a node's value is less than Beta, then Beta is updated to this new value.
-   If Beta becomes less than or equal to Alpha, there's no need to evaluate further nodes in this branch, as the maximizing player will not choose this branch (because there's a better option available).

Now, Consider the following,

![example scenario for alpha-beta pruning](images/image.png)

#### Evaluating Node B:

-   The score from B is 3, which becomes the best score for the maximizing player.

#### Evaluating Node C:

-   The score from C is 2, which becomes the best score for the minimizing player.

Since the maximizing player's best score (3) is already better than the minimizing player's best score (2), there's no need to evaluate Node C's second child (score 6).

In short, computers are great at games because they use smart techniques like Minimax to consider all possible moves. For complex games like Chess, they use a faster techniques such as alpha beta pruning or move ordering. These methods help computers make strategic decisions and often outplay human players.
