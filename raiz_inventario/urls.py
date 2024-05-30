"""
URL configuration for raiz_inventario project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('clientesAngel.urls')),
     path('', include('clientesAtuntaqui.urls')),
    path('', include('clientesBolivar.urls')),
    path('', include('clientesCayambe.urls')),
    path('', include('clientesIbarra.urls')),
    path('', include('clientesLagoagrio.urls')),
    path('', include('clientesOtavalo.urls')),
    path('', include('clientesMira.urls')),
    path('', include('clientesPimampiro.urls')),
    path('', include('generarPagoAngel.urls')),
    path('', include('generarPagoAtuntaqui.urls')),
    path('', include('generarPagoBolivar.urls')),
    path('', include('generarPagoCayambe.urls')),
    path('', include('generarPagoIbarra.urls')),
    path('', include('generarPagoLagoagrio.urls')),
    path('', include('generarPagoOtavalo.urls')),
    path('', include('generarPagoMira.urls')),
    path('', include('generarPagoPimampiro.urls')),
    path('', include('factura.urls')),
    path('', include('inventario.urls')),
    path('', include('devoluciones.urls')),
    path('', include('productoClienteAngel.urls')),
    path('', include('stockHistoria.urls')),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)