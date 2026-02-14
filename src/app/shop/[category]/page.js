import NavBar from '@/components/NavBar/NavBar'
import Footer from '@/components/Footer/Footer'

export default async function Shop({params}){
    const {category} = await params;
    return(
        <main>
            <header>
                <NavBar/>
            </header>
            <section>
                <div>
                    {
                       category ? category : 'All products'
                    }
                </div>
            </section>
            <footer>
                <Footer/>
            </footer>
        </main>
    );
}