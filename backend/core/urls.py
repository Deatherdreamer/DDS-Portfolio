from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import ProjectViewSet, TechnologyViewSet, UserViewSet

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('technologies', TechnologyViewSet)
router.register('projects', ProjectViewSet)

urlpatterns = [
    path('', include(router.urls)),
]