from django.urls import path, include
from rest_framework import routers
from clientesIbarra import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'clientesIbarra', views.ClientesIbarraView, 'clientesIbarra')

urlpatterns = [
    path('clientesIbarra/', include(router.urls)),
]