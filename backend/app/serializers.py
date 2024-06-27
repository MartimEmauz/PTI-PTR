from rest_framework import serializers
from .models import (
    Address, AuthGroup, AuthGroupPermissions, AuthPermission, AuthUser,
    AuthUserGroups, AuthUserUserPermissions, Category, CategoryAttribute,
    DjangoAdminLog, DjangoContentType, DjangoMigrations, DjangoSession,
    Generaluser, Licitacao, Lostobject, Objeto, Leilao, AtributesObject,
    PolicePost, Userpolice, Foundobject, Subscription
)

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = '__all__'

class AuthGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthGroup
        fields = '__all__'

class AuthGroupPermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthGroupPermissions
        fields = '__all__'

class AuthPermissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthPermission
        fields = '__all__'

class AuthUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUser
        fields = '__all__'

class AuthUserGroupsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUserGroups
        fields = '__all__'

class AuthUserUserPermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuthUserUserPermissions
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CategoryAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryAttribute
        fields = '__all__'

class DjangoAdminLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = DjangoAdminLog
        fields = '__all__'

class DjangoContentTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = DjangoContentType
        fields = '__all__'

class DjangoMigrationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DjangoMigrations
        fields = '__all__'

class DjangoSessionSerializer(serializers.ModelSerializer):
    class Meta:
        model = DjangoSession
        fields = '__all__'

class GeneraluserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Generaluser
        fields = '__all__'

class LicitacaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Licitacao
        fields = '__all__'

class LostobjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lostobject
        fields = '__all__'

class ObjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objeto
        fields = '__all__'

class LeilaoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leilao
        fields = '__all__'

class AtributesObjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = AtributesObject
        fields = '__all__'

class PolicePostSerializer(serializers.ModelSerializer):
    class Meta:
        model = PolicePost
        fields = '__all__'

class UserpoliceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Userpolice
        fields = '__all__'

class FoundobjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Foundobject
        fields = '__all__'

class SubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscription
        fields = '__all__'
