from django.urls import path, include
from rest_framework import routers
from ventasOtavalo import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'ventasOtavalo', views.ventasOtavaloView, 'ventasOtavalo')

urlpatterns = [
    path('ventasOtavalo/', include(router.urls)),
]