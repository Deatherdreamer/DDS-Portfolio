from django.urls import include, path
from rest_framework.routers import DefaultRouter

from .views import (
    AchievementViewSet,
    CompanyViewSet,
    PositionViewSet,
    ProjectViewSet,
    ScreenshotViewSet,
    TechnologyViewSet,
    UserViewSet,
)

router = DefaultRouter()
router.register('users', UserViewSet)
router.register('technologies', TechnologyViewSet)
router.register('companies', CompanyViewSet)
router.register('positions', PositionViewSet)
router.register('achievements', AchievementViewSet)
router.register('projects', ProjectViewSet)
router.register('screenshots', ScreenshotViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
