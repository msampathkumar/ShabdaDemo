
# coding=utf8
"""
Migrate pyecharts and Flask with custom templates functions.
"""
from __future__ import unicode_literals

import random
import datetime

from flask import Flask, render_template
from flask.templating import Environment


app = Flask(__name__, static_folder='static',
            static_url_path='/static')



@app.route("/")
def index():
    return render_template('index.html')


if __name__ == '__main__':

    app.run(debug=True)