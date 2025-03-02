from django.core.exceptions import ValidationError
import re

def validate_mobile_number(value):
    # Ensure the mobile number starts with '01' and contains exactly 11 digits
    if not re.match(r'^01\d{9}$', value):
        raise ValidationError('Mobile number must start with "01" and contain exactly 11 digits.')