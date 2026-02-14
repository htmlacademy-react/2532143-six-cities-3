function Badge({ text }: { text: string }): JSX.Element {
  return (
    <div className="place-card__mark">
      <span>{text}</span>
    </div>
  )
}

export { Badge }
