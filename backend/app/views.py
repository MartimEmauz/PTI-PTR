from rest_framework import generics
from .models import Lostobject, Foundobject, Generaluser, Userpolice, PolicePost,Leilao, Licitacao, Category, CategoryAttribute, Subscription, Address
from .serializers import (
    LostobjectSerializer, FoundobjectSerializer, GeneraluserSerializer,
    UserpoliceSerializer, PolicePostSerializer, LeilaoSerializer, LicitacaoSerializer,
    CategorySerializer, CategoryAttributeSerializer, SubscriptionSerializer,
    AddressSerializer
)
from utils.utils import find_similar_objects, compare_objects

from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated


#---------------------------------------------------------
#---------Contas e sessões de utilizadores----------------
#---------------------------------------------------------

class GeneralUserListCreateAPIView(generics.ListCreateAPIView):
    queryset = Generaluser.objects.all()
    serializer_class = GeneraluserSerializer
    permission_classes = [AllowAny]

class GeneralUserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Generaluser.objects.all()
    serializer_class = GeneraluserSerializer
    permission_classes = [AllowAny]

class GeneralUserRetrieveUpdateDestroyAPIView_Email(generics.RetrieveUpdateDestroyAPIView):
    queryset = Generaluser.objects.all()
    serializer_class = GeneraluserSerializer
    permission_classes = [AllowAny]
    lookup_field = 'email'

class UserPoliceListCreateAPIView(generics.ListCreateAPIView):
    queryset = Userpolice.objects.all()
    serializer_class = UserpoliceSerializer
    permission_classes = [AllowAny]

class UserPoliceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Userpolice.objects.all()
    serializer_class = UserpoliceSerializer
    permission_classes = [AllowAny]

class UserPoliceRetrieveUpdateDestroyAPIView_Email(generics.RetrieveUpdateDestroyAPIView):
    queryset = Userpolice.objects.all()
    serializer_class = UserpoliceSerializer
    permission_classes = [AllowAny]
    lookup_field = 'email'

class PolicePostListCreateAPIView(generics.ListCreateAPIView):
    queryset = PolicePost.objects.all()
    serializer_class = PolicePostSerializer
    permission_classes = [AllowAny]


class PolicePostRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PolicePost.objects.all()
    serializer_class = PolicePostSerializer
    permission_classes = [AllowAny]


#---------------------------------------------------------
#-----------Objectos perdidos e achados-------------------
#---------------------------------------------------------

class LostObjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Lostobject.objects.all()
    serializer_class = LostobjectSerializer
    permission_classes = [AllowAny]

class LostObjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lostobject.objects.all()
    serializer_class = LostobjectSerializer
    permission_classes = [AllowAny]

class LostObjectHistoryListAPIView(generics.ListAPIView):
    serializer_class = LostobjectSerializer
    permission_classes = [AllowAny]

    def get_queryset(self):
        user = self.request.user
        lost_objects = Lostobject.objects.filter(owner=user)
        return lost_objects

class SimilarLostObjectListAPIView(generics.ListAPIView): #REFAZER
    serializer_class = LostobjectSerializer

    def get_queryset(self):
        reported_lost_object = self.request.data.get('reported_lost_object')
        similar_lost_objects = find_similar_objects(reported_lost_object)
        return similar_lost_objects

class FoundObjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Foundobject.objects.all()
    serializer_class = FoundobjectSerializer
    permission_classes = [AllowAny]

class FoundObjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Foundobject.objects.all()
    serializer_class = FoundobjectSerializer

class LostObjectSearchAPIView(generics.ListAPIView):
    serializer_class = LostobjectSerializer

    def get_queryset(self):
        description = self.request.data.get('description')
        lost_objects = Lostobject.objects.filter(description__icontains=description)
        return lost_objects
    
class LostObjectSearchCategoryAPIView(generics.ListAPIView):
    serializer_class = LostobjectSerializer

    def get_queryset(self):
        category = self.request.data.get('category')
        lost_objects = Lostobject.objects.filter(category__name=category)
        return lost_objects

class LostObjectCompareAPIView(generics.RetrieveAPIView):
    serializer_class = LostobjectSerializer

    def get_queryset(self):
        lost_object = self.request.data.get('lost_object')
        found_object = self.request.data.get('found_object')
        compare_objects(lost_object, found_object)
        return lost_object

class FoundObjectHistoryListAPIView(generics.ListAPIView):
    serializer_class = FoundobjectSerializer

    def get_queryset(self):
        user = self.request.user
        found_objects = Foundobject.objects.filter(owner=user)
        return found_objects

class FoundObjectPossibleOwner(generics.RetrieveUpdateDestroyAPIView):
    queryset = Foundobject.objects.all()
    serializer_class = FoundobjectSerializer

class FoundObjectDelivered(generics.RetrieveUpdateDestroyAPIView):
    queryset = Foundobject.objects.all()
    serializer_class = FoundobjectSerializer

class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryAttributeListCreateAPIView(generics.ListCreateAPIView):
    queryset = CategoryAttribute.objects.all()
    serializer_class = CategoryAttributeSerializer

class CategoryAttributeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CategoryAttribute.objects.all()
    serializer_class = CategoryAttributeSerializer

#---------------------------------------------------------
#---------Leilões de objetos não reclamados---------------
#---------------------------------------------------------

class AuctionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Leilao.objects.all()
    serializer_class = LeilaoSerializer

class AuctionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Leilao.objects.all()
    serializer_class = LeilaoSerializer

class BidListCreateAPIView(generics.ListCreateAPIView):
    queryset = Licitacao.objects.all()
    serializer_class = LicitacaoSerializer

class BidRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Licitacao.objects.all()
    serializer_class = LicitacaoSerializer

class AuctionHistoryListAPIView(generics.ListAPIView):
    serializer_class = LeilaoSerializer

    def get_queryset(self):
        user = self.request.user
        auctions = Leilao.objects.filter(owner=user)
        return auctions

class AuctionBoughtListAPIView(generics.ListAPIView):
    serializer_class = LeilaoSerializer

    def get_queryset(self):
        user = self.request.user
        auctions = Leilao.objects.filter(buyer=user)
        return auctions

class AuctionBidListAPIView(generics.ListAPIView):
    serializer_class = LicitacaoSerializer

    def get_queryset(self):
        auction = self.request.data.get('auction')
        bids = Licitacao.objects.filter(auction=auction)
        return bids

class SubscriptionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

class SubscriptionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

#---------------------------------------------------------
#---------------------Outras precisas---------------------
#---------------------------------------------------------

class AddressViewSet(viewsets.ModelViewSet):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

class AddressListCreateAPIView(generics.ListCreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [AllowAny]

class AddressRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer
    permission_classes = [AllowAny]

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(data={"message": "Hello, you are authenticated!"}, status=200)
