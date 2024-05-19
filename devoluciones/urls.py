from django.urls import path, include
from rest_framework import routers
from devoluciones import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'devoluciones', views.DevolucionesView, 'devoluciones')

urlpatterns = [
    path('devoluciones/', include(router.urls)),
]