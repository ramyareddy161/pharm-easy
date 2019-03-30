"""medical_store_management URL Configuration

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
from django.conf import settings
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token
from rest_framework_jwt.views import obtain_jwt_token
from pharm_easy.views import *

app_name="pharm_easy"


urlpatterns = [
    url('^admin/',admin.site.urls),
    url('pharm_easy/',include('pharm_easy.urls',namespace="pharm_easy")),
    url(r'^api-jwttoken-auth/', obtain_jwt_token),
    url(r'^api-basictoken-auth/', obtain_auth_token),
    url(r'^api/auth/', include('knox.urls')),
    # url(r'^', FrontendAppView.as_view()),
    url(r'^', TemplateView.as_view(template_name="index.html")),
]


if settings.DEBUG:
    import debug_toolbar

    urlpatterns = [
                      url(r'^__debug__/', include(debug_toolbar.urls)),
                      url(r'^api-jwttoken-auth/', obtain_jwt_token),
                      url(r'^api-basictoken-auth/', obtain_auth_token),
                  ] + urlpatterns
