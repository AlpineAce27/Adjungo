import React from 'react'
import { useSelector } from "react-redux"
import ClientHome from '../../components/ClientHome'
import PilotHome from '../../components/PilotHome'


const Homepage = () => {
    const userType = useSelector(state => state.userType)

    return <>
        {userType === 'client' && <ClientHome />}
        {userType === 'pilot' && <PilotHome />}
    </>
}

export default Homepage