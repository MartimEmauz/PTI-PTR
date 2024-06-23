# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import RegexValidator, EmailValidator, MinLengthValidator, MaxLengthValidator
#from django.contrib.gis.db.models import models


class Address(models.Model):
    id = models.AutoField(primary_key=True)
    street = models.CharField(max_length=255, blank=True, null=True)
    country = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    zip = models.CharField(max_length=20, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    radius = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'address'
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
    id = models.AutoField(primary_key=True)
    attribute = models.CharField(max_length=255, blank=True, null=True)
    category = models.ForeignKey(Category, models.DO_NOTHING, db_column="category", blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'category_attribute'
        unique_together = (('attribute', 'category'),)
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



class Generaluser(models.Model):
    id = models.AutoField(primary_key=True)
    firstname = models.CharField(max_length=255, blank=True, null=True)
    lastname = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(
        max_length=255,
        unique=True,
        validators=[EmailValidator(message="Enter a valid email address.")]
    )
    password = models.CharField(max_length=255, blank=True, null=True)
    gender = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    phonenumber = models.IntegerField(unique=True, blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, db_column='address', blank=True, null=True)
    phonenumber = models.CharField(
        max_length=15,
        unique=True,
        blank=True,
        null=True,
        validators=[RegexValidator(regex=r'^(2\d{8}|9\d{8})$', message="Enter a valid phone number.")]
    )
    status = models.BooleanField(blank=True, null=True)
    idcivil = models.CharField(
        max_length=9,
        unique=True,
        blank=True,
        null=True,
        #validators=[RegexValidator(regex=r'^\d{8}[A-Z]$', message="Enter a valid Portuguese Civil ID.")]
    )
    idfiscal = models.CharField(
        max_length=9,
        unique=True,
        blank=True,
        null=True,
        #validators=[RegexValidator(regex=r'^[1-3|5]\d{8}$', message="Enter a valid Fiscal Number (NIF).")]
    )

    class Meta:
            managed = False
            db_table = 'generaluser'
            app_label = 'app'

    def save(self, *args, **kwargs):
                if self.email and '@' not in self.email:
                    raise ValidationError("Email must contain @ symbol.")
                super().save(*args, **kwargs)



class Objeto(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=255, null=True, blank=True)
    specific_date = models.DateTimeField(null=True, blank=True)
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    description = models.TextField(max_length=255, null=True, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE, db_column='category', blank=True, null=True)
    address = models.ForeignKey(Address, on_delete=models.CASCADE, db_column='address', blank=True, null=True)

    def clean(self):
        if not self.specific_date and not self.start_date and not self.end_date:
            raise ValidationError('At least one of specific_date, start_date, or end_date must be set.')
        
    class Meta:
        managed = False
        db_table = 'objeto'
        app_label = 'app'
        constraints = [
            models.CheckConstraint(
                check=(
                    models.Q(specific_date__isnull=False, start_date__isnull=True, end_date__isnull=True) |
                    models.Q(specific_date__isnull=True, start_date__isnull=False, end_date__isnull=False)
                ),
                name='valid_date_constraints'
            )
        ]

class AtributesObject(models.Model):
    object_id = models.ForeignKey(Objeto, on_delete=models.CASCADE,db_column='id', blank=True, null=True)
    category_attribute = models.ForeignKey(CategoryAttribute, on_delete=models.CASCADE,db_column='id', blank=True, null=True)
    value = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'atributes_object'
        unique_together = (('object_id', 'category_attribute'),)
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
    location = models.ForeignKey(Address, on_delete=models.CASCADE, db_column='location', blank=True, null=True)
    stationnumber = models.CharField(max_length=9, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'policepost'
        app_label = 'app'

class Userpolice(models.Model):
    id = models.AutoField (primary_key=True)
    firstname = models.CharField(max_length=255, blank=True, null=True)
    lastname = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(
        max_length=255,
        unique=True,
        validators=[EmailValidator(message="Enter a valid email address.")]
    )
    password = models.CharField(max_length=255, blank=True, null=True)
    internalid = models.IntegerField(unique=True)
    postopolice = models.ForeignKey(PolicePost, on_delete=models.CASCADE, db_column='postopolice', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'userpolice'
        app_label = 'app'

    def save(self, *args, **kwargs):
            if self.email and '@' not in self.email:
                raise ValidationError("Email must contain @ symbol.")
            super().save(*args, **kwargs)

class Lostobject(models.Model):
    id = models.AutoField(primary_key=True)
    objeto_id = models.ForeignKey(Objeto, on_delete=models.CASCADE, db_column='objeto_id', blank=True, null=True, related_name='lost_objects')
    generaluser = models.ForeignKey(Generaluser, on_delete=models.CASCADE, db_column='generaluser', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'lostobject'
        app_label = 'app'

class Foundobject(models.Model):
    id = models.AutoField(primary_key=True)
    objeto_id = models.ForeignKey(Objeto, on_delete=models.CASCADE, db_column='objeto_id', blank=True, null=True, related_name='found_objects')
    firstname = models.CharField(max_length=255, blank=True, null=True)
    lastname = models.CharField(max_length=255, blank=True, null=True)
    genero = models.CharField(max_length=50, blank=True, null=True)
    birthday = models.DateField(blank=True, null=True)
    idcivil = models.CharField(max_length=9, unique=True, blank=True, null=True)
    idfiscal = models.CharField(max_length=9, unique=True, blank=True, null=True)
    phonenumber = models.CharField(max_length=15, unique=True, blank=True, null=True,
                                   validators=[RegexValidator(regex=r'^(2\d{8}|9\d{8})$', message="Enter a valid phone number.")])
    police = models.ForeignKey(Userpolice, on_delete=models.CASCADE, db_column='police', blank=True, null=True)
    possibleOwner = models.ForeignKey(Generaluser, on_delete=models.CASCADE, db_column='possibleowner', blank=True, null=True)
    delivered = models.BooleanField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'foundobject'
        app_label = 'app'
    

class Leilao(models.Model):
    id = models.AutoField(primary_key=True)
    valor_base = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    data_inicio = models.DateField(blank=True, null=True)
    data_fim = models.DateField(blank=True, null=True)
    maior_licitacao = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    objeto = models.ForeignKey(Foundobject, on_delete=models.CASCADE, db_column='objeto', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'leilao'
        app_label = 'app'
        constraints = [
            models.CheckConstraint(
                check=models.Q(data_inicio__lt=models.F('data_fim')),
                name='start_date_before_end_date'
            ),
            models.CheckConstraint(
                check=models.Q(valor_base__gte=0),
                name='valor_base_positive'
            )
        ]


class Licitacao(models.Model):
    id = models.AutoField(primary_key=True)
    valor_licitacao = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    data = models.DateField(blank=True, null=True)
    id_user = models.ForeignKey(Generaluser, models.DO_NOTHING, to_field='id_user', db_column='generaluser', blank=True, null=True)
    leilao = models.ForeignKey(Leilao, on_delete=models.CASCADE, db_column='leilao', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'licitacao'
        app_label = 'app'
        unique_together = (('leilao', 'id_user', 'valor_licitacao'),)

class Subscription(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(Generaluser, models.DO_NOTHING, db_column='user', blank=True, null=True)
    category = models.ForeignKey(Category, models.DO_NOTHING, db_column='category', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'subscription'
        app_label = 'app'