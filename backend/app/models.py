from django.db import models

class Address(models.Model):
    class Meta:
        app_label = 'app'
    street = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)
    longitude = models.FloatField()
    latitude = models.FloatField()
    radius = models.IntegerField()

class Category(models.Model):
    class Meta:
        app_label = 'app'
    name = models.CharField(max_length=100)

class CategoryAtributes(models.Model):
    class Meta:
        app_label = 'app'
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    atribute = models.CharField(max_length=100)

class Bid(models.Model):
    class Meta:
        app_label = 'app'
    bid_value = models.FloatField()

class Auction(models.Model):
    class Meta:
        app_label = 'app'
    min_bid = models.FloatField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    biggest_bid = models.ForeignKey(Bid, on_delete=models.CASCADE)

class Subscription(models.Model):
    class Meta:
        app_label = 'app'
    userId = models.IntegerField()
    planId = models.IntegerField()
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    status = models.CharField(max_length=10)

class ApiResponse(models.Model):
    class Meta:
        app_label = 'app'
    code = models.IntegerField()
    type = models.CharField(max_length=100)
    message = models.CharField(max_length=255)