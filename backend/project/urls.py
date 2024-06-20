from django.urls import path # type: ignore
from app import views
from app.views import ProtectedView
from rest_framework.routers import DefaultRouter



urlpatterns = [

    # Root URL

    #---------------------------------------------------------
    #---------Contas e sessões de utilizadores----------------
    #---------------------------------------------------------

    # PolicePosts URLs
    path('policeposts/', views.PolicePostListCreateAPIView.as_view(), name='policepost-list-create'),
    path('policeposts/<int:pk>/', views.PolicePostRetrieveUpdateDestroyAPIView.as_view(), name='policepost-retrieve-update-destroy'),
    
    # General Users URLs
    path('generalusers/', views.GeneralUserListCreateAPIView.as_view(), name='generaluser-list-create'),
    path('generalusers/<int:pk>/', views.GeneralUserRetrieveUpdateDestroyAPIView.as_view(), name='generaluser-retrieve-update-destroy'),
    path('generalusers/<str:email>/', views.GeneralUserRetrieveUpdateDestroyAPIView_Email.as_view(), name='generaluser-retrieve-update-destroy-email'),
    
    # User Police URLs
    path('policeusers/', views.UserPoliceListCreateAPIView.as_view(), name='userpolice-list-create'),
    path('policeusers/<int:pk>/', views.UserPoliceRetrieveUpdateDestroyAPIView.as_view(), name='userpolice-retrieve-update-destroy'),
    path('policeusers/<int:email>/', views.UserPoliceRetrieveUpdateDestroyAPIView_Email.as_view(), name='userpolice-retrieve-update-destroy-email'),

    # Auth0 URLs
    path('protected/', ProtectedView.as_view(), name='protected'),

    #---------------------------------------------------------
    #-----------Objectos perdidos e achados-------------------
    #---------------------------------------------------------
    
    # Lost Objects URLs
    path('lostobjects/', views.LostObjectListCreateAPIView.as_view(), name='lostobject-list-create'),
    path('lostobjects/<int:pk>/', views.LostObjectRetrieveUpdateDestroyAPIView.as_view(), name='lostobject-retrieve-update-destroy'),
    path('lostobjects/history/<int:pk>', views.LostObjectHistoryListAPIView.as_view(), name='lostobject-history-list'),
    #  Pesquisar objetos perdidos pela descrição. 
    path('lostobjects/search/', views.LostObjectSearchAPIView.as_view(), name='lostobject-search'),
    #  Pesquisar objetos perdidos pelos campos específicos de categorias.
    path('lostobjects/search/category/', views.LostObjectSearchCategoryAPIView.as_view(), name='lostobject-search-category'), 
    # Comparar um objeto perdido com um achado, revelando as diferenças.
    path('lostobjects/compare/<int:pk>/', views.LostObjectCompareAPIView.as_view(), name='lostobject-compare'),
    # Registar, editar, e remover possível dono de objeto achado. Altera um atributo do objeto achado.
    path('lostobjects/owner/<int:pk>/', views.FoundObjectPossibleOwner.as_view(), name='foundobject-possible'),
    # Registar entrega de objeto achado ao dono.
    path('lostobjects/delivered/<int:pk>/', views.FoundObjectDelivered.as_view(), name='foundobject-delivered'),
    path('lostobjects/similar/<int:pk>/', views.SimilarLostObjectListAPIView.as_view(), name='lostobject-similar-list'),
        
    # Found Objects URLs
    path('foundobjects/', views.FoundObjectListCreateAPIView.as_view(), name='foundobject-list-create'),
    path('foundobjects/<int:pk>/', views.FoundObjectRetrieveUpdateDestroyAPIView.as_view(), name='foundobject-retrieve-update-destroy'),
    path('foundobjects/history/<int:pk>', views.FoundObjectHistoryListAPIView.as_view(), name='foundobject-history-list'),

    # Category URLs
    path('categories/', views.CategoryListCreateAPIView.as_view(), name='category-list-create'),
    path('categories/<int:pk>/', views.CategoryRetrieveUpdateDestroyAPIView.as_view(), name='category-retrieve-update-destroy'),
    
    # Category Attributes URLs
    path('categoryattributes/', views.CategoryAttributeListCreateAPIView.as_view(), name='categoryattribute-list-create'),
    path('categoryattributes/<int:pk>/', views.CategoryAttributeRetrieveUpdateDestroyAPIView.as_view(), name='categoryattribute-retrieve-update-destroy'),

    #---------------------------------------------------------
    #---------Leilões de objetos não reclamados---------------
    #---------------------------------------------------------

    # Auction URLs
    path('auctions/', views.AuctionListCreateAPIView.as_view(), name='auction-list-create'),
    path('auctions/<int:pk>/', views.AuctionRetrieveUpdateDestroyAPIView.as_view(), name='auction-retrieve-update-destroy'),

    #  Ver leilões passados, ativos, e futuros. 
    path('auctions/history/', views.AuctionHistoryListAPIView.as_view(), name='auction-history-list'),
    # Ver leilões comprados por um utilizador.
    path('auctions/bought/<int:pk>/', views.AuctionBoughtListAPIView.as_view(), name='auction-bought-list'),
    # Ver historico de licitações de um objeto.
    path('auctions/bids/<int:pk>/', views.AuctionBidListAPIView.as_view(), name='auction-bid-list'),
    
    # Bid URLs
    path('bids/', views.BidListCreateAPIView.as_view(), name='bid-list-create'),
    path('bids/<int:pk>/', views.BidRetrieveUpdateDestroyAPIView.as_view(), name='bid-retrieve-update-destroy'),

    # Subscriptions URLs
    path('subscriptions/', views.SubscriptionListCreateAPIView.as_view(), name='subscription-list-create'),
    path('subscriptions/<int:pk>/', views.SubscriptionRetrieveUpdateDestroyAPIView.as_view(), name='subscription-retrieve-update-destroy'),
    
    # PolicePosts URLs
    path('policeposts/', views.PolicePostListCreateAPIView.as_view(), name='policepost-list-create'),
    path('policeposts/<int:pk>/', views.PolicePostRetrieveUpdateDestroyAPIView.as_view(), name='policepost-retrieve-update-destroy'),

     # Address URLs
    path('addresses/', views.AddressListCreateAPIView.as_view(), name='address-list-create'),
    path('addresses/<int:pk>/', views.AddressRetrieveUpdateDestroyAPIView.as_view(), name='address-retrieve-update-destroy'),
    
]
