from django.urls import path, include
from rest_framework import routers
from clientesLagoagrio import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'clientesLagoagrio', views.ClientesLagoagrioView, 'clientesLagoagrio')

urlpatterns = [
    path('clientesLagoagrio/', include(router.urls)),
]