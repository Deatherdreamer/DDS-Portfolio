from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Technology(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Project(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.ManyToManyField(Technology, related_name='projects')

    def __str__(self):
        return self.name