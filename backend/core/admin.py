from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import Project, Technology, User


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    pass


@admin.register(Technology)
class TechnologyAdmin(admin.ModelAdmin):
    pass


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ('name', 'description')
    filter_horizontal = ('tech_stack',)