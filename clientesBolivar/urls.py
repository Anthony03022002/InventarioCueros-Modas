from django.urls import path, include
from rest_framework import routers
from clientesBolivar import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'clientesBolivar', views.ClientesBolivarView, 'clientesBolivar')

urlpatterns = [
    path('clientesBolivar/', include(router.urls)),
]