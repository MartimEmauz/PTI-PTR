from django.db import models
from .models import Address

class User(models.Model):
    class Meta:
        app_label = 'app'
    firstName = models.CharField(max_length=100)
    lastName = models.CharField(max_length=100)
    genero = models.CharField(max_length=20)
    email = models.EmailField()
    password = models.CharField(max_length=100)
    birthday = models.DateField()
    address = models.OneToOneField(Address, on_delete=models.CASCADE)
    status = models.CharField(max_length=10)

class UserPolice(models.Model):
    class Meta:
        app_label = 'app'
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    internalId = models.IntegerField()
    postoPolicia = models.CharField(max_length=100)
    stationPhone = models.IntegerField()

class GeneralUser(models.Model):
    class Meta:
        app_label = 'app'
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    idFiscal = models.IntegerField()
    idCivil = models.IntegerField()