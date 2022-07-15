from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
from ariadne import load_schema_from_path, make_executable_schema, graphql_sync, snake_case_fallback_resolvers, ObjectType, gql, QueryType, MutationType
from ariadne.constants import PLAYGROUND_HTML
from ariadne.asgi import GraphQL
import os
import tensorflow as tf
import time

# Create type instance for Query type defined in our schema...
query = QueryType()
mutation = MutationType()

type_defs = gql("""
    
    type Book {
        books: String
    }

    type getSuggestion {
        userInput: String
    }

    type Query {
        hello: String!
        book: Book
        Suggestions( userInput: String ): getSuggestion
    }

    type Mutation {
        Suggestion( userInput: String ): getSuggestion
    }
""")

@mutation.field( 'Suggestion' )
def resolve_suggestion(*_, userInput=""):

        if userInput != "":

            one_step_reloaded = tf.saved_model.load( os.path.normpath( os.getcwd() + "\\venvs\\flask\\static\\text_gen" ) )

            start = time.time()
            states = None
            next_char = tf.constant([ userInput ])
            # next_char_saved = tf.constant(['this koolaid is rather'])
            result = [next_char]


            # dummy variable since tensorflow won't accept None only [1, 1024] tensor
            state_saved = tf.zeros([1, 1024], dtype=tf.float32)

            for n in range(1000):
                if one_step_reloaded is not None:
                    next_char, state_saved = one_step_reloaded.call( inputs=next_char, states=state_saved )    

                    result.append(next_char)
        
            return {
                'userInput': tf.strings.join(result[1:])[0].numpy().decode("utf-8")
            }
        
        return { 'userInput': userInput }

app = Flask(__name__)
CORS( app )

schema = make_executable_schema(type_defs, query, mutation)

GraphQL( schema, debug=True ) 

@app.route("/graphql", methods=["GET"])
def graphql_playground():
    return PLAYGROUND_HTML, 200

@app.route("/graphql", methods=["POST"])
def graphql_server():
    data = request.get_json()
    success, result = graphql_sync(
        schema,
        data,
        context_value=request,
        debug=app.debug
    )
    status_code = 200 if success else 400
    return jsonify(result), status_code



@app.route('/')
def hello_world():
    return 'Hello!'

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run( debug=True, port=port )