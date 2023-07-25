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
        AutomobileVO.objects.update_or_create(defaults={'vin':auto['vin']}, sold=auto['sold'],href=auto['href'])
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

        time.sleep(10)


if __name__ == "__main__":
    poll()
