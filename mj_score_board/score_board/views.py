from django.shortcuts import render, redirect
from django.http import HttpResponseRedirect
from django.urls import reverse

from logging import getLogger
logger = getLogger(__name__)

# Create your views here.
def index(request):
    return render(request, 'score_board/index.html')
