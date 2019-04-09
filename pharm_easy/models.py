from django.contrib.auth.models import User
from django.db import models

# Create your models here.

class UserProfile(models.Model):
    user = models.OneToOneField(User,on_delete=models.CASCADE)
    location = models.CharField(max_length=50)
    contact = models.CharField(max_length=10)

    def __str__(self):
        return self.user.username


class MedicalShop(models.Model):
    name = models.CharField(max_length=50)
    owner_name = models.CharField(max_length=50)
    location = models.CharField(max_length=50)
    contact = models.CharField(max_length=10)

    def __str__(self):
        return self.name


class Medicine(models.Model):
    name = models.CharField(max_length=50)
    company = models.CharField(max_length=50)
    quantity = models.IntegerField()
    price = models.IntegerField()
    no_of_tablets = models.IntegerField()
    mfg_date = models.DateField()
    exp_date = models.DateField()
    type = models.CharField(max_length=50)

    shop =  models.ForeignKey(MedicalShop, on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class MyCart(models.Model):
    date_of_purchase = models.DateField()
    total_cost = models.IntegerField()

    medicine = models.ForeignKey(Medicine, on_delete=models.CASCADE)
    user_profile = models.ForeignKey(UserProfile,on_delete=models.CASCADE)

    def __str__(self):
        return self.user_profile.name