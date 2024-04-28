from rest_framework import serializers
from .models import Address, Category, CategoryAtributes, Bid, Auction, Subscription, ApiResponse
from .users_models import User, UserPolice, GeneralUser
from .object_models import LostObject, FoundObject

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['id', 'street', 'country', 'city', 'zip_code', 'longitude', 'latitude', 'radius']

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name']

class CategoryAtributesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryAtributes
        fields = ['id', 'category', 'atribute']

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bid
        fields = ['id', 'bid_value']

class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Auction
        fields = ['id', 'min_bid', 'start_date', 'end_date', 'biggest_bid']

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = ['id', 'userId', 'planId', 'startDate', 'endDate', 'status']

class ApiResponseSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApiResponse
        fields = ['id', 'code', 'type', 'message']

class LostObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = LostObject
        fields = ['id', 'date', 'description', 'local', 'category', 'atributes']

class FoundObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoundObject
        fields = ['id', 'date', 'description', 'local', 'category', 'atributes', 'name', 'email', 'genero', 'birthday', 'idFiscal', 'idCivil', 'phoneNumber']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'firstName', 'lastName', 'genero', 'email', 'password', 'birthday', 'address', 'status']

class UserPoliceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPolice
        fields = ['id', 'user', 'internalId', 'postoPolicia', 'stationPhone']

class GeneralUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralUser
        fields = ['id', 'user', 'idFiscal', 'idCivil']

