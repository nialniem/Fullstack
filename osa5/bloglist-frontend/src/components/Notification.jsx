const Notification = ({ message }) => {
  if (!message) return null

  const style = {
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: message.type === 'error' ? 'red' : 'green',
  }

  return <div style={style}>{message.text}</div>
}

export default Notification
