from django.urls import path, include
from rest_framework import routers
from generarPagoAtuntaqui import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'generarPagoAtuntaqui', views.GenerarPagoAtuntaquiView, 'generarPagoAtuntaqui')

urlpatterns = [
    path('generarPagoAtuntaqui/', include(router.urls)),
]