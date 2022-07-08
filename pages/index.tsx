import { getProducts, Product } from "@stripe/firestore-stripe-payments";
import axios from "axios";
import Head from "next/head";
import { useRecoilValue } from "recoil";
import { modalState, movieState } from "../atoms/modalAtom";
import Banner from "../components/Banner/Banner";
import Header from "../components/Header/Header";
import Modal from "../components/Modal/Modal";
import Plans from "../components/Plans/Plans";
import Row from "../components/Row/Row";
import useAuth from "../hooks/useAuth";
import useList from "../hooks/useList";
import useSubscription from "../hooks/useSubscription";
import payments from "../lib/stripe";
import { Movie } from "../typings";
import requests from "../utils/requests/requests";

interface Props {
  // For movie data
  netflixOriginals: Movie[];
  trendingNow: Movie[];
  topRated: Movie[];
  actionMovies: Movie[];
  comedyMovies: Movie[];
  horrorMovies: Movie[];
  romanceMovies: Movie[];
  documentaries: Movie[];
  // For plan data
  products: Product[];
}

const Home = ({
  netflixOriginals,
  trendingNow,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
  products,
}: Props) => {
  // console.log("PLANS from stripe => ", products);
  const { loading, user } = useAuth();
  const showModal = useRecoilValue(modalState);
  const subscription = useSubscription(user);
  const movie = useRecoilValue(movieState);
  const list = useList(user?.uid);

  if (loading || subscription === null) return null;

  if (!subscription) return <Plans products={products} />;

  return (
    <div className="relative h-screen bg-gradient-to-b lg:h-[140vh]">
      <Head>
        <title>Home - Netflix</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <Header />
      <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16">
        {/* Banner */}
        <Banner netflixOriginals={netflixOriginals} />
        <section className="md:space-y-24">
          <Row title="Trending Now" movies={trendingNow} />
          <Row title="Top Rated" movies={topRated} />
          <Row title="Action Thrillers" movies={actionMovies} />
          {/* Showing my list row if my list has any movies */}
          {list.length > 0 && <Row title="My List" movies={list} />}
          <Row title="Comedies" movies={comedyMovies} />
          <Row title="Scary Movies" movies={horrorMovies} />
          <Row title="Romance Movies" movies={romanceMovies} />
          <Row title="Documentaries" movies={documentaries} />
        </section>
      </main>
      {/* Modal */}
      {showModal && <Modal />}
    </div>
  );
};

export default Home;

// Server Side Rendering
export const getServerSideProps = async () => {
  // for plan data
  const products = await getProducts(payments, {
    includePrices: true,
    activeOnly: true,
  })
    .then((res) => res)
    .catch((error) => console.log(error));

  // for movie data
  const [
    netflixOriginals,
    trendingNow,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    axios.get(requests.fetchNetflixOriginals).then((res) => res.data),
    axios.get(requests.fetchTrending).then((res) => res.data),
    axios.get(requests.fetchTopRated).then((res) => res.data),
    axios.get(requests.fetchActionMovies).then((res) => res.data),
    axios.get(requests.fetchComedyMovies).then((res) => res.data),
    axios.get(requests.fetchHorrorMovies).then((res) => res.data),
    axios.get(requests.fetchRomanceMovies).then((res) => res.data),
    axios.get(requests.fetchDocumentaries).then((res) => res.data),
  ]);

  return {
    props: {
      // for movie data
      netflixOriginals: netflixOriginals.results,
      trendingNow: trendingNow.results,
      topRated: topRated.results,
      actionMovies: actionMovies.results,
      comedyMovies: comedyMovies.results,
      horrorMovies: horrorMovies.results,
      romanceMovies: romanceMovies.results,
      documentaries: documentaries.results,
      // for plan data
      products: products,
    },
  };
};
