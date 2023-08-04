import type { NextPage } from 'next'
import { NextPageContext } from 'next'
import { getSession,signOut } from 'next-auth/react'

//import useCurrentUser from "@/hooks/useCurrentUser";


import Navbar from '@/components/Navbar'
import Billboard from '@/components/Billboard';
import MovieList from '@/components/MovieList';
import InfoModal from '@/components/infoModal';

import useMovieList from '@/hooks/useMovieList'
import useFavorites from '@/hooks/useFavorites';
import useInfoModal from '@/hooks/useInfoModal';

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context)
  if(!session){
    return {
      redirect:{
        destination:'/auth',
        permanent:false
      }
    }
  }
  return {
    props:{}
  }
}


const Home: NextPage = () => {
  const {data : movies = []} = useMovieList();
  const {data : favorites = []} = useFavorites();
  const { isOpen,closeModal} = useInfoModal();
  return (
      <div>
          <InfoModal visible={isOpen} onClose={closeModal} />
          <Navbar />
          <Billboard />
          <div className="pb-40">
            <MovieList data={movies} title="หนังน่าดูวันนี้" />
            <MovieList data={favorites} title="หนังของฉันยังไงละ" />
          </div>
      </div>
  )
}

export default Home
