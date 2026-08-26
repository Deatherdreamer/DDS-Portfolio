from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    pass


class Technology(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.name


class Company(models.Model):
    name = models.CharField(max_length=200, unique=True)
    is_remote = models.BooleanField(default=False)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return self.name


class Position(models.Model):
    name = models.CharField(max_length=200)
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='positions')
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return f"{self.name} at {self.company.name}"


class Achievement(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='achievements', null=True, blank=True)

    def __str__(self):
        return self.title


class Project(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField()
    tech_stack = models.ManyToManyField(Technology, related_name='projects')
    company = models.ForeignKey(Company, on_delete=models.SET_NULL, related_name='projects', null=True, blank=True)

    def __str__(self):
        return self.name