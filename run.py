
# coding=utf8
"""
Migrate pyecharts and Flask with custom templates functions.
"""
from __future__ import unicode_literals
from flask import Flask, render_template, request, json, jsonify

import os
import backend
import config
from flask_sslify import SSLify

from glob import glob

ALLOWED_EXTENSIONS = set(['ogg', 'wav', 'mp4'])


app = Flask(__name__, static_folder='static', static_url_path='/static')
sslify = SSLify(app)

app.config['UPLOAD_FOLDER'] = config.TEMP_DIR
app.config['MAX_CONTENT_LENGTH'] = 512 * 1024 * 1024




@app.route("/")
@app.route("/123")
def index():
    return render_template('index.html')


@app.route("/demo")
def demo_index():
    return render_template('demo.html')


@app.route("/upload", methods=['POST'])
def _rest_audio_upload():
    filename = 'static/data/temp/sample1.ogg'
    wav = request.files['user_audio_blob'].save(filename)
    backend.convert_to_wav(filename)
    return 'ok'


@app.route("/rest/refresh_uploaded")
def _rest_refresh_uploaded():
    data = glob(os.path.join(config.UPLOADS_DIR,'*'))
    print(data)
    return jsonify(data)


@app.route("/rest/refresh_download")
def _rest_refresh_download():
    return jsonify(glob(os.path.join(config.DOWNLOADS_DIR, '*')))


if __name__ == '__main__':
    app.run(debug=True)
