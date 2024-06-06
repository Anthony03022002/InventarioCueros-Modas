from django.urls import path, include
from rest_framework import routers
from ventasLagoagrio import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'ventasLagoagrio', views.ventasLagoagrioView, 'ventasLagoagrio')

urlpatterns = [
    path('ventasLagoagrio/', include(router.urls)),
]