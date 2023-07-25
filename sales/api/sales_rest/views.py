from django.shortcuts import render
from .models import SalesPerson,Customer,Sale,AutomobileVO
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
import json


#creating a salespeople view with implementin encodors that
#is imported from common/json;
class SalesPeopleEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        'first_name',
        'last_name',
        'employee_id',
    ]


@require_http_methods(['POST',"DELETE",'GET'])
def sales_people(request,id=None):
    if request.method =='GET':
        salespeople = SalesPerson.objects.all()
        return JsonResponse(salespeople, encoder=SalesPeopleEncoder,safe=False)
    elif request.method =='POST':
        data = request.body
        content = json.loads(data)
        sales_people=SalesPerson.objects.create(**content)
        return JsonResponse(sales_people,encoder=SalesPeopleEncoder,safe=False)
    else:
        try:
            count,_ = SalesPerson.objects.get(id=id).delete()
        except SalesPerson.DoesNotExist:
            return JsonResponse({'message':'cant find the data'})
        return JsonResponse({'Delete':count>0})


#creating a listcustomer  view with implementin encoders that
#is imported from common/json;

class CustomerEncoders(ModelEncoder):
    model = Customer
    properties=[
        "first_name",
        "last_name",
        "phone_number"
    ]


@require_http_methods(['GET',"POST",'DELETE'])
def customer(request,id=None):
    if request.method == 'GET':
        content = Customer.objects.all()
        return JsonResponse(content,encoder=CustomerEncoders,safe=False)
    # will create a uniqe phone number
    elif request.method == 'POST':
        data = request.body
        content = json.loads(data)
        try:
            Customer.objects.get(phone_number=content["phone_number"])
        except Customer.DoesNotExist:
            new_customer = Customer.objects.create(**content)
            return JsonResponse(new_customer,encoder=CustomerEncoders,safe=False)
        else:
            return JsonResponse({'message':'customer with that phone number is already created'})
    else:
        try:
            count,_ = Customer.objects.get(id=id).delete()
        except Customer.DoesNotExist:
            return JsonResponse({'message':'cant find the data'})
        return JsonResponse({'Delete':count>0})



#creating a sale view with implementin encoders that
#is imported from common/json;
class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        'vin',
        "sold",
    ]

class SaleEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "SalesPerson",
        'customer',
        'price',
    ]
    encoders={
        "automobile": AutomobileVOEncoder(),
        "SalesPerson":SalesPeopleEncoder(),
        "customer":CustomerEncoders()
    }


@require_http_methods(['GET',"POST",'DELETE'])
def sale(request,id=None):
    if request.method == "GET":
        content = Sale.objects.all()
        return JsonResponse(content,encoder=SaleEncoder,safe=False)
    elif request.method == "POST":
        data = request.body
        content = json.loads(data)
        try:
            print(content['automobile'],'---------data.automobile')
            automobile_vo=AutomobileVO.objects.get(href = content['automobile'])
            print(automobile_vo,"---------automobile_vo--------")
            sales_person=SalesPerson.objects.get(employee_id=content['SalesPerson'])
            customer=Customer.objects.get(phone_number=content['customer'])
        except (AutomobileVO.DoesNotExist, SalesPerson.DoesNotExist,Customer.DoesNotExist):
            JsonResponse({'message':'one of the data is not exist'})

        content['automobile']=automobile_vo
        content['SalesPerson']=sales_person
        content['customer']=customer
        newSale = Sale.objects.create(**content)
        print(newSale,'----newsale---')
        return JsonResponse(newSale,encoder=SaleEncoder,safe=False)
