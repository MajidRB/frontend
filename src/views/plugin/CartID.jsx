
import React from 'react'

function CartID() {
    const generateRandomString = () => {
        const length = 30
        const characters = "HYPERSOFAL452081"
        let randomString = ""

        for(let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length)
            randomString += characters.charAt(randomIndex)
        }

        localStorage.setItem("randomString", randomString)
    }

    
    const existingRandomString = localStorage.getItem("randomString") 
    if (!existingRandomString){
        generateRandomString()
        } else {
            //log the existing random string
        }

    return existingRandomString
}

export default CartID
