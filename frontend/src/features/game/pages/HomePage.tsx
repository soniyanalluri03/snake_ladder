
import { useState } from 'react'
import Button from '../../../components/common/Button'
import Dice from '../components/Dice'
import GameBoard from '../components/GameBoard'
import {
  calculateNewPosition,
  checkSnakeOrLadder,
} from '../utils/gameLogic'

interface Player {
  id: number
  name: string
  position: number
  color: string
}

const playerColors = [
  '#f97316',
  '#2563eb',
  '#16a34a',
  '#9333ea',
  '#db2777',
]

const playerNames = ['Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5']

function wait(milliseconds: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, milliseconds))
}

function HomePage() {
  const [playerCount, setPlayerCount] = useState<number>(2)
  const [players, setPlayers] = useState<Player[]>([])
  const [activePlayerIndex, setActivePlayerIndex] = useState<number>(0)
  const [diceValue, setDiceValue] = useState<number>(1)
  const [isRolling, setIsRolling] = useState<boolean>(false)
  const [winner, setWinner] = useState<Player | null>(null)
  const [gameStarted, setGameStarted] = useState<boolean>(false)

  const startGame = () => {
    const newPlayers = Array.from({ length: playerCount }, (_, index) => ({
      id: index + 1,
      name: playerNames[index],
      position: 0,
      color: playerColors[index],
    }))

    setPlayers(newPlayers)
    setActivePlayerIndex(0)
    setDiceValue(1)
    setWinner(null)
    setGameStarted(true)
  }

  
const handleDiceRoll = async (value: number) => {
  if (isRolling || winner) return

  setIsRolling(true)
  setDiceValue(value)

  const currentPlayer = players[activePlayerIndex]

  const landingPosition = calculateNewPosition(
    currentPlayer.position,
    value,
  )

  // Animate normal movement, one square at a time.
  for (
    let position = currentPlayer.position + 1;
    position <= landingPosition;
    position++
  ) {
    await wait(250)

    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player.id === currentPlayer.id
          ? { ...player, position }
          : player,
      ),
    )
  }

  await wait(500)

  // Check whether the landing square has a snake or ladder.
  const finalPosition = checkSnakeOrLadder(landingPosition)

  if (finalPosition !== landingPosition) {
    await wait(300)

    // Move to the snake's tail or ladder's top.
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player.id === currentPlayer.id
          ? { ...player, position: finalPosition }
          : player,
      ),
    )

    await wait(700)
  }

  if (finalPosition === 100) {
    setWinner({
      ...currentPlayer,
      position: 100,
    })

    setIsRolling(false)
    return
  }

  setActivePlayerIndex(
    (currentIndex) => (currentIndex + 1) % players.length,
  )

  setIsRolling(false)
}


  const restartGame = () => {
    if (isRolling) return

    setGameStarted(false)
    setPlayers([])
    setWinner(null)
    setDiceValue(1)
    setActivePlayerIndex(0)
  }

  // Player selection screen.
  if (!gameStarted) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 p-4">
        <div className="w-full max-w-md rounded-2xl bg-white p-8 text-center shadow-2xl">

          <h1 className="text-3xl font-extrabold text-orange-500">
            Snake & Ladders
          </h1>

          <p className="mt-3 text-slate-600">
            Choose how many players will play.
          </p>

          <div className="mt-8">
            <label className="mb-3 block font-semibold text-slate-800">
              Number of Players
            </label>

            <div className="flex justify-center gap-3">
              {[2, 3, 4, 5].map((count) => (
                <button
                  key={count}
                  type="button"
                  onClick={() => setPlayerCount(count)}
                  className={`h-12 w-12 rounded-lg border-2 font-bold transition ${
                    playerCount === count
                      ? 'border-orange-500 bg-orange-500 text-white'
                      : 'border-slate-300 bg-white text-slate-800 hover:border-orange-400'
                  }`}
                >
                  {count}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 flex justify-center gap-2">
            {playerColors.slice(0, playerCount).map((color, index) => (
              <span
                key={index}
                className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                style={{ backgroundColor: color }}
              >
                P{index + 1}
              </span>
            ))}
          </div>

          <Button onClick={startGame} className="mt-8">
            Start Game
          </Button>
        </div>
      </main>
    )
  }

  const activePlayer = players[activePlayerIndex]

  
return (
  <main className="h-screen overflow-hidden bg-slate-950 p-3">
    <div className="mx-auto flex h-full w-full max-w-7xl flex-col gap-3">

      {/* Top bar */}
      <header className="flex shrink-0 items-center justify-between gap-3">
        <h1 className="text-2xl font-extrabold text-orange-500 sm:text-3xl">
          Snake & Ladders
        </h1>

        <div className="flex items-center gap-3">
          {!winner && (
            <p className="text-sm font-bold text-white sm:text-base">
              {activePlayer.name}'s Turn
            </p>
          )}

          <Button
            variant="outline"
            onClick={restartGame}
            disabled={isRolling}
          >
            Restart
          </Button>
        </div>
      </header>

      {/* Player status */}
      <div className="flex shrink-0 flex-wrap justify-center gap-2">
        {players.map((player, index) => (
          <div
            key={player.id}
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 ${
              activePlayerIndex === index && !winner
                ? 'border-orange-500 bg-orange-500/15'
                : 'border-slate-700 bg-slate-900'
            }`}
          >
            <span
              className="h-4 w-4 rounded-full"
              style={{ backgroundColor: player.color }}
            />

            <div>
              <p className="text-xs font-bold text-white">
                {player.name}
              </p>
              <p className="text-xs text-slate-400">
                Square {player.position}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Board and dice */}
      
{/* Board and dice */}
<section className="flex min-h-0 flex-1 flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5 lg:gap-8">

  {/* Game board */}
  <div className="flex min-h-0 min-w-0 flex-1 items-center justify-center">
    <div className="w-[min(78vw,620px)] sm:w-[min(62vh,620px)]">
      <GameBoard players={players} />
    </div>
  </div>

  {/* Dice panel */}
  <aside className="flex shrink-0 flex-col items-center justify-center gap-3 sm:w-32 lg:w-40">
    {winner ? (
      <div className="text-center">
        <h2 className="text-lg font-bold text-green-400">
          🏆 {winner.name} Wins!
        </h2>
        <p className="mt-2 text-sm text-slate-300">
          Congratulations! You reached square 100.
        </p>
      </div>
    ) : (
      <>
        <Dice
          title="Your Dice"
          diceValue={diceValue}
          onRoll={handleDiceRoll}
          disabled={isRolling}
        />

        {isRolling && (
          <p className="animate-pulse text-center text-xs font-semibold text-orange-400">
            {activePlayer.name} is moving...
          </p>
        )}
      </>
    )}
  </aside>
</section>


    </div>
  </main>
)

}

export default HomePage
