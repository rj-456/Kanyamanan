import os
import shutil
from pathlib import Path
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'kanyamanan_backend.settings')

application = get_wsgi_application()

# Auto-initialize database on Vercel
if os.getenv('VERCEL') or os.getenv('AWS_LAMBDA_FUNCTION_NAME'):
    try:
        from django.core.management import call_command
        from django.contrib.auth.models import User

        if not os.getenv('DATABASE_URL'):
            tmp_db = Path('/tmp/db.sqlite3')
            base_dir = Path(__file__).resolve().parent.parent
            src_db = base_dir / 'db.sqlite3'

            if (not tmp_db.exists() or tmp_db.stat().st_size == 0) and src_db.exists() and src_db.stat().st_size > 0:
                try:
                    shutil.copy2(src_db, tmp_db)
                except Exception as copy_err:
                    print(f"Copy db error: {copy_err}")

        # Check if database schema and admin account exist
        needs_init = False
        try:
            if not User.objects.filter(username='admin').exists():
                needs_init = True
        except Exception:
            needs_init = True

        if needs_init:
            call_command('migrate', interactive=False)
            try:
                from api.seed_data import seed
                seed()
            except Exception as seed_err:
                print(f"Seeding error: {seed_err}")
    except Exception as init_err:
        print(f"Auto-init error: {init_err}")

# Vercel serverless function export
app = application
