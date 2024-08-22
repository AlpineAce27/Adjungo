import axios from 'axios'
const greenCol = "#84cc16"
const yellowCol = "#fbbf24"
const orangeCol = "#ea580c"
const redCol ="#dc2626"

function getRatingColor(rating) {
    let color = ''
    if(+rating >= 4){
        color = greenCol
      }else if(+rating >= 3 && +rating  < 4){
        color = yellowCol
      }else if(+rating >= 2 && +rating < 3){
        color = orangeCol
      }else if(+rating < 2){
        color = redCol
      }
      return color
}

export default getRatingColor