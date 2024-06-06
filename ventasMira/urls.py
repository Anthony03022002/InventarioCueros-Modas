from django.urls import path, include
from rest_framework import routers
from ventasMira import views
from rest_framework.documentation import include_docs_urls

router = routers.DefaultRouter()
router.register(r'ventasMira', views.ventasMiraView, 'ventasMira')

urlpatterns = [
    path('ventasMira/', include(router.urls)),
]