import React from 'react'
import { useSelector } from 'react-redux'
import HomeNavigator from './HomeNavigator'
import StarterNavigator from './StarterNavigator'

export default () => {
    if (isNewUser())
        return <StarterNavigator />
    else
        return <HomeNavigator />
}

function isNewUser() {
    const user = useSelector(state => state.user)

    return  (user.name === '')
            || (user.name === undefined)
}