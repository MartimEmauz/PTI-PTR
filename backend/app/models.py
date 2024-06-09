# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
#from django.contrib.gis.db.models import models


class Address(models.Model):
    id = models.AutoField(primary_key=True)
    street = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    zip = models.CharField(max_length=20, blank=True, null=True)
    #location = models.PointField(geography=True, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    radius = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'address'
        app_label = 'app'


class AtributesObject(models.Model):
    object = models.OneToOneField('Objeto', models.DO_NOTHING, primary_key=True)  # The composite primary key (object_id, category_attribute_id) found, that is not supported. The first column is selected.
    category_attribute = models.ForeignKey('CategoryAttribute', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'atributes_object'
        unique_together = (('object', 'category_attribute'),)
        app_label = 'app'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'
        app_label = 'app'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)
        app_label = 'app'


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)
        app_label = 'app'


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'
        app_label = 'app'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)
        app_label = 'app'


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)
        app_label = 'app'


class Category(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'category'
        app_label = 'app'


class CategoryAttribute(models.Model):
    attribute = models.CharField(max_length=255, blank=True, null=True)
    category = models.ForeignKey(Category, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'category_attribute'
        app_label = 'app'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'
        app_label = 'app'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)
        app_label = 'app'


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'
        app_label = 'app'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'
        app_label = 'app'


class Foundobject(models.Model):
    id = models.AutoField(primary_key=True)
    date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.IntegerField(blank=True, null=True)
    address = models.IntegerField(blank=True, null=True)
    name = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    genero = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    idfiscal = models.IntegerField(blank=True, null=True)
    idcivil = models.IntegerField(blank=True, null=True)
    phonenumber = models.IntegerField(blank=True, null=True)
    police = models.ForeignKey('Userpolice', models.DO_NOTHING, db_column='id', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'foundobject'
        app_label = 'app'


class Generaluser(models.Model):
    id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=255, blank=True, null=True)
    lastname = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    status = models.BooleanField(blank=True, null=True)
    address = models.IntegerField(blank=True, null=True)
    #address = models.ForeignKey(Address, on_delete=models.SET_NULL, null=True)
    idcivil = models.IntegerField(unique=True, blank=True, null=True)
    idfiscal = models.IntegerField(unique=True, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'generaluser'
        app_label = 'app'


class Leilao(models.Model):
    id = models.AutoField(primary_key=True)
    valor_base = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    data_inicio = models.DateField(blank=True, null=True)
    data_fim = models.DateField(blank=True, null=True)
    maior_licitacao = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    id_licitacao = models.ForeignKey('Licitacao', models.DO_NOTHING, db_column='id_licitacao', blank=True, null=True)
    objeto = models.ForeignKey('Objeto', models.DO_NOTHING, db_column='objeto', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'leilao'
        app_label = 'app'


class Licitacao(models.Model):
    id = models.AutoField(primary_key=True)
    valor_licitacao = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    data = models.DateField(blank=True, null=True)
    id_user = models.ForeignKey(Generaluser, models.DO_NOTHING, to_field='id', db_column='id_user', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'licitacao'
        app_label = 'app'


class Lostobject(models.Model):
    id = models.AutoField(primary_key=True)
    #date = models.DateField(blank=True, null=True)
    date = models.TextField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.IntegerField(blank=True, null=True)
    address = models.IntegerField(blank=True, null=True)
    generaluser = models.ForeignKey(Generaluser, models.DO_NOTHING, db_column='generaluser', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lostobject'
        app_label = 'app'


class Objeto(models.Model):
    date = models.DateField(blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    category = models.ForeignKey(Category, models.DO_NOTHING, db_column='category', blank=True, null=True)
    address = models.ForeignKey(Address, models.DO_NOTHING, db_column='address', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'objeto'
        app_label = 'app'


class SpatialRefSys(models.Model):
    srid = models.IntegerField(primary_key=True)
    auth_name = models.CharField(max_length=256, blank=True, null=True)
    auth_srid = models.IntegerField(blank=True, null=True)
    srtext = models.CharField(max_length=2048, blank=True, null=True)
    proj4text = models.CharField(max_length=2048, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spatial_ref_sys'
        app_label = 'app'


class PolicePost(models.Model):
    id = models.AutoField(primary_key=True)
    #location = models.PointField(geography=True, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    stationnumber = models.IntegerField(max_length=9, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'policepost'
        app_label = 'app'

class Userpolice(models.Model):
    id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=255, blank=True, null=True)
    lastname = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    status = models.BooleanField(blank=True, null=True)
    address = models.IntegerField(blank=True, null=True)
    internalid = models.IntegerField(unique=True, blank=True, null=True)
    post_police = models.ForeignKey(PolicePost, on_delete=models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'userpolice'
        app_label = 'app'


class Users(models.Model):
    firstname = models.CharField(max_length=255, blank=True, null=True)
    lastname = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)
    password = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    status = models.BooleanField(blank=True, null=True)
    address = models.ForeignKey(Address, models.DO_NOTHING, db_column='address', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'users'
        app_label = 'app'

class Subscription(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Generaluser, models.DO_NOTHING, db_column='user', blank=True, null=True)
    category = models.ForeignKey(Category, models.DO_NOTHING, db_column='category', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'subscription'
        app_label = 'app'