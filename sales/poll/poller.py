import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()


# where we want to import the data into;
from sales_rest.models import AutomobileVO


#The logic of polling
def get_automobile():
    response = requests.get('http://inventory-api:8000/api/automobiles/')
    autos = json.loads(response.content)
    for auto in autos['autos']:

        AutomobileVO.objects.update_or_create(defaults={'vin':auto['vin'],"href":auto['href']} ,href=auto['href'])
        print('-----sucess------')


def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            # assign polling logic into the polling system
            get_automobile()
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(5)


if __name__ == "__main__":
    poll()


# NOTE only updating and creating the vin and the href withd the status of the sold because it we
# keep updating the sold, we cant change it into true(because it always keep dhanging into false)
#the second way we can move the sold status into the vo instead of import the status from the inventory
