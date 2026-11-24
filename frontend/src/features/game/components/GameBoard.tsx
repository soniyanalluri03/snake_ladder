
import boardImage from '../../../assets/game/board/snake-ladder-board.png'

interface Player {
  id: number
  name: string
  position: number
  color: string
}

interface GameBoardProps {
  players: Player[]
}

// Calculate the center of each square on the zigzag board.
function getSquareCoordinates(square: number) {
  const rowFromBottom = Math.floor((square - 1) / 10)
  const columnFromLeft = (square - 1) % 10

  const actualColumn =
    rowFromBottom % 2 === 0
      ? columnFromLeft
      : 9 - columnFromLeft

  return {
    x: (actualColumn + 0.5) * 10,
    y: (9 - rowFromBottom + 0.5) * 10,
  }
}

// Keep multiple player tokens centered as a group.
function getPlayerOffsets(count: number) {
  const layouts: Record<number, { x: number; y: number }[]> = {
    1: [{ x: 0, y: 0 }],

    2: [
      { x: -10, y: 0 },
      { x: 10, y: 0 },
    ],

    3: [
      { x: 0, y: -9 },
      { x: -10, y: 9 },
      { x: 10, y: 9 },
    ],

    4: [
      { x: -9, y: -9 },
      { x: 9, y: -9 },
      { x: -9, y: 9 },
      { x: 9, y: 9 },
    ],

    5: [
      { x: 0, y: 0 },
      { x: -12, y: -10 },
      { x: 12, y: -10 },
      { x: -12, y: 10 },
      { x: 12, y: 10 },
    ],
  }

  return layouts[count] ?? layouts[1]
}

function GameBoard({ players }: GameBoardProps) {
  const playersByPosition = players.reduce<Record<number, Player[]>>(
    (groups, player) => {
      if (player.position < 1 || player.position > 100) {
        return groups
      }

      if (!groups[player.position]) {
        groups[player.position] = []
      }

      groups[player.position].push(player)

      return groups
    },
    {},
  )

  return (
    <div className="relative mx-auto aspect-square w-full overflow-hidden rounded-xl">

      <img
        src={boardImage}
        alt="Snake and Ladders game board"
        draggable={false}
        className="absolute inset-0 h-full w-full select-none object-contain"
      />

      {/* Player token positioning layer */}
      <div className="absolute inset-[2.5%]">

        {Object.entries(playersByPosition).map(([square, squarePlayers]) => {
          const coordinates = getSquareCoordinates(Number(square))
          const offsets = getPlayerOffsets(squarePlayers.length)

          return squarePlayers.map((player, index) => {
            const offset = offsets[index]

            return (
              <div
                key={player.id}
                title={`${player.name} - Square ${square}`}
                className="absolute flex h-6 w-6 items-center justify-center rounded-full border-2 border-white text-[10px] font-extrabold text-white shadow-lg sm:h-8 sm:w-8 sm:text-xs"
                style={{
                  left: `${coordinates.x}%`,
                  top: `${coordinates.y}%`,
                  transform: `translate(-50%, -50%) translate(${offset.x}px, ${offset.y}px)`,
                  backgroundColor: player.color,
                  zIndex: 20 + index,
                }}
              >
                {player.id}
              </div>
            )
          })
        })}

      </div>
    </div>
  )
}

export default GameBoard
