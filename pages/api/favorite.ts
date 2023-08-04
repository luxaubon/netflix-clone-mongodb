import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import prismadb from '@/lib/prismadb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  try {
    if (req.method === 'POST') {
      const  email  = req.body.email;
      const  movieId  = req.body.movieId;
      
      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });
  
      if (!existingMovie) {
        throw new Error('Invalid ID');
      }
      
      const user = await prismadb.user.update({
        where: {
          email: email || '',
        },
        data: {
          favoriteIds: {
            push: movieId
          }
        }
      });
  
       return res.status(200).json(user);
    }

    if (req.method === 'DELETE') {
      
      const  favoriteIds = req.body.favoriteIds;
      const  email  = req.body.email;
      const  movieId  = req.body.movieId;

      const existingMovie = await prismadb.movie.findUnique({
        where: {
          id: movieId,
        }
      });

      if (!existingMovie) {
        throw new Error('Invalid ID');
      }

      const updatedFavoriteIds = without(favoriteIds, movieId);

      const updatedUser = await prismadb.user.update({
        where: {
          email: email || '',
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        }
      });

      return res.status(200).json(updatedUser);
    }
    
    return res.status(405).end();
  } catch (error) {
    console.log(error);

    return res.status(500).end();
  }
}