
import { snakes, ladders } from './boardConfig'

export function calculateNewPosition(
  currentPosition: number,
  diceValue: number,
): number {
  const newPosition = currentPosition + diceValue

  if (newPosition > 100) {
    return currentPosition
  }

  return newPosition
}

export function checkSnakeOrLadder(position: number): number {
  if (snakes[position] !== undefined) {
    return snakes[position]
  }

  if (ladders[position] !== undefined) {
    return ladders[position]
  }

  return position
}
