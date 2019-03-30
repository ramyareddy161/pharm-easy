from django.shortcuts import render

# Create your views here.

import os
from django import forms
from django.http import JsonResponse
from knox.models import AuthToken
from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.response import Response

from pharm_easy.models import *
from pharm_easy.serializers import *

import logging

from django.views.generic import View
from django.http import HttpResponse
from django.conf import settings


# class FrontendAppView(View):
#     """
#     Serves the compiled frontend entry point (only works if you have run `yarn
#     run build`).
#     """
#
#     def get(self, request):
#         try:
#             with open(os.path.join(settings.REACT_APP_DIR, 'bundles', 'index.html')) as f:
#                 return HttpResponse(f.read())
#         except FileNotFoundError:
#             logging.exception('Production build of app not found')
#             return HttpResponse(
#                 """
#                 This URL is only used when you have built the production
#                 version of the app. Visit http://localhost:3000/ instead, or
#                 run `yarn run build` to test the production version.
#                 """,
#                 status=501,
#             )


class RegistrationAPI(generics.GenericAPIView):
    serializer_class = UserProfileSerializer
    permission_classes = [permissions.AllowAny, ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer
    permission_classes = [permissions.AllowAny, ]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": AuthToken.objects.create(user)
        })


class UserAPI(generics.RetrieveAPIView):
    permission_classes = [permissions.AllowAny, ]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class CreateUserProfileJsonView(CreateAPIView):
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly, ]
    userprofile = UserProfile.objects.all
    serializer_class = UserProfileSerializer


@api_view(['GET', 'POST'])
def medicalshop_list(request):
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly, ]
    if request.method == 'GET':
        medical_shop =  MedicalShop.objects.all()
        serializer = MedicalShopSerializer(medical_shop, many=True)
        return JsonResponse(serializer.data,safe=False)

    elif request.method == 'POST':
        serializer = MedicalShopSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def medicine_list(request):
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly, ]
    if request.method == 'GET':
        medicine_list =  Medicine.objects.all()
        serializer = MedicineDetailSerializer(medicine_list, many=True)
        return JsonResponse(serializer.data,safe=False)

    elif request.method == 'POST':
        serializer = MedicineDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def mycart_list(request):
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly, ]
    if request.method == 'GET':
        mycart_list =  Medicine.objects.all()
        serializer = MyCartDetailSerializer(medicine_list, many=True)
        return JsonResponse(serializer.data,safe=False)

    elif request.method == 'POST':
        serializer = MyCartDetailSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateMedicalShopJsonView(CreateAPIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly, ]
    queryset = MedicalShop.objects.all
    serializer_class = CreateMedicalShopSerializer


class CreateMedicineJsonView(ListAPIView):
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly, ]
    serializer_class = CreateMedicineSerializer
    def get_queryset(self):
        medicines = Medicine.objects.all
        return medicines


class CreateMyCartJsonView(CreateAPIView):
    #permission_classes = [permissions.IsAuthenticatedOrReadOnly, ]
    serializer_class = CreateMyCartSerializer

    def get_queryset(self):
        mycart = MyCart.objects.filter(user__id=self.kwargs['user_id'])
        return mycart
