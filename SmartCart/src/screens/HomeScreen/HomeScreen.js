import { useState, useEffect } from "react"
import { HomeContainer } from "../../containers"
import { getAuth } from "firebase/auth"
import { db } from '@Configs/firebaseConfig'
import { collection, getDocs } from "firebase/firestore"

export function HomeScreen() {
    const [user, setUser] = useState(null)
    const [products, setProducts] = useState([])
    const auth = getAuth()

    useEffect(() => {
        if (auth.currentUser != null) {
            setUser(auth)
        } else {
            setUser(null)
        }
    }, [])

    useEffect(() => {
        async function getProducts() {
            const productsCollection = collection(db, "products")
            const querySnapshot = await getDocs(productsCollection)
            const productsData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))

            setProducts(productsData)
        }

        getProducts()
    }, [])


    return (
        <HomeContainer user={user} products={products} />
    )
}