from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Achievement, Company, Position, Project, Technology, User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    pass


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    pass


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    list_display = ('name', 'is_remote', 'start_date', 'end_date')


@admin.register(Position)
class PositionAdmin(admin.ModelAdmin):
    list_display = ('name', 'company', 'start_date', 'end_date')
    list_filter = ('company',)


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    list_display = ('title', 'company')
    list_filter = ('company',)


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'description', 'company')
    filter_horizontal = ('tech_stack',)
