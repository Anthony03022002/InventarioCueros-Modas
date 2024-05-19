from django.urls import path, include
from rest_framework import routers
from generarPagoCayambe import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'generarPagoCayambe', views.GenerarPagoCayambeView, 'generarPagoCayambe')

urlpatterns = [
    path('generarPagoCayambe/', include(router.urls)),
]