// npm i next-auth
// npm i @types/bcrypt
import NextAuth from 'next-auth'
import Credentials from 'next-auth/providers/credentials';
import { compare } from 'bcrypt';

import Githubprovider from 'next-auth/providers/github'
import Googleprovider from 'next-auth/providers/google'

import { PrismaAdapter } from '@next-auth/prisma-adapter';

import prismadb from '@/lib/prismadb'

export default NextAuth({

    providers: [
        Githubprovider({
            clientId:process.env.GITHUB_ID || '',
            clientSecret:process.env.GITHUB_SECRET || '',
        }),
        Googleprovider({
            clientId:process.env.GOOGLE_ID || '',
            clientSecret:process.env.GOOGLE_SECRET || '',
        }),
        Credentials({
            id:'credentials',
            name:'Credentials',
            credentials:{
                email:{
                    label:'Email',
                    type:'text',
                },
                password:{
                    label:'Password',
                    type:'password',
                }
            },
            async authorize(credentials){

                if(!credentials?.email || !credentials?.password){
                    throw new Error('Emaill and Password required')
                }

                const user = await prismadb.user.findUnique({
                    where:{
                        email:credentials?.email
                    }
                });

                if(!user || !user.hashedPassword){
                    throw new Error('No user')
                }
                
                const isCorrectPassword = await compare(credentials.password, user.hashedPassword);

                if(isCorrectPassword){
                    throw new Error('Incorrect Password')
                }

                return user;
            }
        })
    ],
    pages: {
        signIn: '/auth'
      },
    debug: process.env.NODE_ENV === 'development',
    adapter: PrismaAdapter(prismadb),
    session:{
        strategy:'jwt',
    },
    jwt:{
        secret:process.env.NEXTAUTH_JWT_SECRET,
    },
    secret:process.env.NEXTAUTH_SECRET,
    
});
