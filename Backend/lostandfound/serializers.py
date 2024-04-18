from rest_framework import serializers
from .models import Address, AtributesObject, Category, CategoryAttribute, FoundObject, GeneralUser, Leilao, Licitacao, LostObject, Objeto, UserPolice


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'


class AtributesObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtributesObject
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'


class CategoryAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryAttribute
        fields = '__all__'


class FoundObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoundObject
        fields = '__all__'


class GeneralUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = GeneralUser
        fields = '__all__'


class LeilaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leilao
        fields = '__all__'


class LicitacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Licitacao
        fields = '__all__'


class LostObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = LostObject
        fields = '__all__'


class ObjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objeto
        fields = '__all__'


class UserPoliceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPolice
        fields = '__all__'
