from rest_framework import serializers

from .models import (
    Achievement,
    Company,
    Position,
    Project,
    Screenshot,
    SocialLink,
    Technology,
    User,
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']


class TechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = Technology
        fields = ['id', 'name']


class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = ['id', 'name', 'is_remote', 'start_date', 'end_date']


class PositionSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(), source='company', write_only=True
    )

    class Meta:
        model = Position
        fields = ['id', 'name', 'company', 'company_id', 'start_date', 'end_date']


class AchievementSerializer(serializers.ModelSerializer):
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(), source='company', write_only=True, required=False, allow_null=True
    )

    class Meta:
        model = Achievement
        fields = ['id', 'title', 'description', 'company', 'company_id']


class ScreenshotSerializer(serializers.ModelSerializer):
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=Project.objects.all(), source='project'
    )

    class Meta:
        model = Screenshot
        fields = ['id', 'title', 'description', 'image', 'order', 'project_id']


class ProjectSerializer(serializers.ModelSerializer):
    tech_stack = TechnologySerializer(many=True, read_only=True)
    company = CompanySerializer(read_only=True)
    company_id = serializers.PrimaryKeyRelatedField(
        queryset=Company.objects.all(), source='company', write_only=True, required=False, allow_null=True
    )
    screenshots = ScreenshotSerializer(many=True, read_only=True)

    class Meta:
        model = Project
        fields = ['id', 'name', 'description', 'tech_stack', 'company', 'company_id', 'screenshots']


class SocialLinkSerializer(serializers.ModelSerializer):
    platform_display = serializers.CharField(source='get_platform_display', read_only=True)

    class Meta:
        model = SocialLink
        fields = ['id', 'platform', 'platform_display', 'link']


