from flask import Flask, render_template

app = Flask(__name__, template_folder='template')

@app.route("/login")
def login():
    return render_template("login.html")

@app.route("/home")
def home():
    return render_template("index.html")

app.run(debug=True)