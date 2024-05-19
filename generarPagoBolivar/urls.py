from django.urls import path, include
from rest_framework import routers
from generarPagoBolivar import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'generarPagoBolivar', views.GenerarPagoBolivarView, 'generarPagoBolivar')

urlpatterns = [
    path('generarPagoBolivar/', include(router.urls)),
]