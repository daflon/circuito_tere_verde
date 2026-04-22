from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.generic import TemplateView
import os

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("api.urls")),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# SPA fallback — serve index.html for all non-API/admin routes
# WhiteNoise serves the static assets, this catches client-side routes
if not settings.DEBUG:
    spa_index = os.path.join(settings.BASE_DIR, "staticfiles", "frontend", "index.html")

    def serve_spa(request):
        from django.http import FileResponse
        return FileResponse(open(spa_index, "rb"), content_type="text/html")

    urlpatterns += [re_path(r"^(?!api/|admin/|static/|media/).*$", serve_spa)]
