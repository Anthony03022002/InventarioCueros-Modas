from django.urls import path, include
from rest_framework import routers
from generarPagoIbarra import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'generarPagoIbarra', views.GenerarPagoIbarraView, 'generarPagoIbarra')

urlpatterns = [
    path('generarPagoIbarra/', include(router.urls)),
]