from rest_framework import generics
from .models import Lostobject, Foundobject, Generaluser, Userpolice, Leilao, Licitacao, Category, CategoryAttribute, AtributesObject
from .serializers import LostObjectSerializer, FoundObjectSerializer, GeneralUserSerializer, UserPoliceSerializer, AuctionSerializer, BidSerializer, CategorySerializer, CategoryAtributesSerializer, SubscriptionSerializer
from utils.utils import find_similar_objects

class LostObjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = Lostobject.objects.all()
    serializer_class = LostObjectSerializer

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

class FoundObjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Foundobject.objects.all()
    serializer_class = FoundObjectSerializer

class GeneralUserListCreateAPIView(generics.ListCreateAPIView):
    queryset = Generaluser.objects.all()
    serializer_class = GeneralUserSerializer

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


