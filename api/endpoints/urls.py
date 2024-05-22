from django.urls import path

from . import views

urlpatterns = [
    path('fileUpload', views.fileUpload, name='fileUpload'),
    path("search", views.search, name="search")
]