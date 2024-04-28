from django.db import models
from .models import Address, Category, CategoryAtributes

class Object(models.Model):
    class Meta:
        app_label = 'app'
    date = models.DateField()
    description = models.CharField(max_length=255)
    local = models.OneToOneField(Address, on_delete=models.CASCADE)
    category = models.OneToOneField(Category, on_delete=models.CASCADE)
    atributes = models.ManyToManyField(CategoryAtributes)

class LostObject(Object):
    class Meta:
        app_label = 'app'
    pass

class FoundObject(Object):
    class Meta:
        app_label = 'app'
    name = models.CharField(max_length=100)
    email = models.EmailField()
    genero = models.CharField(max_length=20)
    birthday = models.DateField()
    idFiscal = models.IntegerField()
    idCivil = models.IntegerField()
    phoneNumber = models.IntegerField()