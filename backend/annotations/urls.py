"""
URL patterns for annotations app.
"""
from django.urls import path, include
from rest_framework.routers import DefaultRouter


app_name = 'annotations'

router = DefaultRouter()
# Register annotation viewsets here in the future

urlpatterns = [
    path('', include(router.urls)),
]
