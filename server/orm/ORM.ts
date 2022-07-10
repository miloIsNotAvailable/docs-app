import pg from 'pg'
import { connect } from './connectdb'

type createType = {
    table: string,
    data: any,
}

type deleteType = {
    table: string,
    where?: any,
    OR?: any
}

type selectType = {
    table: string,
    where?: any,
}

type updateType = {
    table: string,
    data: any, 
    where: any
}

// const client = new pg.Client( process.env.DATABASE_URL! )
export class ORM {

    delete = async( { where, table, OR }: deleteType ) => {
        
        const client = await connect()

        const WHEREvals = where && Object.keys( where ).map(
            n => `${ n }='${ where[n] }'`
         )

         const ORvals = OR && Object.keys( OR ).map(
            n => `${ OR }='${ where[n] }'`
         )

         const additionaqueryInfoWHERE = where ? `WHERE ${ WHEREvals }`: ""
         const additionaqueryInfoOR = OR ? `WHERE ${ WHEREvals } OR ${ ORvals }` : ""

        let queryData;

        // await client.connect()
        try {
            const data = await client.query( `DELETE FROM ${ table } ${ additionaqueryInfoWHERE } ${ additionaqueryInfoOR }`)
            queryData = data?.rows
        } catch ( e ) {
            console.log( e )
        }
        return queryData
    }
    select = async( { where, table }: selectType ) => {
        
        const client = await connect()

        const WHEREvals = where && Object.keys( where ).map(
            n => `${ n }=${ where[n] }`
         )

         const additionaqueryInfoWHERE = where ? `WHERE ${ WHEREvals }`: ""

        /**
         * get keys from the data object, 
         * separate themwith comma
         */ 
        const where_vals = where ? Object.keys( where ).map(
            n => `WHERE ${ n }='${ where[n] }'`
        ) : null

        const statement = where_vals ? `SELECT * FROM ${table } ${ where_vals }` : `SELECT * FROM ${ table }`

        let queryData;

        try {
            // await client.connect()
            const data = await client.query( statement )
            queryData = data?.rows
        } catch ( e ) {
            console.log( e )
        }
        return queryData
    }
    update = async( { data, table, where }: updateType ) => {
        
        const client = await connect()

        const updateVals = Object.keys( data )
        .map(
            n => `${ n }='${ data[n] }' `
        )
        .join(",")

        const where_vals = Object.keys( where ).map( 
            n => `${ n }='${ where[n] }'` 
            )

        let queryData;

        // await client.connect()
        try {
            const data = await client.query( `UPDATE ${ table } SET ${ updateVals } WHERE ${ where_vals }`)
            queryData = data?.rows
        } catch ( e ) {
            console.log( e )
        }
        return queryData
    }
    create = async( { data, table }: createType ) => {
        
        const client = await connect()

        /**
         * get keys from the data object, 
         * separate themwith comma
         */ 
        const keys = Object.keys( data ).join(",")
        /**
         * user values put also separated with comma
         */
        const vals = Object.values( data ).map( n => `'${ n }'` ).join(",")

        let queryData;

        // await client.connect()
        try {
            const data = await client.query( `INSERT INTO ${ table }(${ keys }) VALUES(${ vals }) RETURNING ${ keys }`)
            queryData = data?.rows
        } catch ( e ) {
            console.log( e )
        }
        return queryData
    }
}