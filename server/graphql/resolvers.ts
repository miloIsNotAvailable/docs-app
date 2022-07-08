import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// resolver function for each API endpoint
export const resolver = {
    hello: () => {
      return 'Hello world!';
    },
  };