from rest_framework import viewsets

from .models import Achievement, Company, Position, Project, Technology, User
from .serializers import (
    AchievementSerializer,
    CompanySerializer,
    PositionSerializer,
    ProjectSerializer,
    TechnologySerializer,
    UserSerializer,
)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class TechnologyViewSet(viewsets.ModelViewSet):
    queryset = Technology.objects.all()
    serializer_class = TechnologySerializer


class CompanyViewSet(viewsets.ModelViewSet):
    queryset = Company.objects.all()
    serializer_class = CompanySerializer


class PositionViewSet(viewsets.ModelViewSet):
    queryset = Position.objects.select_related('company').all()
    serializer_class = PositionSerializer


class AchievementViewSet(viewsets.ModelViewSet):
    queryset = Achievement.objects.select_related('company').all()
    serializer_class = AchievementSerializer


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.select_related('company').prefetch_related('tech_stack').all()
    serializer_class = ProjectSerializer
