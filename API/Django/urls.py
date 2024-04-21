from django.urls import path, include
from . import views

urlpatterns = [
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('objects/', views.ObjectList.as_view(), name='object-list'),
    path('objects/<int:pk>/', views.ObjectDetail.as_view(), name='object-detail'),
    path('lostobjects/', views.LostObjectList.as_view(), name='lost-object-list'),
    path('lostobjects/<int:pk>/', views.LostObjectDetail.as_view(), name='lost-object-detail'),
    path('foundobjects/', views.FoundObjectList.as_view(), name='found-object-list'),
    path('foundobjects/<int:pk>/', views.FoundObjectDetail.as_view(), name='found-object-detail'),
    path('addresses/', views.AddressList.as_view(), name='address-list'),
    path('addresses/<int:pk>/', views.AddressDetail.as_view(), name='address-detail'),
    path('categories/', views.CategoryList.as_view(), name='category-list'),
    path('categories/<int:pk>/', views.CategoryDetail.as_view(), name='category-detail'),
    path('categoryatributes/', views.CategoryAtributesList.as_view(), name='category-atributes-list'),
    path('categoryatributes/<int:pk>/', views.CategoryAtributesDetail.as_view(), name='category-atributes-detail'),
    path('bids/', views.BidList.as_view(), name='bid-list'),
    path('bids/<int:pk>/', views.BidDetail.as_view(), name='bid-detail'),
    path('auctions/', views.AuctionList.as_view(), name='auction-list'),
    path('auctions/<int:pk>/', views.AuctionDetail.as_view(), name='auction-detail'),
    path('subscriptions/', views.SubscriptionList.as_view(), name='subscription-list'),
    path('subscriptions/<int:pk>/', views.SubscriptionDetail.as_view(), name='subscription-detail'),
    path('apiresponses/', views.ApiResponseList.as_view(), name='api-response-list'),
    path('apiresponses/<int:pk>/', views.ApiResponseDetail.as_view(), name='api-response-detail'),
]
