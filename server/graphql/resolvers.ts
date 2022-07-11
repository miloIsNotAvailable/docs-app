import { PrismaClient } from '@prisma/client'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { v4 } from 'uuid'
import pg from 'pg'
import { ORM } from '../orm/ORM'

dotenv.config()

const client = new pg.Client( process.env.DATABASE_URL! )
client.connect()
const prisma = new PrismaClient()
const orm = new ORM()

// resolver function for each API endpoint
export const resolver = {
    hello: () => {
      return 'Hello!';
    },
    getUserData: async( args: any ) => {

      // find users with provided email
      const userExists: any = await orm.select( {
        table: 'Users',
        where: {
          email: args?.email
        }
      } )
      
      console.log( userExists )

      // throw an error if user length is > 0 exists 
      if( userExists!.length ) return new Error( 'user already exists' )
      
      // generate refresh token 
      // and save it to database
      const refreshToken = jwt.sign( {
        username: args?.username, 
        email: args?.email
      }, process.env.REFRESH_TOKEN!)

      // create new user
      const user = await orm.create( {
        table: 'Users',
        data: {
          id: v4(),
          sessiontoken: refreshToken,
          ...args
        } 
      })

      // generate new access token
      // with expiration date 
      const accessToken = jwt.sign( {
        id: user![0]?.id,
        username: args?.username, 
        email: args?.email
      }, process.env.ACCESS_TOKEN! )

      // save refresh token to db
      // await orm.create( {
      //   table: 'Session',
      //   data: {
      //     token: refreshToken
      //   }
      // } )

      return { ...user![0], sessionToken: accessToken }  
    },
    logInUser: async( args: any ) => {
     
      // find users with provided email
      const user: any = await orm.select( {
        table: 'Users',
        where: {
          email: args?.email
        }
      } )
      
      console.log( user )

      // throw an error if user does not exist 
      if( !user!.length ) return new Error( 'user does not exist' )
      
      const refreshToken = jwt.sign( {
        id: user![0]?.id,
        username: args?.username, 
        email: args?.email
      }, process.env.REFRESH_TOKEN!)

      await orm.update( {
        table: 'Users',
        data: {
          sessiontoken: refreshToken
        },
        where: {
          id: user![0]?.id
        }
      } )

      // generate new access token
      // with expiration date 
      const accessToken = jwt.sign( {
        id: user![0]?.id,
        username: args?.username, 
        email: args?.email
      }, process.env.ACCESS_TOKEN! )

      return { ...user![0], sessionToken: refreshToken, accessToken }
    },
    decodeJWT: async( args: any ) => {

      let accToken: any;

      const accessToken: any = jwt.verify( args?.token, process.env.ACCESS_TOKEN! )

      const user: any = await orm.select( {
        table: 'Users',
        where: {
          id: accessToken?.id
        }
      } )

      console.log( user )

      if( !user.length ) return

      if( !user[0]?.sessiontoken ) return {
        newToken: null
      }

      jwt.verify( user[0]?.sessiontoken as string, process.env.REFRESH_TOKEN!, ( err, data ) => {
      accToken = jwt.sign( {
        id: user[0]?.id,
        username: user[0]?.username, 
        email: user[0]?.email
      }, process.env.ACCESS_TOKEN! )
      console.log( accToken )
      } )

      const data = jwt.verify( accToken, process.env.ACCESS_TOKEN! )
      console.log( data )

      return {
        newToken: accToken,
        data
      }
    },
    logOutUser: async( args: any ) => {
      const data = await orm.update( {
        table: 'Users',
        data: {
          sessiontoken: ""
        },
        where: {
          id: args?.id
        }
      } )
      console.log( data )

      const d = await orm.select( {
        table: 'Users',
        where: { id: args?.id }
      } )
      console.log( d )

      return args
    },
    projects: async( args: any ) => {
      const data = await orm.select( {
        table: 'Project',
        where: {
          user_id: args?.userId
        }
      } )

      return data
    },
    getNewProject: async( args: any ) => {
      console.log( args ) 
      const data = await orm.create( {
        table: 'Project',
        data: {
          id: v4(),
          content: "",
          title: args?.title,
          user_id: args?.userId
        }
      } )
      console.log( data )
      return data![0]
    }
  };