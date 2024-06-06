from django.urls import path, include
from rest_framework import routers
from ventasAtuntaqui import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'ventasAtuntaqui', views.ventasAtuntaquiView, 'ventasAtuntaqui')

urlpatterns = [
    path('ventasAtuntaqui/', include(router.urls)),
]