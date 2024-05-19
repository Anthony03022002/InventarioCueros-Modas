from django.urls import path, include
from rest_framework import routers
from generarPagoAngel import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'generarPagoAngel', views.GenerarPagoAngelView, 'generarPagoAngel')

urlpatterns = [
    path('generarPagoAngel/', include(router.urls)),
]