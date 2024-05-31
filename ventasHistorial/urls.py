from django.urls import path, include
from rest_framework import routers
from ventasHistorial import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'ventasHistorial', views.ventasHistorialView, 'ventasHistorial')

urlpatterns = [
    path('ventasHistorial/', include(router.urls)),
]