import { PrismaClient } from '@prisma/client'
import { UserDataType } from '../../src/interfaces/queries/UserData'

const prisma = new PrismaClient()

// resolver function for each API endpoint
export const resolver = {
    hello: () => {
      return 'Hello!';
    },
    getUserData: async( args: UserDataType ) => {
      console.log( args )
      return args  
    }
  };