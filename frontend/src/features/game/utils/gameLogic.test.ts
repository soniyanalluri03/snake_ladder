import { describe, expect, it } from 'vitest'
import {
  calculateNewPosition,
  checkSnakeOrLadder,
} from './gameLogic'

describe('calculateNewPosition', () => {
  it('should move the player forward', () => {
    expect(calculateNewPosition(10, 4)).toBe(14)
  })

  it('should allow the player to reach square 100', () => {
    expect(calculateNewPosition(95, 5)).toBe(100)
  })

  it('should prevent movement beyond square 100', () => {
    expect(calculateNewPosition(98, 3)).toBe(98)
  })
})

describe('checkSnakeOrLadder', () => {
  it('should move from snake head 27 to tail 3', () => {
    expect(checkSnakeOrLadder(27)).toBe(3)
  })

  it('should move from snake head 54 to tail 31', () => {
    expect(checkSnakeOrLadder(54)).toBe(31)
  })

  it('should climb from ladder bottom 4 to top 25', () => {
    expect(checkSnakeOrLadder(4)).toBe(25)
  })

  it('should climb from ladder bottom 33 to top 49', () => {
    expect(checkSnakeOrLadder(33)).toBe(49)
  })

  it('should remain on a normal square', () => {
    expect(checkSnakeOrLadder(20)).toBe(20)
  })
})