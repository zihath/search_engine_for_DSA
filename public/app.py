from flask import Flask, render_template, request
from pymongo import MongoClient

uri = "mongodb+srv://zihath04:samz04@cluster0.tmx5z.mongodb.net/"
# Establish a connection to MongoDB
client = MongoClient(uri)

# Access your specific database and collection
db = client['search_engine']

collection = db['problems']


from sklearn.feature_extraction.text import TfidfVectorizer

# Retrieve all problem titles from MongoDB
documents = collection.find({}, {"title": 1})
titles = [doc['title'] for doc in documents]

vectorizer = TfidfVectorizer()
tfidf_matrix = vectorizer.fit_transform(titles)

document_ids = [doc['_id'] for doc in collection.find({})]

def search_problems(query, n=50):
    # Transform the query into a TF-IDF vector
    query_vector = vectorizer.transform([query])
    
    # Calculate similarity scores for each document in the TF-IDF matrix
    scores = (query_vector * tfidf_matrix.T).toarray()[0]
    
    # Get the indices of the top `n` relevant documents
    relevant_indices = scores.argsort()[-n:][::-1]

    # Fetch documents by IDs for the top relevant indices
    relevant_problems = []
    for idx in relevant_indices:
        problem = collection.find_one({'_id': document_ids[idx]}) 
        if problem:
            relevant_problems.append(problem)

    # Display the relevant problems
    # for problem in relevant_problems:
    #     print(f"Title: {problem['title']}, Link: {problem['link']}, Difficulty: {problem['difficulty']}")

    return relevant_problems



my_list = [ 'array', 'binary search' ,  'greedy' , 'dynamic programming' , 'graph' , 'trees' , 'bfs' , 'dfs' , 'bit manupilation' , 'heap' , 'implementation' , 'linked list' , 'sorting' , 'stack' , 'string' , 'ternery search' , 'two pointers' , 'sliding window' , 'combinatorics' , 'divide and conquer']

app = Flask(__name__)


@app.route("/", methods=["GET", "POST"])
def home():
    return render_template("home.html")

@app.route("/all", methods=["GET", "POST"])
def all():
    
    return render_template("all_problem.html" , my_list = my_list)

@app.route("/problems_by_tag", methods=["GET"])
def problems_by_tag():
    # Get the selected tag from query parameters
    tag = request.args.get('tag')
    
    # Retrieve problems with the specified tag from MongoDB collection
    problems = list(collection.find({"tags": tag}))

    # Ensure tags are in list format
    for problem in problems:
        if isinstance(problem['tags'], str):
            problem['tags'] = problem['tags'].split(",")  # Convert comma-separated string to list
    
    # Render the results in a new template
    return render_template("problems_by_tag.html", problems=problems, tag=tag)




@app.route("/index", methods=["GET", "POST"])
def index():
    relevant_problems = []  # Initialize an empty list
    if request.method == "POST":
        query = request.form.get("query")
        print("relevant problems are:")
        relevant_problems = search_problems(query)  # Get relevant problems
        return render_template("index.html", query=query, relevant_problems=relevant_problems)
    return render_template("index.html", query=None, relevant_problems=relevant_problems)



# if __name__ == "__main__":
#     app.run(debug=True)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
