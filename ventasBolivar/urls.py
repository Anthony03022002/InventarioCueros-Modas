from django.urls import path, include
from rest_framework import routers
from ventasBolivar import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'ventasBolivar', views.ventasBolivarView, 'ventasBolivar')

urlpatterns = [
    path('ventasBolivar/', include(router.urls)),
]