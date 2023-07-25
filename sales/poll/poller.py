import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
# from sales_rest.models import Something
from sales_rest.models import AutomobileVO

def get_automobile():
    print('test--------')
    response = requests.get('http://inventory-api:8000/api/automobiles/')
    autos = json.loads(response.content)
    print(autos,"-----autos")
    for auto in content['autos']:
        AutomobileVO.objects.update_or_create(href=auto[''],
            defaults={'vin':auto['vin']}

        )




def poll(repeat=True):
    while True:
        print('Sales poller polling for data')
        try:
            # Write your polling logic, here
            # Do not copy entire file
            get_automobile()
            print("test-------2------")
        except Exception as e:
            print(e, file=sys.stderr)

        if (not repeat):
            break

        time.sleep(5)


if __name__ == "__main__":
    poll()
