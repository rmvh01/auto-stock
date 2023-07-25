from django.shortcuts import render
from .models import SalesPerson,Customer,Sale
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
import json

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
