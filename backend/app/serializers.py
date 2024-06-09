from rest_framework import serializers
from .models import Address, Category, CategoryAttribute, Objeto, AtributesObject, PolicePost, Users, Userpolice, Generaluser, Foundobject, Lostobject, Licitacao, Leilao, Subscription

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CategoryAtributesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryAttribute
        fields = '__all__'

class ObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objeto
        fields = '__all__'

class ObjectAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtributesObject
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Users
        fields = '__all__'

class UserPoliceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userpolice
        fields = '__all__'

class GeneralUserSerializer(serializers.ModelSerializer):
    #adress = AddressSerializer()
    class Meta:
        model = Generaluser
        fields = '__all__'

    #def update(self, instance, validated_data):
        #address_data = validated_data.pop('address', None)
        #if address_data:
            #address, created = Address.objects.get_or_create(**address_data)
            #instance.address = address
        #return super().update(instance, validated_data)

class FoundObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foundobject
        fields = '__all__'

class LostObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lostobject
        fields = '__all__'

class BidSerializer(serializers.ModelSerializer):
    class Meta:
        model = Licitacao
        fields = '__all__'

class AuctionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leilao
        fields = '__all__'

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'

class PolicePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicePost
        fields = '__all__'