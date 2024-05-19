from django.urls import path, include
from rest_framework import routers
from clientesMira import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'clientesMira', views.ClientesMiraView, 'clientesMira')

urlpatterns = [
    path('clientesMira/', include(router.urls)),
]