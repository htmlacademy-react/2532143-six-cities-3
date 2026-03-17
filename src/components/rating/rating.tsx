type RatingProps = {
  rating: number
}

function Rating({ rating }: RatingProps) {
  const ratingPercentage = (rating / 5) * 100

  return (
    <span
      style={{
        width: `${ratingPercentage}%`,
      }}
    ></span>
  )
}

export { Rating }
