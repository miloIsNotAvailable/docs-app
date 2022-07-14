from flask import Flask
from flask import request, jsonify
from flask_cors import CORS
from ariadne import load_schema_from_path, make_executable_schema, graphql_sync, snake_case_fallback_resolvers, ObjectType, gql, QueryType, MutationType
from ariadne.constants import PLAYGROUND_HTML
from ariadne.asgi import GraphQL

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
def resolve_suggestion(*_, userInput): 
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
    app.run( debug=True, port=5000 )