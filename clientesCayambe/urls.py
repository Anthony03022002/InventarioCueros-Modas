from django.urls import path, include
from rest_framework import routers
from clientesCayambe import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'clientesCayambe', views.ClientesCayambeView, 'clientesCayambe')

urlpatterns = [
    path('clientesCayambe/', include(router.urls)),
]