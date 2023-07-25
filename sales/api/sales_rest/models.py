from django.db import models
class AutomobileVO(models.Model):
    vin = models.CharField(max_length=100)
    sold = models.BooleanField(default=False)
    href = models.CharField(max_length=100,unique=True)

class SalesPerson(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    employee_id = models.CharField(max_length=150)

class Customer(models.Model):
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=15)

class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO, related_name="automobile",
        on_delete=models.PROTECT
    )
    SalesPerson = models.ForeignKey(
        SalesPerson, related_name='SalesPerson',
        on_delete=models.PROTECT
    )
    customer = models.ForeignKey(
        Customer, related_name='customer',
        on_delete=models.PROTECT,
    )
    price = models.FloatField()
