from django.contrib import admin
from pharm_easy.models import *
# Register your models here.

class Medical_ShopAdmin(admin.ModelAdmin):
    list_display = ["name", "owner_name", "location", "contact"]
    list_display_links = ["name", "owner_name", "location", "contact"]
    list_editable = ["name", "owner_name", "location", "contact"]
    list_filter = ["name"]
    search_fields = ["name"]
    class Meta:
        model = MedicalShop
        admin.site.register(MedicalShop)


class MedicineAdmin(admin.ModelAdmin):
    list_display = ["shop", "name", "company", "quantity", "price", "no_of_tablets", "type", "mfg_date", "exp_date"]
    list_display_links = ["shop", "name", "company", "quantity", "price", "no_of_tablets", "type", "mfg_date", "exp_date"]
    list_editable = ["shop", "name", "company", "quantity", "price", "no_of_tablets", "type", "mfg_date", "exp_date"]
    list_filter = ["name"]
    search_fields = ["name"]
    class Meta:
        model = Medicine
        admin.site.register(Medicine)
