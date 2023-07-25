from django.urls import path
from .views import sales_people


urlpatterns =[
    path('salespeople/',sales_people,name='sales_people'),
    path('salespeople/<int:id>/',sales_people,name='delete_sales_people')
]
