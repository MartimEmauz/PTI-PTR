from rest_framework import generics
from rest_framework.response import Response
from .models import Address, Category, CategoryAtributes, Bid, Auction, Subscription
from .users_models import UserPolice, GeneralUser
from .object_models import LostObject, FoundObject
from .serializers import CategorySerializer, CategoryAtributesSerializer, BidSerializer, AuctionSerializer, SubscriptionSerializer, LostObjectSerializer, FoundObjectSerializer, UserPoliceSerializer, GeneralUserSerializer
from utils.utils import find_similar_objects

class LostObjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = LostObject.objects.all()
    serializer_class = LostObjectSerializer

class LostObjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = LostObject.objects.all()
    serializer_class = LostObjectSerializer

class SimilarFoundObjectListAPIView(generics.ListAPIView):
    serializer_class = FoundObjectSerializer

    def get_queryset(self):
        # Receba o objeto perdido relatado pelo usuário (por exemplo, por meio de uma solicitação POST)
        reported_lost_object = self.request.data.get('reported_lost_object')

        # Chamar a função para encontrar objetos encontrados similares
        similar_found_objects = find_similar_objects(reported_lost_object)

        return similar_found_objects


class FoundObjectListCreateAPIView(generics.ListCreateAPIView):
    queryset = FoundObject.objects.all()
    serializer_class = FoundObjectSerializer

class FoundObjectRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FoundObject.objects.all()
    serializer_class = FoundObjectSerializer

class GeneralUserListCreateAPIView(generics.ListCreateAPIView):
    queryset = GeneralUser.objects.all()
    serializer_class = GeneralUserSerializer

class GeneralUserRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = GeneralUser.objects.all()
    serializer_class = GeneralUserSerializer

class UserPoliceListCreateAPIView(generics.ListCreateAPIView):
    queryset = UserPolice.objects.all()
    serializer_class = UserPoliceSerializer

class UserPoliceRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserPolice.objects.all()
    serializer_class = UserPoliceSerializer

class AuctionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer

class AuctionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Auction.objects.all()
    serializer_class = AuctionSerializer

class BidListCreateAPIView(generics.ListCreateAPIView):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer

class BidRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bid.objects.all()
    serializer_class = BidSerializer

class CategoryListCreateAPIView(generics.ListCreateAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class CategoryAtributesListCreateAPIView(generics.ListCreateAPIView):
    queryset = CategoryAtributes.objects.all()
    serializer_class = CategoryAtributesSerializer

class CategoryAtributesRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = CategoryAtributes.objects.all()
    serializer_class = CategoryAtributesSerializer

class SubscriptionListCreateAPIView(generics.ListCreateAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer

class SubscriptionRetrieveUpdateDestroyAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Subscription.objects.all()
    serializer_class = SubscriptionSerializer
