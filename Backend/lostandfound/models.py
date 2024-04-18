from django.db import models

from .models import Category, Address

class AtributesObject(models.Model):
    object = models.OneToOneField('Objeto', models.DO_NOTHING, primary_key=True)  # The composite primary key (object_id, category_attribute_id) found, that is not supported. The first column is selected.
    category_attribute = models.ForeignKey('CategoryAttribute', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'atributes_object'
        unique_together = (('object', 'category_attribute'),)


class CategoryAttribute(models.Model):
    attribute = models.CharField(max_length=255, blank=True, null=True)
    category = models.ForeignKey(Category, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'category_attribute'


class FoundObject(models.Model):
    date = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.IntegerField(blank=True, null=True)
    address = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    genero = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.IntegerField(blank=True, null=True)
    idfiscal = models.IntegerField(blank=True, null=True)
    idcivil = models.IntegerField(blank=True, null=True)
    phonenumber = models.IntegerField(blank=True, null=True)
    police = models.ForeignKey('UserPolice', models.DO_NOTHING, db_column='police', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'foundobject'


class GeneralUser(models.Model):
    firstname = models.CharField(max_length=255, blank=True, null=True)
    lastname = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.IntegerField(blank=True, null=True)
    status = models.BooleanField(blank=True, null=True)
    address = models.IntegerField(blank=True, null=True)
    idcivil = models.IntegerField(unique=True, blank=True, null=True)
    idfiscal = models.IntegerField(unique=True, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'generaluser'


class Leilao(models.Model):
    valor_base = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    data_inicio = models.DateField(blank=True, null=True)
    data_fim = models.DateField(blank=True, null=True)
    maior_licitacao = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    id_licitacao = models.ForeignKey('Licitacao', models.DO_NOTHING, db_column='id_licitacao', blank=True, null=True)
    objeto = models.ForeignKey('Objeto', models.DO_NOTHING, db_column='objeto', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'leilao'


class Licitacao(models.Model):
    valor_licitacao = models.DecimalField(max_digits=65535, decimal_places=65535, blank=True, null=True)
    data = models.DateField(blank=True, null=True)
    id_user = models.ForeignKey(GeneralUser, models.DO_NOTHING, db_column='id_user', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'licitacao'


class LostObject(models.Model):
    date = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.IntegerField(blank=True, null=True)
    address = models.IntegerField(blank=True, null=True)
    generaluser = models.ForeignKey(GeneralUser, models.DO_NOTHING, db_column='generaluser', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lostobject'


class Objeto(models.Model):
    date = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(Category, models.DO_NOTHING, db_column='category', blank=True, null=True)
    address = models.ForeignKey(Address, models.DO_NOTHING, db_column='address', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'objeto'


class UserPolice(models.Model):
    firstname = models.CharField(max_length=255, blank=True, null=True)
    lastname = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.IntegerField(blank=True, null=True)
    status = models.BooleanField(blank=True, null=True)
    address = models.IntegerField(blank=True, null=True)
    internalid = models.IntegerField(unique=True, blank=True, null=True)
    postopolice = models.CharField(max_length=255, blank=True, null=True)
    stationnumber = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'userpolice'
