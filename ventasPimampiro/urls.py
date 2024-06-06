from django.urls import path, include
from rest_framework import routers
from ventasPimampiro import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'ventasPimampiro', views.ventasPimampiroView, 'ventasPimampiro')

urlpatterns = [
    path('ventasPimampiro/', include(router.urls)),
]