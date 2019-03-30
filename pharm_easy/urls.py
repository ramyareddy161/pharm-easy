from django.contrib import admin
from django.urls import path
from django.views.generic import TemplateView

from pharm_easy.views import *

app_name="pharm_easy"


urlpatterns=[
    path('/', TemplateView.as_view(template_name="index.html")),
    path("api/auth/register/", RegistrationAPI.as_view()),
    path("api/auth/login/", LoginAPI.as_view()),
    path("api/auth/user/", UserAPI.as_view()),
    path("api/medical_shop/",medicalshop_list),
    path("api/medicine/", medicine_list),
    # path("api/questions/<int:question_id>/",CreateAnswerDetailJsonView.as_view()),
    # path("api/adduser/",CreateUserProfileJsonView.as_view()),
    # path("api/questions/addquestion/", CreateQuestionJsonView.as_view()),
    # path("api/questions/<int:question_id>/addanswer/", CreateAnswerJsonView.as_view()),
]