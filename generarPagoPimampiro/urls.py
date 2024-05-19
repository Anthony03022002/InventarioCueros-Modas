from django.urls import path, include
from rest_framework import routers
from generarPagoPimampiro import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'generarPagoPimampiro', views.GenerarPagoPimampiroView, 'generarPagoPimampiro')

urlpatterns = [
    path('generarPagoPimampiro/', include(router.urls)),
]