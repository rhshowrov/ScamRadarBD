from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import CustomUser

class CustomUserAdmin(UserAdmin):
    # ✅ Display all fields properly
    fieldsets = (
        ('User Information', {'fields': ('username', 'email', 'mobile', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name','profile_pic')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
        ('Important Dates', {'fields': ('date_joined',)}),
    )

    # ✅ Make non-editable fields read-only
    readonly_fields = ('date_joined',)

    # ✅ Show all fields in the list view
    list_display = ('username', 'email', 'mobile', 'is_staff', 'date_joined')

    # ✅ Enable search by important fields
    search_fields = ('username', 'email', 'mobile')

admin.site.register(CustomUser, CustomUserAdmin)
