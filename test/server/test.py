from bottle import route, run, request, static_file
import pymongo
import json

conn = pymongo.Connection()
db = conn.test

@route('/get/')
def get():
    return {'status': "ok"}

@route('/get/persons/')
def get_persons():
    #import pdb
    #pdb.set_trace()
    query = request.query
    results = db.model.find({'points':[int(query.x), int(query.y)]})


    #print map(lambda x: {"name":x["name"]}, results)
    return {'persons': map(lambda x: {"name":x["name"]}, results)}

@route('/set/', method='POST')
def set():
    req = request.json
    #import pdb
    #pdb.set_trace()
    if db.model.find({"name": req["name"]}).count():
        db.model.update({"name": req["name"]}, req)
    else:
        db.model.insert(request.json)
    return {"status": "ok"}


@route('/test/')
def test():
    return static_file("test.html", root='../vendor/')

@route("/static/<filename:path>")
def static(filename):
    return static_file(filename, root='../vendor/')

run(host='localhost', port=8080)

