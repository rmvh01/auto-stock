from django.contrib import admin
from .models import Status, AutomobileVO

# Register your models here.
@admin.register(Status)
class StatusAdmin(admin.ModelAdmin):
    list_display = ["name", "id"]

@admin.register(AutomobileVO)
class AutomobileVOAdmin(admin.ModelAdmin):
    list_display = ["vin"]
