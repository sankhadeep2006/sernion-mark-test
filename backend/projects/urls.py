"""
URL patterns for projects app.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .api import ProjectViewSet, DatasetViewSet


app_name = 'projects'

router = DefaultRouter()
router.register(r'projects', ProjectViewSet, basename='project')
router.register(r'datasets', DatasetViewSet, basename='dataset')

urlpatterns = [
    path('', include(router.urls)),
]
