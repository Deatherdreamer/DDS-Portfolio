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


def screenshot_upload_path(instance, filename):
    return f'projects/{instance.project_id}/screenshots/{filename}'


class Screenshot(models.Model):
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='screenshots')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    image = models.ImageField(upload_to=screenshot_upload_path)
    order = models.PositiveIntegerField(null=True, blank=True)

    class Meta:
        ordering = ['order', 'id']

    def save(self, *args, **kwargs):
        if self.order is None:
            last = Screenshot.objects.filter(project=self.project).aggregate(models.Max('order'))['order__max']
            self.order = 1 if last is None else last + 1
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.title} ({self.project.name})"


class SocialLink(models.Model):
    class Platform(models.TextChoices):
        GITHUB = 'github', 'GitHub'
        LINKEDIN = 'linkedin', 'LinkedIn'
        FACEBOOK = 'facebook', 'Facebook'
        X_TWITTER = 'x_twitter', 'X / Twitter'
        X = 'x', 'X'
        TWITTER = 'twitter', 'Twitter'
        INSTAGRAM = 'instagram', 'Instagram'
        YOUTUBE = 'youtube', 'YouTube'
        TIKTOK = 'tiktok', 'TikTok'
        DISCORD = 'discord', 'Discord'
        TWITCH = 'twitch', 'Twitch'
        REDDIT = 'reddit', 'Reddit'
        WEBSITE = 'website', 'Personal Website'
        OTHER = 'other', 'Other'

    platform = models.CharField(
        max_length=50,
        choices=Platform.choices,
        help_text="Social media platform or page type.",
    )
    link = models.URLField(
        max_length=500,
        help_text="The URL of the social profile or page.",
    )

    class Meta:
        verbose_name = 'Social Link'
        verbose_name_plural = 'Social Links'

    def __str__(self):
        return f"{self.get_platform_display()}: {self.link}"

