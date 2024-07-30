
const GreenButton = (props) => {
    return (
        <button onClick={props.onClickFunction} className="green-button">
            {props.text}
        </button>
    )
}

export default GreenButton