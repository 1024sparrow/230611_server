#!/bin/bash

if [[ ! -d venv ]]
then
    bash init_script.sh
fi
trap "deactivate && echo virtual environment deactivated" SIGINT SIGTERM
source venv/bin/activate && echo virtual environment activated
pushd django_project
django-admin --version
./manage.py runserver 0.0.0.0:8080
#PLATFORM_BUILD_PATH=static_build && ./manage.py runserver 0.0.0.0:8080
