from django.urls import path, include
from rest_framework import routers
from clientesAngel import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'clientesAngel', views.ClientesAngelView, 'clientesAngel')

urlpatterns = [
    path('clientesAngel/', include(router.urls)),
    path('docs/', include_docs_urls(title= 'Inventario Api')),
]