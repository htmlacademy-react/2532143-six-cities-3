type BadgeProps = {
  type: 'place-card' | 'offer'
  text: string
}

function Badge({ type, text }: BadgeProps): JSX.Element {
  return (
    <div className={`${type}__mark`}>
      <span>{text}</span>
    </div>
  )
}

export { Badge }
