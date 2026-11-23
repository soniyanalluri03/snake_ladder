
import snakeBlueGreen from '../../../assets/game/snakes/snake-blue-green.png'
import snakeYellow from '../../../assets/game/snakes/snake-yellow.png'

interface SnakePlacement {
  id: number
  image: string
  left: string
  top: string
  width: string
  height: string
  rotation: number
}

const snakePlacements: SnakePlacement[] = [
  // Snake: 27 -> 3
  {
    id: 1,
    image: snakeBlueGreen,
    left: '20%',
    top: '72%',
    width: '50%',
    height: '26%',
    rotation: -27,
  },

  // Snake: 54 -> 31
  {
    id: 2,
    image: snakeYellow,
    left: '45%',
    top: '35%',
    width: '24%',
    height: '28%',
    rotation: 0,
  },

  // Snake: 89 -> 53
  {
    id: 3,
    image: snakeBlueGreen,
    left: '75%',
    top: '8%',
    width: '20%',
    height: '27%',
    rotation: 5,
  },
]

function SnakesLayer() {
  return (
    <div className="pointer-events-none absolute inset-2 z-10 overflow-hidden rounded-lg">
      {snakePlacements.map((snake) => (
        <img
          key={snake.id}
          src={snake.image}
          alt={`Snake ${snake.id}`}
          draggable={false}
          className="absolute object-contain drop-shadow-md"
          style={{
            left: snake.left,
            top: snake.top,
            width: snake.width,
            height: snake.height,
            transform: `rotate(${snake.rotation}deg)`,
            transformOrigin: 'center',
          }}
        />
      ))}
    </div>
  )
}

export default SnakesLayer
