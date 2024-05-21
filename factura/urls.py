from django.urls import path, include
from rest_framework import routers
from factura import views
from rest_framework.documentation import include_docs_urls


router = routers.DefaultRouter()
router.register(r'factura', views.FacturaView, 'factura')

urlpatterns = [
    path('factura/', include(router.urls)),
]
