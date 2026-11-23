import Button from '../../../components/common/Button'

interface DiceProps {
  title: string
  onRoll: (value: number) => void
  disabled?: boolean
}

function Dice({ title, onRoll, disabled = false }: DiceProps) {
  const rollDice = () => {
    if (disabled) return

    const randomValue = Math.floor(Math.random() * 6) + 1
    onRoll(randomValue)
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <h2 className="text-xl font-bold text-white">{title}</h2>

      <Button onClick={rollDice} disabled={disabled}>
        {disabled ? 'Moving...' : 'Roll Dice'}
      </Button>
    </div>
  )
}

export default Dice