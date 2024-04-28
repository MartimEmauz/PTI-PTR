import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'nomedo_seu_projeto.settings')

application = get_wsgi_application()