#!/bin/bash

virtualenv venv -p /usr/bin/python3
source venv/bin/activate
pip3 install -r requirements.txt
deactivate
