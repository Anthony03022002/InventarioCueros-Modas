from django.urls import path, include
from rest_framework import routers
from ventasCayambe import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'ventasCayambe', views.ventasCayambeView, 'ventasCayambe')

urlpatterns = [
    path('ventasCayambe/', include(router.urls)),
]