from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt import views as jwt_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include('app1.api.apiurls')),
    path('api/refresh-token/', 
          jwt_views.TokenRefreshView.as_view(), 
          name ='token_refresh')
]
