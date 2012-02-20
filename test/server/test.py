from bottle import route, run, request, static_file
import pymongo
import json

conn = pymongo.Connection()
db = conn.test

@route('/get/')
def get():
    print db.model.find_one()
    import pdb
    pdb.set_trace()
    return db.model.find_one()

@route('/set/', method='POST')
def set():
    db.model.insert(request.json)
    return "ok"


@route('/test/')
def test():
    return static_file("test.html", root='../vendor/')

@route("/static/<filename:path>")
def static(filename):
    return static_file(filename, root='../vendor/')

run(host='localhost', port=8080)
    
