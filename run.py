
# coding=utf8
"""
Migrate pyecharts and Flask with custom templates functions.
"""
from __future__ import unicode_literals

import backend
# import httplib

from flask import Flask, render_template, request, json, jsonify



app = Flask(__name__, static_folder='static', static_url_path='/static')


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/upload", methods=['POST', 'GET'])
def _rest_audio_upload():
    filename = 'static/data/temp/sample1.ogg'
    wav = request.files['user_audio_blob'].save(filename)
    backend.convert_to_wav(filename)
    return 'ok'


@app.route("/rest/refresh_uploaded")
def _rest_refresh_uploaded():
    return jsonify(['static/data/temp/sample1.wav'])


@app.route("/rest/refresh_download")
def _rest_refresh_download():
    return jsonify(['static/data/temp/sample1.wav'])


if __name__ == '__main__':

    app.run(debug=True)