//this function returns true if a and b (coordinates) are within range of eachother (miles)

//earth circ

function inRange(alat, alng, blat, blng, range) {

    // console.log("A:", alat, alng)
    // console.log("B:", blat, blng)
    // console.log("range:", range)
    //convert to radians
    alat = alat*(Math.PI/180)
    alng = alng*(Math.PI/180)
    blat = blat*(Math.PI/180)
    blng = blng*(Math.PI/180)
    
    // console.log("rad A:", alat, alng)
    // console.log("rad B:", blat, blng)

    //place them in the Haversine formula to calculate distance between the two points in Nautical Miles
    const distance = 3440.1 * Math.acos(  (Math.sin(alat)*Math.sin(blat)) +  (Math.cos(alat)*Math.cos(blat)  *  Math.cos(alng - blng))  )
    
    //console.log("distance between a and b is:", distance, "nautical miles")
    if(distance <= range){
        //console.log("within range: TRUE")
        return true
    }
    else{
        //console.log("within range: FALSE")
        return false
    }
}
export default inRange