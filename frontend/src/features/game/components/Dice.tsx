
interface DiceProps {
  title?: string
  onRoll: (value: number) => void
  disabled?: boolean
  diceValue: number
}

const dicePatterns: Record<number, number[]> = {
  1: [5],
  2: [1, 9],
  3: [1, 5, 9],
  4: [1, 3, 7, 9],
  5: [1, 3, 5, 7, 9],
  6: [1, 3, 4, 6, 7, 9],
}

function Dice({
  title = 'Your Dice',
  onRoll,
  disabled = false,
  diceValue,
}: DiceProps) {
  const rollDice = () => {
    if (disabled) return

    const randomValue = Math.floor(Math.random() * 6) + 1
    onRoll(randomValue)
  }

  return (
    <div className="flex flex-col items-center gap-3">
      <h2 className="text-lg font-bold text-white sm:text-xl">
        {title}
      </h2>

      <button
        type="button"
        onClick={rollDice}
        disabled={disabled}
        aria-label={`Roll dice. Current value is ${diceValue}`}
        className={`grid h-20 w-20 grid-cols-3 grid-rows-3 gap-1 rounded-2xl border-[3px] border-slate-300 bg-white p-3 shadow-lg transition-all duration-200 sm:h-24 sm:w-24 sm:p-3.5 lg:h-28 lg:w-28 ${
          disabled
            ? 'cursor-not-allowed opacity-60'
            : 'cursor-pointer hover:scale-105 hover:border-orange-400 active:scale-95'
        }`}
      >
        {Array.from({ length: 9 }, (_, index) => {
          const position = index + 1
          const showDot = dicePatterns[diceValue]?.includes(position)

          return (
            <span
              key={position}
              className="flex items-center justify-center"
            >
              {showDot && (
                <span className="h-2.5 w-2.5 rounded-full bg-slate-950 sm:h-3 sm:w-3 lg:h-3.5 lg:w-3.5" />
              )}
            </span>
          )
        })}
      </button>

      <p className="text-sm font-semibold text-white sm:text-base">
        {disabled ? 'Moving...' : `Result: ${diceValue}`}
      </p>

      <p className="text-xs text-slate-400">
        Click the dice to roll
      </p>
    </div>
  )
}

export default Dice
