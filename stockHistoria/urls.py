from django.urls import path, include
from rest_framework import routers
from stockHistoria import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'stockHistoria', views.stockHistoriaView, 'stockHistoria')

urlpatterns = [
    path('stockHistoria/', include(router.urls)),
]