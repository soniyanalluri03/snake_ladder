
import SnakesLayer from './SnakesLayer'
import LaddersLayer from './LaddersLayer'
import { snakes, ladders } from '../utils/boardConfig'

interface Player {
  id: number
  name: string
  position: number
  color: string
}

interface GameBoardProps {
  players: Player[]
}

function GameBoard({ players }: GameBoardProps) {
  return (
    <div className="relative mx-auto aspect-square w-full max-w-[650px] overflow-hidden rounded-xl border-4 border-amber-900 bg-white shadow-xl">

      <div className="absolute inset-0 grid grid-cols-10 grid-rows-10">
        {Array.from({ length: 100 }, (_, index) => {
          const row = Math.floor(index / 10)
          const column = index % 10
          const rowFromBottom = 9 - row

          const actualColumn =
            rowFromBottom % 2 === 0 ? column : 9 - column

          const squareNumber =
            rowFromBottom * 10 + actualColumn + 1

          const squarePlayers = players.filter(
            (player) => player.position === squareNumber,
          )

          const isSnakeHead = snakes[squareNumber] !== undefined
          const isLadderBottom = ladders[squareNumber] !== undefined

          const isAlternateColor =
            (rowFromBottom + actualColumn) % 2 === 0

          return (
            <div
              key={squareNumber}
              className={`relative flex min-w-0 flex-col border border-slate-300 p-0.5 ${
                isAlternateColor ? 'bg-red-500' : 'bg-white'
              }`}
            >
              <span className="relative z-20 text-[10px] font-extrabold text-slate-950 sm:text-sm">
                {squareNumber}
              </span>

              {isSnakeHead && (
                <span className="absolute right-0.5 top-0.5 z-20 text-[8px] font-bold text-red-950">
                  S
                </span>
              )}

              {isLadderBottom && (
                <span className="absolute bottom-0.5 right-0.5 z-20 text-[8px] font-bold text-green-950">
                  L
                </span>
              )}

              <div className="absolute inset-0 z-30 flex flex-wrap items-end justify-end gap-0.5 p-0.5">
                {squarePlayers.map((player) => (
                  <span
                    key={player.id}
                    title={player.name}
                    className="flex h-4 w-4 items-center justify-center rounded-full border border-white text-[7px] font-extrabold text-white shadow sm:h-6 sm:w-6 sm:text-[9px]"
                    style={{ backgroundColor: player.color }}
                  >
                    {player.id}
                  </span>
                ))}
              </div>
            </div>
          )
        })}
      </div>

      <SnakesLayer />
      <LaddersLayer />
    </div>
  )
}

export default GameBoard
