from django.urls import path
from app import views

urlpatterns = [
    # Lost Objects URLs
    path('lost-objects/', views.LostObjectListCreateAPIView.as_view(), name='lostobject-list-create'),
    path('lost-objects/<int:pk>/', views.LostObjectRetrieveUpdateDestroyAPIView.as_view(), name='lostobject-retrieve-update-destroy'),
    
    # Found Objects URLs
    path('found-objects/', views.FoundObjectListCreateAPIView.as_view(), name='foundobject-list-create'),
    path('found-objects/<int:pk>/', views.FoundObjectRetrieveUpdateDestroyAPIView.as_view(), name='foundobject-retrieve-update-destroy'),
    
    # General Users URLs
    path('general-users/', views.GeneralUserListCreateAPIView.as_view(), name='generaluser-list-create'),
    path('general-users/<int:pk>/', views.GeneralUserRetrieveUpdateDestroyAPIView.as_view(), name='generaluser-retrieve-update-destroy'),
    
    # User Police URLs
    path('user-polices/', views.UserPoliceListCreateAPIView.as_view(), name='userpolice-list-create'),
    path('user-polices/<int:pk>/', views.UserPoliceRetrieveUpdateDestroyAPIView.as_view(), name='userpolice-retrieve-update-destroy'),
    
    # Auction URLs
    path('auctions/', views.AuctionListCreateAPIView.as_view(), name='auction-list-create'),
    path('auctions/<int:pk>/', views.AuctionRetrieveUpdateDestroyAPIView.as_view(), name='auction-retrieve-update-destroy'),
    
    # Bid URLs
    path('bids/', views.BidListCreateAPIView.as_view(), name='bid-list-create'),
    path('bids/<int:pk>/', views.BidRetrieveUpdateDestroyAPIView.as_view(), name='bid-retrieve-update-destroy'),
    
    # Category URLs
    path('categories/', views.CategoryListCreateAPIView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', views.CategoryRetrieveUpdateDestroyAPIView.as_view(), name='category-retrieve-update-destroy'),
    
    # Category Attributes URLs
    path('category-attributes/', views.CategoryAtributesListCreateAPIView.as_view(), name='categoryattributes-list-create'),
    path('category-attributes/<int:pk>/', views.CategoryAtributesRetrieveUpdateDestroyAPIView.as_view(), name='categoryattributes-retrieve-update-destroy'),
    
    # Subscription URLs
    path('subscriptions/', views.SubscriptionListCreateAPIView.as_view(), name='subscription-list-create'),
    path('subscriptions/<int:pk>/', views.SubscriptionRetrieveUpdateDestroyAPIView.as_view(), name='subscription-retrieve-update-destroy'),
    
    # Similar Found Objects URL
    path('similar-found-objects/', views.SimilarFoundObjectListAPIView.as_view(), name='similarfoundobject-list'),
]
