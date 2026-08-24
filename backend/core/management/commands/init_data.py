from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand

from core.models import Technology

User = get_user_model()

DEFAULT_TECHS = [
    'Python',
    'Django',
    'Flask',
    'FastAPI',
    'SQL',
    'PostgreSQL',
    'SQLite',
    'Redis',
    'Docker',
    'Git',
    'GitHub',
    'GitHub Actions',
    'REST',
    'GraphQL',
    'JSON',
    'YAML',
    'JavaScript',
    'TypeScript',
    'React',
    'Next.js',
    'Vue',
    'Angular',
    'Node.js',
    'Express',
    'NestJS',
    'HTML',
    'CSS',
    'Tailwind CSS',
    'Bootstrap',
    'Sass',
    'Vite',
    'Webpack',
    'Jest',
    'Pytest',
    'Vitest',
    'CI/CD',
    'Linux',
    'Bash',
    'AWS',
    'GCP',
]


class Command(BaseCommand):
    help = 'Initialize the database with a default admin user and a set of common technologies.'

    def add_arguments(self, parser):
        parser.add_argument(
            '--username',
            default='ddsp',
            help='Username for the admin user (default: ddsp).',
        )
        parser.add_argument(
            '--email',
            default='dsztajnworc.dev@gmail.com',
            help='Email for the admin user (default: dsztajnworc.dev@gmail.com).',
        )
        parser.add_argument(
            '--password',
            default='ddsp',
            help='Password for the admin user (default: ddsp).',
        )
        parser.add_argument(
            '--reset',
            action='store_true',
            help='Delete existing technologies before seeding.',
        )

    def handle(self, *args, **options):
        username = options['username']
        email = options['email']
        password = options['password']
        reset = options['reset']

        self._create_admin_user(username, email, password)
        self._create_technologies(reset)

        self.stdout.write(self.style.SUCCESS('Initialization complete.'))

    def _create_admin_user(self, username, email, password):
        if User.objects.filter(username=username).exists():
            self.stdout.write(f'Admin user "{username}" already exists -- skipping.')
            return

        user = User.objects.create_superuser(
            username=username,
            email=email,
            password=password,
        )
        user.is_staff = True
        user.is_superuser = True
        user.save()
        self.stdout.write(self.style.SUCCESS(
            f'Created admin user "{username}" <{email}>.'
        ))

    def _create_technologies(self, reset):
        if reset:
            deleted, _ = Technology.objects.all().delete()
            if deleted:
                self.stdout.write(f'Cleared {deleted} existing technologies.')

        created = 0
        for name in DEFAULT_TECHS:
            _, was_created = Technology.objects.get_or_create(name=name)
            if was_created:
                created += 1

        total = Technology.objects.count()
        self.stdout.write(self.style.SUCCESS(
            f'Created {created} new technologies ({total} total in database).'
        ))
