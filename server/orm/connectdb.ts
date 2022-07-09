import pg from 'pg'

export const connect = async() => {
    
    console.log( 'postgress server running on ->' + process.env.DATABASE_URL )

    const client = new pg.Client(process.env.DATABASE_URL);
    
    (async () => {
      await client.connect();
      try {
        const results = await client.query("SELECT NOW()");
        // console.log(results);
      } catch (err) {
        console.error("error executing query:", err);
      } finally {
        client.end();
      }
    })();

    return client
}