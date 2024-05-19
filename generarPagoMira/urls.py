from django.urls import path, include
from rest_framework import routers
from generarPagoMira import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'generarPagoMira', views.GenerarPagoMiraView, 'generarPagoMira')

urlpatterns = [
    path('generarPagoMira/', include(router.urls)),
]