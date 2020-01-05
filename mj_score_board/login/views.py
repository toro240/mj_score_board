from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse
from django.http.response import JsonResponse
from django.conf import settings
from login.auth import not_logged_in
import requests
import json

from logging import getLogger
logger = getLogger(__name__)

# Create your views here.
@not_logged_in
def index(request):
    return render(request, 'login/index.html')

@not_logged_in
def new(request):
    return render(request, 'login/new.html')

def auth(request):
    ret = {
        "status": 200,
        "data": {
            "message": "",
        },
    }
    if request.method == 'GET':
        ret["status"] = 400
        ret["data"]["message"] = "not support GET"
        return JsonResponse(ret)

    if not request.POST.keys() >= {"user_name", "password"}:
        ret["status"] = 401
        ret["data"]["message"] = "認証に失敗しました。"
        return JsonResponse(ret)

    url = settings.MJ_API_DOMAIN + "login/auth"
    query = {
        "user_name": request.POST["user_name"],
        "password": request.POST["password"],
    }

    p_result = requests.post(url, query)
    ret = p_result.json()

    if ret["status"] == 200:
        request.session["mj_session"] = ret["data"]["aws_result"]["Session"]
        request.session["mj_user_name"] = ret["data"]["aws_result"]["ChallengeParameters"]["USER_ID_FOR_SRP"]

    return JsonResponse(ret)
