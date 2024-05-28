from django.urls import path, include
from rest_framework import routers
from productoClienteAngel import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'productoClienteAngel', views.ProductoClienteAngelView, 'productoClienteAngel')

urlpatterns = [
    path('productoClienteAngel/', include(router.urls)),
]