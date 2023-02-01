

export const Button = ({onClick}) => {
  return (
    <button type="button" className="Button" onClick={onClick}>
      <span className="Button-label">Load more</span>
    </button>
  )
}