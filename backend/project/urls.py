from django.urls import path
from app import views
from django.urls import path
from app.views import ProtectedView

urlpatterns = [

    # Root URL
    

    # Lost Objects URLs
    path('lostobjects/', views.LostObjectListCreateAPIView.as_view(), name='lostobject-list-create'),
    path('lostobjects/<int:pk>/', views.LostObjectRetrieveUpdateDestroyAPIView.as_view(), name='lostobject-retrieve-update-destroy'),
    path('lostobjects/similar/<int:pk>/', views.SimilarLostObjectListAPIView.as_view(), name='lostobject-similar-list'),
    
    # Found Objects URLs
    path('foundobjects/', views.FoundObjectListCreateAPIView.as_view(), name='foundobject-list-create'),
    path('foundobjects/<int:pk>/', views.FoundObjectRetrieveUpdateDestroyAPIView.as_view(), name='foundobject-retrieve-update-destroy'),
    
    # General Users URLs
    path('generalusers/', views.GeneralUserListCreateAPIView.as_view(), name='generaluser-list-create'),
    path('generalusers/<int:pk>/', views.GeneralUserRetrieveUpdateDestroyAPIView.as_view(), name='generaluser-retrieve-update-destroy'),
    path('generalusers/<str:email>/', views.GeneralUserRetrieveUpdateDestroyAPIView_Email.as_view(), name='generaluser-retrieve-update-destroy-email'),

    
    # User Police URLs
    path('policeusers/', views.UserPoliceListCreateAPIView.as_view(), name='userpolice-list-create'),
    path('policeusers/<int:pk>/', views.UserPoliceRetrieveUpdateDestroyAPIView.as_view(), name='userpolice-retrieve-update-destroy'),
    
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
    path('categoryattributes/', views.CategoryAttributeListCreateAPIView.as_view(), name='categoryattribute-list-create'),
    path('categoryattributes/<int:pk>/', views.CategoryAttributeRetrieveUpdateDestroyAPIView.as_view(), name='categoryattribute-retrieve-update-destroy'),

    # Subscriptions URLs
    path('subscriptions/', views.SubscriptionListCreateAPIView.as_view(), name='subscription-list-create'),
    path('subscriptions/<int:pk>/', views.SubscriptionRetrieveUpdateDestroyAPIView.as_view(), name='subscription-retrieve-update-destroy'),
    
    # PolicePosts URLs
    path('policeposts/', views.PolicePostListCreateAPIView.as_view(), name='policepost-list-create'),
    path('policeposts/<int:pk>/', views.PolicePostRetrieveUpdateDestroyAPIView.as_view(), name='policepost-retrieve-update-destroy'),

    # Auth0 URLs
    path('protected/', ProtectedView.as_view(), name='protected')
    
]
