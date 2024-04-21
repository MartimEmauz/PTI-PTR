from django.urls import path, include

urlpatterns = [
    path('api/Django/', include('api.Django.urls')),
]