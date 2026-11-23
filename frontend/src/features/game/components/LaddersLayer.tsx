
import ladderWood from '../../../assets/game/ladders/ladder-wood.png'
import ladderTeal from '../../../assets/game/ladders/ladder-teal.png'
import { ladders } from '../utils/boardConfig'

const ladderImages = [ladderWood, ladderTeal]

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

function LaddersLayer() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {Object.entries(ladders).map(([start, end], index) => {
        const bottom = getSquareCoordinates(Number(start))
        const top = getSquareCoordinates(end)

        const dx = top.x - bottom.x
        const dy = top.y - bottom.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const angle = Math.atan2(dy, dx) * (180 / Math.PI)

        return (
          <img
            key={start}
            src={ladderImages[index % ladderImages.length]}
            alt={`Ladder from ${start} to ${end}`}
            draggable={false}
            className="absolute z-10 object-contain drop-shadow-md"
            style={{
              left: `${bottom.x}%`,
              top: `${bottom.y}%`,
              width: `${distance}%`,
              height: '9%',
              transform: `translate(-50%, -50%) rotate(${angle}deg)`,
              transformOrigin: 'center',
            }}
          />
        )
      })}
    </div>
  )
}

export default LaddersLayer
