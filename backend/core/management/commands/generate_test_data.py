from django.contrib.auth import get_user_model
from django.core.management.base import BaseCommand, CommandError
from faker import Faker

from core.models import Project, Technology

User = get_user_model()


class Command(BaseCommand):
    help = 'Generate fake projects using Faker, drawing from the existing technologies.'

    def add_arguments(self, parser):
        parser.add_argument(
            '-n', '--number',
            type=int,
            default=10,
            help='Number of fake projects to generate (default: 10).',
        )
        parser.add_argument(
            '--min-techs',
            type=int,
            default=2,
            help='Minimum number of technologies per project (default: 2).',
        )
        parser.add_argument(
            '--max-techs',
            type=int,
            default=6,
            help='Maximum number of technologies per project (default: 6).',
        )
        parser.add_argument(
            '--seed',
            type=int,
            default=None,
            help='Seed for the Faker random generator (default: None).',
        )
        parser.add_argument(
            '--clear',
            action='store_true',
            help='Delete existing projects before generating new ones.',
        )

    def handle(self, *args, **options):
        if not User.objects.exists():
            raise CommandError(
                'No users found in the database. '
                'Run "python manage.py init_data" first to create an admin user.'
            )

        if not Technology.objects.exists():
            raise CommandError(
                'No technologies found in the database. '
                'Run "python manage.py init_data" first to seed the tech stack.'
            )

        number = options['number']
        min_techs = options['min_techs']
        max_techs = options['max_techs']
        seed = options['seed']
        clear = options['clear']

        if min_techs < 1:
            raise CommandError('--min-techs must be at least 1.')
        if max_techs < min_techs:
            raise CommandError('--max-techs cannot be lower than --min-techs.')

        fake = Faker()
        if seed is not None:
            Faker.seed(seed)

        techs = list(Technology.objects.all())
        if len(techs) < max_techs:
            max_techs = len(techs)

        if clear:
            deleted, _ = Project.objects.all().delete()
            if deleted:
                self.stdout.write(f'Cleared {deleted} existing projects.')

        created = 0
        for _ in range(number):
            name = fake.unique.catch_phrase()
            description = '\n\n'.join([
                fake.paragraph(nb_sentences=4),
                fake.paragraph(nb_sentences=5),
            ])
            tech_count = fake.random_int(min=min_techs, max=max_techs)
            chosen_techs = fake.random_elements(
                elements=techs,
                length=tech_count,
                unique=True,
            )

            project = Project.objects.create(
                name=name,
                description=description,
            )
            project.tech_stack.set(chosen_techs)
            created += 1

        self.stdout.write(self.style.SUCCESS(
            f'Created {created} fake projects '
            f'(using {len(techs)} available technologies).'
        ))
