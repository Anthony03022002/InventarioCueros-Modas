from django.urls import path, include
from rest_framework import routers
from ventasIbarra import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'ventasIbarra', views.ventasIbarraView, 'ventasIbarra')

urlpatterns = [
    path('ventasIbarra/', include(router.urls)),
]