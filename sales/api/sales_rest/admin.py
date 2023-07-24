from django.contrib import admin
from models import AutomobileVO, SalesPerson, Customer, Sale


@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    list_display = ['vin','sold']

@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    list_display = ['first_name',"last_name","id"]

@admin.register(Sale)
class SaleAdmin(admin.ModelAdmin):
    list_display = ['SalesPerson','customer','id']

@admin.register(SalesPerson)
class SalesPerson(admin.ModelAdmin):
     list_display = ["first_name",'id']
