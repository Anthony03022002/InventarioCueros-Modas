from django.urls import path, include
from rest_framework import routers
from clientesAtuntaqui import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'clientesAtuntaqui', views.ClientesAtuntaquiView, 'clientesAtuntaqui')

urlpatterns = [
    path('clientesAtuntaqui/', include(router.urls)),
]