from django.db import models

class Address(models.Model):
    street = models.CharField(max_length=100)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    zip_code = models.CharField(max_length=10)
    longitude = models.FloatField()
    latitude = models.FloatField()
    radius = models.IntegerField()

class Category(models.Model):
    name = models.CharField(max_length=100)

class CategoryAtributes(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    atribute = models.CharField(max_length=100)

class Bid(models.Model):
    bid_value = models.FloatField()

class Auction(models.Model):
    min_bid = models.FloatField()
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    biggest_bid = models.ForeignKey(Bid, on_delete=models.CASCADE)

class Subscription(models.Model):
    userId = models.IntegerField()
    planId = models.IntegerField()
    startDate = models.DateTimeField()
    endDate = models.DateTimeField()
    status = models.CharField(max_length=10)

class ApiResponse(models.Model):
    code = models.IntegerField()
    type = models.CharField(max_length=100)
    message = models.CharField(max_length=255)