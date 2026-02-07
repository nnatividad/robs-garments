import { use } from 'react'

export default await function ItemDetails({ params }){
    const { slug } = use(params);
    return(
        <main>
            <h1>{slug}</h1>
        </main>
    )
}