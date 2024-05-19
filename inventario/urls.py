from django.urls import path, include
from rest_framework import routers
from inventario import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'inventario', views.InventarioView, 'inventario')

urlpatterns = [
    path('inventario/', include(router.urls)),
]