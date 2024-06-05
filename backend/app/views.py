from rest_framework import generics
from .models import Lostobject, Foundobject, Generaluser, Userpolice, PolicePost,Leilao, Licitacao, Category, CategoryAttribute, Subscription, Address
from .serializers import LostObjectSerializer, FoundObjectSerializer, GeneralUserSerializer, UserPoliceSerializer, PolicePostSerializer,AuctionSerializer, BidSerializer, CategorySerializer, CategoryAtributesSerializer, SubscriptionSerializer, AddressSerializer
from utils.utils import find_similar_objects

from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny




class LostObjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Lostobject.objects.all()
    serializer_class = LostObjectSerializer
    permission_classes = [AllowAny]

class LostObjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Lostobject.objects.all()
    serializer_class = LostObjectSerializer
    

class SimilarLostObjectListAPIView(generics.ListAPIView):
    serializer_class = LostObjectSerializer

    def get_queryset(self):
        reported_lost_object = self.request.data.get('reported_lost_object')
        similar_lost_objects = find_similar_objects(reported_lost_object)
        return similar_lost_objects

class FoundObjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Foundobject.objects.all()
    serializer_class = FoundObjectSerializer
    permission_classes = [AllowAny]

class FoundObjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Foundobject.objects.all()
    serializer_class = FoundObjectSerializer

class GeneralUserListCreateAPIView(generics.ListCreateAPIView):
    queryset = Generaluser.objects.all()
    serializer_class = GeneralUserSerializer
    permission_classes = [AllowAny]

class GeneralUserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Generaluser.objects.all()
    serializer_class = GeneralUserSerializer

class UserPoliceListCreateAPIView(generics.ListCreateAPIView):
    queryset = Userpolice.objects.all()
    serializer_class = UserPoliceSerializer

class UserPoliceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Userpolice.objects.all()
    serializer_class = UserPoliceSerializer

class AuctionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Leilao.objects.all()
    serializer_class = AuctionSerializer

class AuctionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Leilao.objects.all()
    serializer_class = AuctionSerializer

class BidListCreateAPIView(generics.ListCreateAPIView):
    queryset = Licitacao.objects.all()
    serializer_class = BidSerializer

class BidRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Licitacao.objects.all()
    serializer_class = BidSerializer

class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryAttributeListCreateAPIView(generics.ListCreateAPIView):
    queryset = CategoryAttribute.objects.all()
    serializer_class = CategoryAtributesSerializer

class CategoryAttributeRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CategoryAttribute.objects.all()
    serializer_class = CategoryAtributesSerializer

class SubscriptionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

class SubscriptionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

class AdressListCreateAPIView(generics.ListCreateAPIView):
    queryset = Address.objects.all()
    serializer_class = AddressSerializer

class PolicePostListCreateAPIView(generics.ListCreateAPIView):
    queryset = PolicePost.objects.all()
    serializer_class = PolicePostSerializer

class PolicePostRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = PolicePost.objects.all()
    serializer_class = PolicePostSerializer

class ProtectedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response(data={"message": "Hello, you are authenticated!"}, status=200)