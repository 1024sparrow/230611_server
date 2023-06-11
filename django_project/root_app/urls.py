"""django_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.urls import path, re_path
from . import views

urlpatterns = [
    path('book/', views.index_html),
    path('books/', views.index_html),
    path('music/', views.index_html),
    path('book/contents/', views.index_html),
    re_path(r'^book/page/[^/]+/contents/$', views.index_html),
    re_path(r'^book/page/[^/]+/$', views.index_html),
    path('auth/', views.index_html),
    path('book/auth/', views.index_html),
    path('books/auth/', views.index_html),
    path('music/auth/', views.index_html),
    re_path(r'^book/page/[^/]+/auth/$', views.index_html),
    path('book/contents/auth/', views.index_html),
    re_path(r'^book/page/[^/]+/contents/auth/$', views.index_html),
    path('auth/register/', views.index_html),
    path('book/auth/register/', views.index_html),
    path('books/auth/register/', views.index_html),
    path('music/auth/register/', views.index_html),
    re_path(r'^book/page/[^/]+/auth/register/$', views.index_html),
    path('book/contents/auth/register/', views.index_html),
    re_path(r'^book/page/[^/]+/contents/auth/register/$', views.index_html),
    path('auth/login/register/', views.index_html),
    path('book/auth/login/register/', views.index_html),
    path('books/auth/login/register/', views.index_html),
    path('music/auth/login/register/', views.index_html),
    re_path(r'^book/page/[^/]+/auth/login/register/$', views.index_html),
    path('book/contents/auth/login/register/', views.index_html),
    re_path(r'^book/page/[^/]+/contents/auth/login/register/$', views.index_html),
    path('auth/login/', views.index_html),
    path('book/auth/login/', views.index_html),
    path('books/auth/login/', views.index_html),
    path('music/auth/login/', views.index_html),
    re_path(r'^book/page/[^/]+/auth/login/$', views.index_html),
    path('book/contents/auth/login/', views.index_html),
    re_path(r'^book/page/[^/]+/contents/auth/login/$', views.index_html),
    path('robots.txt/', views.robots_txt),
    path('', views.index_html),
]
