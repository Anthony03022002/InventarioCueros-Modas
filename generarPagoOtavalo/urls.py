from django.urls import path, include
from rest_framework import routers
from generarPagoOtavalo import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'generarPagoOtavalo', views.GenerarPagoOtavaloView, 'generarPagoOtavalo')

urlpatterns = [
    path('generarPagoOtavalo/', include(router.urls)),
]