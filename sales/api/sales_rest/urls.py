from django.urls import path
from .views import sales_people,customer,sale,automobileVO


urlpatterns =[
    # path for salespeople
    path('salespeople/',sales_people,name='sales_people'),
    path('salespeople/<int:id>/',sales_people,name='sales_people_id'),

    # path for customer
    path('customer/',customer,name='get_customer'),
    path('customer/<int:id>/',customer,name='get_customer_id'),

    #path for sale
    path('sale/',sale,name='get_sale'),

    #path for vo
    path('automobileVO/', automobileVO,name="automobileVO")
]
