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
        # since the employee id used as a primary key, it needs to be unique
        try:
            salesPeople = SalesPerson.objects.get(employee_id=content['employee_id'])
        except SalesPerson.DoesNotExist:
            sales_people=SalesPerson.objects.create(**content)
            return JsonResponse(sales_people,encoder=SalesPeopleEncoder,safe=False)
        else:
            return JsonResponse({"message":"employee id is allready exist"})


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
        # get the data from request body
        data = request.body
        #transform the request body into python dictionary
        content = json.loads(data)

        try:
            # check if the car with the vin exist, if not raise eror
            automobile_vo=AutomobileVO.objects.get(vin = content['automobile'])
            print(automobile_vo,'-----------automobile_vo')
            # check if sale is already exist because we cant create the sell twice, if not raise Exception
            sale = Sale.objects.get(automobile__vin=content['automobile'])
            print(sale,'---------sale--------')
            # if  sale:
            #     raise Exception
        except (AutomobileVO.DoesNotExist):
            return JsonResponse({'message':'Car is not exist'})

        except Sale.DoesNotExist:
            print('--------ok---------')
            #get all the data object and assign it to a variable
            automobile_vo=AutomobileVO.objects.get(vin = content['automobile'])
            # change the sold into true
            automobile_vo.sold_true()
            sales_person=SalesPerson.objects.get(employee_id=content['SalesPerson'])
            customer=Customer.objects.get(phone_number=content['customer'])
            #assigning back to content
            content['automobile']=automobile_vo
            content['SalesPerson']=sales_person
            content['customer']=customer
            #create the object
            newSale = Sale.objects.create(**content)
            return JsonResponse(newSale,encoder=SaleEncoder,safe=False)
        else:
            return JsonResponse({'message':'sales is created before'})











        # try:
        #     automobile_vo=AutomobileVO.objects.get(vin = content['automobile'])
        #     # change the sold into true
        #     automobile_vo.sold_true()
        #     sales_person=SalesPerson.objects.get(employee_id=content['SalesPerson'])
        #     customer=Customer.objects.get(phone_number=content['customer'])
        # except (AutomobileVO.DoesNotExist, SalesPerson.DoesNotExist,Customer.DoesNotExist):
        #     JsonResponse({'message':'one of the data is not exist'})
        #     # sale cannot be created twice. since Vin is unique created foe a single car so if a car is already sold
        #     # single car so if a car is already sold it cannot be sold twice
        # try:
        #     sale = Sale.objects.get(automobile__vin=content['automobile'])
        #     print(sale,'------sale------')
        # except Sale.DoesNotExist:
        #     content['automobile']=automobile_vo
        #     content['SalesPerson']=sales_person
        #     content['customer']=customer
        #     newSale = Sale.objects.create(**content)
        #     return JsonResponse(newSale,encoder=SaleEncoder,safe=False)
        # else:
        #     return JsonResponse({"message":"the sales is already exist"})
